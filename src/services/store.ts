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
	socketClose,
	socketClosed,
	socketError,
	socketMessage,
	socketOpen,
	socketSend,
	socketStart,
} from './actions/socket-actions';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			ordersFeedApi.middleware,
			socketMiddleware(ordersAll, {
				start: socketStart(),
				open: socketOpen(),
				close: socketClose(),
				closed: socketClosed(),
				error: socketError(),
				send: socketSend.type,
				message: socketMessage,
			})
			//socketMiddleware(ordersPrivate)
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
};

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
