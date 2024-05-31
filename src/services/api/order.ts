import { baseUrl, orders } from '../../config';
import { OrderResponse } from '../../types/responses/order-response';
import { request } from '../../utils/common';

export const sendOrderRequest = (ids: string[]) => {
	const body = {
		ingredients: ids,
	};
	return request<OrderResponse>(`${baseUrl}${orders}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(body),
	});
};
