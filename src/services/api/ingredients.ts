import { baseUrl, ingredients } from '../../config';

export const getIngredients = async () => {
	const response = await fetch(`${baseUrl}${ingredients}`);
	if (response.ok) {
		return response.json();
	}
};
