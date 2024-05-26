import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients as getIngredientsApi } from '../api/ingredients';
import { convert } from '../../utils/common';

export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async () => {
		try {
			const delay = (seconds: number) => {
				return new Promise((resolve) => {
					setTimeout(resolve, seconds * 1000);
				});
			};

			const response = await Promise.all([getIngredientsApi(), delay(0.5)]);
			return response[0].data.map(convert);
		} catch (e) {
			//Так как эта функция объявлена как async её возвращаемый результат будет типа Promise.
			//Выбрасывание здесь ошибки зареджектит этот промис
			throw new Error(`Ошибка ${e}`);
		}
	}
);
