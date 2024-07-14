import { nanoid } from '@reduxjs/toolkit';
import {
	constructorIngredients,
	addIngredient,
	changeOrder,
	clear,
	removeIngredient,
	setBun,
	ConstructorIngredientsState,
} from './constructor-ingredients';
import { IngredientWithUniqId } from '../../types/application-types/ingredient-with-uniq-id';
import { IIngredient } from '../../types/application-types/ingredient';
const reducer = constructorIngredients.reducer;

//#region Test data
const bun: IIngredient = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	imageMobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	imageLarge: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
};

const ingredient1: IngredientWithUniqId = {
	uniqId: nanoid(),
	ingredient: {
		_id: '643d69a5c3f7b9001cfa0941',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
		calories: 4242,
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		imageMobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		imageLarge: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
	},
};

const ingredient2: IngredientWithUniqId = {
	uniqId: nanoid(),
	ingredient: {
		_id: '643d69a5c3f7b9001cfa093e',
		name: 'Филе Люминесцентного тетраодонтимформа',
		type: 'main',
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
		calories: 643,
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/meat-03.png',
		imageMobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
		imageLarge: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
	},
};

const ingredient3: IngredientWithUniqId = {
	uniqId: nanoid(),
	ingredient: {
		_id: '643d69a5c3f7b9001cfa0942',
		name: 'Соус Spicy-X',
		type: 'sauce',
		proteins: 30,
		fat: 20,
		carbohydrates: 40,
		calories: 30,
		price: 90,
		image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
		imageMobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
		imageLarge: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
	},
};
//#endregion

//#region Tests
describe('Constructor-ingredients reducer tests', () => {
	it('Test of initial of state', () => {
		//arrange
		const initialState: ConstructorIngredientsState = {
			bun: null,
			ingredients: [],
		};
		//act
		const state = reducer(undefined, { type: '' });
		//assert
		expect(state).toStrictEqual(initialState);
	});

	it('setBun: if we add a bun, it should be added to the bun property', () => {
		//arrange
		const initialState: ConstructorIngredientsState = {
			bun: null,
			ingredients: [],
		};
		//act
		const state = reducer(initialState, setBun(bun));
		//assert
		expect(state).toStrictEqual({
			bun: bun,
			ingredients: [],
		});
	});

	it('addIngredient: if we add an ingredient to the empty list, it should be added to the ingredients property', () => {
		//arrange
		const initialState: ConstructorIngredientsState = {
			bun: null,
			ingredients: [],
		};
		//act
		const state = reducer(initialState, addIngredient(ingredient1));
		//assert
		expect(state).toStrictEqual({
			bun: null,
			ingredients: [ingredient1],
		});
	});

	it('addIngredient: if we add the second ingredient, it should be the last ingredient in the ingredients property', () => {
		//arrang
		const initialState: ConstructorIngredientsState = {
			bun: null,
			ingredients: [ingredient1],
		};

		//act
		const state = reducer(initialState, addIngredient(ingredient2));
		//assert
		expect(state).toStrictEqual({
			bun: null,
			ingredients: [ingredient1, ingredient2],
		});
	});

	it('removeIngredient: if we delete the ingredient, it should be deleted from the ingredients property', () => {
		//arrange
		const initialState: ConstructorIngredientsState = {
			bun: null,
			ingredients: [ingredient1, ingredient2],
		};
		//act
		const state = reducer(initialState, removeIngredient(ingredient2.uniqId));
		//assert
		expect(state).toStrictEqual({
			bun: null,
			ingredients: [ingredient1],
		});
	});

	it('changeOrder: if we move the ingredient from the last place to the first place, it should be the first in the ingredients property', () => {
		//arrange
		const initialState: ConstructorIngredientsState = {
			bun: null,
			ingredients: [ingredient1, ingredient2, ingredient3],
		};
		//act
		const state = reducer(
			initialState,
			changeOrder({ fromIndex: 2, toIndex: 0 })
		);
		//assert
		expect(state).toStrictEqual({
			bun: null,
			ingredients: [ingredient3, ingredient1, ingredient2],
		});
	});

	it('changeOrder: if we have only one element, it should do nothing', () => {
		//arrange
		const initialState: ConstructorIngredientsState = {
			bun: null,
			ingredients: [ingredient1],
		};
		//act
		const state = reducer(
			initialState,
			changeOrder({ fromIndex: 2, toIndex: 0 })
		);
		//assert
		expect(state).toStrictEqual({
			bun: null,
			ingredients: [ingredient1],
		});
	});

	it('clear: it should return initialState always', () => {
		//arrange
		const initialState: ConstructorIngredientsState = {
			bun: bun,
			ingredients: [ingredient1, ingredient2],
		};
		//act
		const state = reducer(initialState, clear());
		//assert
		expect(state).toStrictEqual({
			bun: null,
			ingredients: [],
		});
	});
});
//#endregion
