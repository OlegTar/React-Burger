import { ingredients } from './ingredients';
import { constructorIngredients } from './constructor-ingredients';
import { order } from './order';
import { combineReducers } from 'redux';
import { user } from './user';
import { ordersFeedApi } from '../../utils/api/orders-feed';
import { feed } from './feed';
import { orderDetails } from './order-details';
import { feedsReducer } from './feeds';

export const rootReducer = combineReducers({
	[ingredients.reducerPath]: ingredients.reducer,
	[constructorIngredients.reducerPath]: constructorIngredients.reducer,
	[order.reducerPath]: order.reducer,
	[user.reducerPath]: user.reducer,
	[ordersFeedApi.reducerPath]: ordersFeedApi.reducer,
	[feed.reducerPath]: feed.reducer,
	[orderDetails.reducerPath]: orderDetails.reducer,
	feeds: feedsReducer,
});
