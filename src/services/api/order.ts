import { baseUrl, orders } from '../../config';

export const sendOrderRequest = async (ids: string[]) => {
	const body = {
		ingredients: ids,
	};

	const response = await fetch(`${baseUrl}${orders}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(body),
	});
	if (response.ok) {
		return response.json();
	}
};
