import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { sendOrder } from '../actions/order';
import { Order } from '../../types/order';
export type OrderState = {
	loading: boolean;
	success: boolean | null;
	order: Order | null;
};
const initialState: OrderState = {
	loading: false,
	success: null,
	order: null,
};
export const order = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrder: (state: OrderState) => ({
			...state,
			order: null,
			success: null,
		}),
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendOrder.pending, (state: OrderState) => {
				state.loading = true;
			})
			.addCase(sendOrder.rejected, (state: OrderState) => {
				state.loading = false;
				state.success = false;
				state.order = null;
			})
			.addCase(
				sendOrder.fulfilled,
				(state: OrderState, action: PayloadAction<Order>) => {
					state.loading = false;
					state.success = action.payload.success;
					state.order = action.payload;
				}
			);
	},
});

export const { clearOrder } = order.actions;
