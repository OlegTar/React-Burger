import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendGetIngredientsRequets as getIngredientsApi } from '../api/ingredients';
import { convert } from '../../utils/common';

export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async () => {
		const response = await getIngredientsApi();
		if (!response.success) {
			throw new Error('Ошибка');
		}
		return response.data.map(convert);
	}
);
