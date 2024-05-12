import { SyntheticEvent } from 'react';
import { IIngredientFromServer } from '../types/dataFromServer';
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
