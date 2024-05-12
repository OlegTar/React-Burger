import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients as getIngredientsApi } from '../api/ingredients';
import DataFromServer from '../../types/dataFromServer';
import { convert } from '../../utils/common';

export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async () => {
		const response = (await getIngredientsApi()) as DataFromServer;
		return response.data.map(convert);
	}
);
