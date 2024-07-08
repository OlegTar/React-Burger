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
	errorMessage: '',
};

// export const feedsReducer = createReducer(initialState, (builder) => {
// 	builder
// 		.addMatcher(
// 			(action: UnknownAction) => action.type.endsWith('connecting'),
// 			(state) => {
// 				state.state = 'connecting';
// 			}
// 		)
// 		.addMatcher(
// 			(action: UnknownAction) => action.type.endsWith('open'),
// 			(state) => {
// 				state.state = 'open';
// 			}
// 		)
// 		.addMatcher(
// 			(action: UnknownAction) => action.type.endsWith('closed'),
// 			(state) => {
// 				state.state = 'closed';
// 			}
// 		)
// 		.addMatcher(
// 			(action: UnknownAction) => action.type.endsWith('error'),
// 			(state, action: { payload: string }) => {
// 				state.state = 'error';
// 				state.errorMessage = action.payload;
// 			}
// 		)
// 		.addMatcher(
// 			(action: UnknownAction) => action.type.endsWith('message'),
// 			(state, action: { payload: OrdersFeedState }) => {
// 				const { payload } = action;
// 				state.orders = payload.orders;
// 				state.total = payload.total;
// 				state.totalToday = payload.totalToday;
// 				state.state = 'loaded';
// 			}
// 		);
// });

export const feedsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(socketOpen, (state) => {
			state.state = 'open';
		})
		.addCase(socketClosed, (state) => {
			state.state = 'closed';
		})
		.addCase(socketError, (state, action) => {
			state.state = 'error';
			state.errorMessage = action.payload;
		})
		.addCase(socketMessage, (state, action) => {
			const { payload } = action;
			state.orders = payload.orders;
			state.total = payload.total;
			state.totalToday = payload.totalToday;
			state.state = 'loaded';
		});
});
