import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendGetIngredientsRequets as getIngredientsApi } from '../api/ingredients';
import { convert } from '../../utils/common';

export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async () => {
		const result = await getIngredientsApi();
		return result.data.map(convert);
	}
);
