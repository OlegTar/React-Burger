import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/order';
import { sendOrderRequest } from '../api/order';

export const sendOrder = createAsyncThunk(
	'order/sendOrder',
	async (ids: string[]) => {
		const response = await sendOrderRequest(ids);
		return response as Order;
	}
);
