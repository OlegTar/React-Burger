import { SyntheticEvent } from 'react';
import { IIngredientFromServer } from '../types/data-from-server';
import { IIngredient } from '../types/ingredient';

export const linkHandler = (
	e: SyntheticEvent<HTMLAnchorElement>,
	callback: () => void
) => {
	//чтобы не было перехода по ссылке
	e.preventDefault();
	callback();
};

export const convert = (ing: IIngredientFromServer): IIngredient => {
	return {
		...ing,
		type: ing.type === 'bun' ? 'bun' : ing.type === 'sauce' ? 'sauce' : 'main',
		imageLarge: ing.image_large,
		imageMobile: ing.image_mobile,
	};
};

const checkResponse = (response: Response) => {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(`Ошибка ${response.status}`);
};

export const request = async <T>(url: string, options?: RequestInit) => {
	try {
		const response = await fetch(url, options);
		return checkResponse(response) as T;
	} catch (e) {
		//Сюда попадают не ошибки типа 404, а ошибки по типу неправильно сформированного url, например.
		//Так как эта функция объявлена как async, её возвращаемый результат будет типа Promise.
		//Выбрасывание здесь ошибки зареджектит этот промис
		throw new Error(`Ошибка: ${e}`);
	}
};

export const noop = () => {};
