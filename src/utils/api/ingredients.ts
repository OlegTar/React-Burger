import { baseUrl, ingredients } from '../../config';
import { DataFromServerResponse } from '../../types/responses/data-from-server-response';
import { request } from '../common';

export const sendGetIngredientsRequets =
	(): Promise<DataFromServerResponse> => {
		return request<DataFromServerResponse>(`${baseUrl}${ingredients}`);
	};
