import { createReducer, UnknownAction } from '@reduxjs/toolkit';
import { OrdersFeedState } from '../../types/application-types/orders-feed-state';
import {
	socketClosed,
	socketError,
	socketMessage,
	socketOpen,
} from '../actions/socket-actions';

const initialState: OrdersFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	state: 'init',
};

export const feedsReducer = createReducer(initialState, (builder) => {
	builder
		.addMatcher(
			(action: UnknownAction) => action.type.endsWith('open'),
			(state) => {
				state.state = 'open';
			}
		)
		.addMatcher(
			(action: UnknownAction) => action.type.endsWith('closed'),
			(state) => {
				state.state = 'closed';
			}
		)
		.addMatcher(
			(action: UnknownAction) => action.type.endsWith('error'),
			(state) => {
				state.state = 'error';
			}
		)
		.addMatcher(
			(action: UnknownAction) => action.type.endsWith('message'),
			(state, action: { payload: OrdersFeedState }) => {
				const { payload } = action;
				state.orders = payload.orders;
				state.total = payload.total;
				state.totalToday = payload.totalToday;
				state.state = 'loaded';
			}
		);
});
