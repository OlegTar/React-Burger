import { PayloadAction, createSlice } from '@reduxjs/toolkit';
type OrderType = {};
const initialState: OrderType = {};
const currentIngredient = createSlice({
	name: 'indigrients',
	initialState: initialState as OrderType,
	reducers: {
		setItem: (state: OrderType, action: PayloadAction<OrderType>) =>
			action.payload,
		clearItem: () => {},
	},
});
export default currentIngredient;
