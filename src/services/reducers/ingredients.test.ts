import { IIngredient } from "../../types/application-types/ingredient";
import { AppState } from "../store";
import {
  clearCounts,
  decreaseItem,
  increaseItem,
  IngredientsState,
  removeBun,
  setBun,
} from "./ingredients";
import { ingredients } from "./ingredients";
import { rootReducer } from "./rootReducer";

//import type axios from 'axios';
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { getIngredients } from "../actions/ingredients";
import { initialState } from "./ingredients";
//import { getIngredients } from '../actions/ingredients';
jest.mock("axios");

const reducer = ingredients.reducer;

//#region Test data
const bun: IIngredient = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  imageMobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  imageLarge: "https://code.s3.yandex.net/react/code/bun-02-large.png",
};

const ingredient1: IIngredient = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  imageMobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  imageLarge: "https://code.s3.yandex.net/react/code/meat-01-large.png",
};

const ingredient2: IIngredient = {
  _id: "643d69a5c3f7b9001cfa093e",
  name: "Филе Люминесцентного тетраодонтимформа",
  type: "main",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  imageMobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  imageLarge: "https://code.s3.yandex.net/react/code/meat-03-large.png",
};
//#endregion

describe("Ingredients reducer tests", () => {
  it("Test of initial state", () => {
    //arrange
    const initialState: IngredientsState = {
      loading: false,
      success: null,
      ingredients: [],
    };

    //act
    const state = reducer(undefined, { type: "" });

    //assert
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      ingredients: [],
    });
  });

  it("removeBun: it should reset count for a bun", () => {
    //arrange
    const initialState: IngredientsState = {
      loading: false,
      success: null,
      ingredients: [
        {
          count: 2,
          ingredient: bun,
        },
      ],
    };

    //act
    const state = reducer(initialState, removeBun(bun._id));

    //assert
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      ingredients: [
        {
          count: 0,
          ingredient: bun,
        },
      ],
    });
  });

  it("setBun: it should set count to value of 2 for a bun", () => {
    //arrange
    const initialState: IngredientsState = {
      loading: false,
      success: null,
      ingredients: [
        {
          count: 0,
          ingredient: bun,
        },
      ],
    };

    //act
    const state = reducer(initialState, setBun(bun._id));

    //assert
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      ingredients: [
        {
          count: 2,
          ingredient: bun,
        },
      ],
    });
  });

  it("increaseItem: it should increase the count of a ingredient", () => {
    //arrange
    const initialState: IngredientsState = {
      loading: false,
      success: null,
      ingredients: [
        {
          count: 0,
          ingredient: ingredient1,
        },
        {
          count: 0,
          ingredient: ingredient2,
        },
      ],
    };

    //act
    const state = reducer(initialState, increaseItem(ingredient1._id));

    //assert
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      ingredients: [
        {
          count: 1,
          ingredient: ingredient1,
        },
        {
          count: 0,
          ingredient: ingredient2,
        },
      ],
    });
  });

  it("decreaseItem: it should decrease the count of a ingredient", () => {
    //arrange
    const initialState: IngredientsState = {
      loading: false,
      success: null,
      ingredients: [
        {
          count: 1,
          ingredient: ingredient1,
        },
        {
          count: 1,
          ingredient: ingredient2,
        },
      ],
    };

    //act
    const state = reducer(initialState, decreaseItem(ingredient2._id));

    //assert
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      ingredients: [
        {
          count: 1,
          ingredient: ingredient1,
        },
        {
          count: 0,
          ingredient: ingredient2,
        },
      ],
    });
  });

  it("clearCounts: it should reset the all counts to zero", () => {
    //arrange
    const initialState: IngredientsState = {
      loading: false,
      success: null,
      ingredients: [
        {
          count: 1,
          ingredient: ingredient1,
        },
        {
          count: 1,
          ingredient: ingredient2,
        },
      ],
    };

    //act
    const state = reducer(initialState, clearCounts());

    //assert
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      ingredients: [
        {
          count: 0,
          ingredient: ingredient1,
        },
        {
          count: 0,
          ingredient: ingredient2,
        },
      ],
    });
  });

  it("getIngredients.pending should set loading to true", () => {
    //act
    const state = reducer(initialState, { type: getIngredients.pending.type });
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      loading: true,
    });
  });

  it("getIngredients.rejected should set the loading, success properties to false, and ingredients to empty list", () => {
    //act
    const state = reducer(initialState, { type: getIngredients.rejected.type });
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      loading: false,
      success: false,
      ingredients: [],
    });
  });

  it("getIngredients.fulfilled should set the loading property to false, the success property to true, and fill the ingredients", () => {
    //act
    const state = reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: [
        {
          _id: "643d69a5c3f7b9001cfa093c",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          imageMobile:
            "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          imageLarge: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        },
      ],
    });
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      loading: false,
      success: true,
      ingredients: [
        {
          count: 0,
          ingredient: {
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            imageMobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            imageLarge:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
          },
        },
      ],
    });
  });

  it("getIngredients: status ok, should add ingredient", async () => {
    //arrange
    const store = configureStore<AppState>({ reducer: rootReducer });
    const initialState = store.getState();

    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "200 OK",
        data: {
          success: true,
          data: [
            {
              _id: "643d69a5c3f7b9001cfa093c",
              name: "Краторная булка N-200i",
              type: "bun",
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: "https://code.s3.yandex.net/react/code/bun-02.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-02-large.png",
            },
          ],
        },
      })
    );

    //act
    await store.dispatch(getIngredients());
    //assert
    expect(store.getState()).toStrictEqual({
      ...initialState,
      ingredients: {
        loading: false,
        success: true,
        ingredients: [
          {
            count: 0,
            ingredient: {
              _id: "643d69a5c3f7b9001cfa093c",
              name: "Краторная булка N-200i",
              type: "bun",
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: "https://code.s3.yandex.net/react/code/bun-02.png",
              imageMobile:
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              imageLarge:
                "https://code.s3.yandex.net/react/code/bun-02-large.png",
            },
          },
        ],
      },
    } as AppState);
  });

  it("getIngredients: status 500, should set error", async () => {
    //arrange
    const store = configureStore<AppState>({ reducer: rootReducer });
    const initialState = store.getState();

    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
        statusText: "500 Internal Server Error",
        data: {
          success: true,
        },
      })
    );

    //act
    await store.dispatch(getIngredients());
    //assert
    expect(store.getState()).toStrictEqual({
      ...initialState,
      ingredients: {
        loading: false,
        success: false,
        ingredients: [],
      },
    } as AppState);
  });
});
