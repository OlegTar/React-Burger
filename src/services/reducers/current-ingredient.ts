import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/ingredient';
type StateType = IIngredient | null;
const initialState: StateType = null;
const currentIngredient = createSlice({
	name: 'current',
	initialState: initialState as StateType,
	reducers: {
		setItem: (state: StateType, action: PayloadAction<StateType>) =>
			action.payload,
		clearItem: () => null,
	},
});
export default currentIngredient;
