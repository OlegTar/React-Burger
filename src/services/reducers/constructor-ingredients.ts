import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/ingredient';
import { IngredientWithUniqId } from '../../types/ingredientWithUniqId';
import { nanoid } from '@reduxjs/toolkit';

type ConstructorIngredientsType = {
	bun: IIngredient | null;
	ingredients: IngredientWithUniqId[];
};
const initialState: ConstructorIngredientsType = {
	bun: null,
	ingredients: [],
};
const constructorIngredients = createSlice({
	name: 'constructor-ingredients',
	initialState: initialState,
	reducers: {
		addIngredient: (
			state: ConstructorIngredientsType,
			action: PayloadAction<IIngredient>
		) => ({
			...state,
			ingredients: [
				...state.ingredients,
				{
					ingredient: action.payload,
					uniqId: nanoid(),
				},
			],
		}),
		removeIngredient: (
			state: ConstructorIngredientsType,
			action: PayloadAction<string>
		) => ({
			...state,
			ingredients: state.ingredients.filter(
				({ uniqId }) => uniqId !== action.payload
			),
		}),
		setBun: (
			state: ConstructorIngredientsType,
			action: PayloadAction<IIngredient>
		) => ({
			...state,
			bun: action.payload,
		}),
	},
	selectors: {
		bun: (state: ConstructorIngredientsType) => state.bun,
		ingredients: (state: ConstructorIngredientsType) => state.ingredients,
	},
});
export const { addIngredient, setBun, removeIngredient } =
	constructorIngredients.actions;
export { constructorIngredients };
