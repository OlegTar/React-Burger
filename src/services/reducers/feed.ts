import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrdersFeedState } from '../../types/application-types/orders-feed-state';

const initialState: OrdersFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	state: 'init',
};

export const feed = createSlice({
	name: 'user',
	reducerPath: 'feed',
	initialState,
	reducers: {
		setOrders: (state, { payload }: PayloadAction<OrdersFeedState>) => {
			state.orders = payload.orders;
			state.total = payload.total;
			state.totalToday = payload.totalToday;
			state.state = 'loaded';
		},
	},
});

export const { setOrders } = feed.actions;
