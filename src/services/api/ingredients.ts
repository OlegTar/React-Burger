import { baseUrl, ingredients } from '../../config';
import { DataFromServerResponse } from '../../types/responses/data-from-server-response';
import { request } from '../../utils/common';

export const sendGetIngredientsRequets = () => {
	return request<DataFromServerResponse>(`${baseUrl}${ingredients}`);
};
