import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/rootReducer';
import { IngredientsState, ingredients } from './reducers/ingredients';
import {
	ConstructorIngredientsState,
	constructorIngredients,
} from './reducers/constructor-ingredients';
import { OrderState, order } from './reducers/order';
import { user, UserState } from './reducers/user';
import { ordersFeedApi } from '../utils/api/orders-feed';
import { feed } from './reducers/feed';
import { OrdersFeedState } from '../types/application-types/orders-feed-state';
import { orderDetails, OrderDetailsState } from './reducers/order-details';
import { socketMiddleware } from './middlewares/socketMiddleware';
import { ordersAll, ordersPrivate } from '../config';
import {
	socketDisconnect as socketDisconnect,
	socketClosed,
	socketError,
	socketMessage,
	socketOpen,
	socketPrivateDisconnect as socketPrivateDisconnect,
	socketPrivateClosed,
	socketPrivateError,
	socketPrivateMessage,
	socketPrivateOpen,
	socketPrivateSend,
	socketPrivateStart,
	socketSend,
	socketStart,
} from './actions/socket-actions';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			ordersFeedApi.middleware,
			socketMiddleware({
				start: socketStart,
				open: socketOpen,
				disconnect: socketDisconnect,
				closed: socketClosed,
				error: socketError,
				send: socketSend,
				message: socketMessage,
			}),
			socketMiddleware({
				start: socketPrivateStart,
				open: socketPrivateOpen,
				disconnect: socketPrivateDisconnect,
				closed: socketPrivateClosed,
				error: socketPrivateError,
				send: socketPrivateSend,
				message: socketPrivateMessage,
			})
		),
});

export type AppState = {
	[ingredients.reducerPath]: IngredientsState;
	[constructorIngredients.reducerPath]: ConstructorIngredientsState;
	[order.reducerPath]: OrderState;
	[user.reducerPath]: UserState;
	[ordersFeedApi.reducerPath]: ReturnType<typeof ordersFeedApi.reducer>;
	[feed.reducerPath]: OrdersFeedState;
	[orderDetails.reducerPath]: OrderDetailsState;
	feeds: OrdersFeedState;
	privateFeed: OrdersFeedState;
};

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
