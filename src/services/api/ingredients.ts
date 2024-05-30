import { baseUrl, ingredients } from '../../config';
import DataFromServer from '../../types/data-from-server';
import { request } from '../../utils/common';

export const getIngredients = () => {
	return request<DataFromServer>(`${baseUrl}${ingredients}`);
};
