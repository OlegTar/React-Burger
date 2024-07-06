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

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(ordersFeedApi.middleware),
});

export type AppState = {
	[ingredients.reducerPath]: IngredientsState;
	[constructorIngredients.reducerPath]: ConstructorIngredientsState;
	[order.reducerPath]: OrderState;
	[user.reducerPath]: UserState;
	[ordersFeedApi.reducerPath]: ReturnType<typeof ordersFeedApi.reducer>;
};

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
