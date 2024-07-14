import { configureStore } from "@reduxjs/toolkit";
import { clearOrder, order, OrderState, initialState } from "./order";
import axios from "axios";
import { rootReducer } from "./rootReducer";
import { sendOrder } from "../actions/order";
import { AppState } from "../store";
import { baseUrl, orders } from "../../config";
jest.mock("axios");
const reducer = order.reducer;

describe("Order reducer tests", () => {
  it("Test of initial state", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      order: null,
    });
  });

  it("clearOrder should rest order and success", () => {
    const initialState: OrderState = {
      loading: false,
      success: true,
      order: {
        name: "test",
        number: 12341234,
      },
    };

    const state = reducer(initialState, clearOrder());
    expect(state).toStrictEqual({
      ...initialState,
      success: null,
      order: null,
    });
  });

  it("sendOrder.pending should set the loading property to true", () => {
    //act
    const state = reducer(initialState, { type: sendOrder.pending.type });
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      loading: true,
    });
  });

  it("sendOrder.rejected should set the loading property to false, the success to false, and the order to null", () => {
    //arrange
    const initialState: OrderState = {
      loading: true,
      success: true,
      order: {
        name: "test",
        number: 1234123,
      },
    };
    //act
    const state = reducer(initialState, { type: sendOrder.rejected.type });
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      loading: false,
      success: false,
      order: null,
    });
  });

  it("sendOrder.fulfilled should set the loading property to false, the success to true, and fill the order", () => {
    //arrange
    const initialState: OrderState = {
      loading: true,
      success: null,
      order: null,
    };
    //act
    const state = reducer(initialState, {
      type: sendOrder.fulfilled.type,
      payload: {
        name: "test",
        order: {
          number: 1234124,
        },
        success: true,
        message: "test",
      },
    });
    //assert
    expect(state).toStrictEqual({
      ...initialState,
      loading: false,
      success: true,
      order: {
        name: "test",
        number: 1234124,
      },
    } as OrderState);
  });

  it("sendOrder: status 200 OK, should add order", async () => {
    //Arrange
    (axios.post as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: "200 OK",
        data: {
          success: true,
          name: "Space флюоресцентный бургер",
          order: {
            ingredients: [
              {
                _id: "643d69a5c3f7b9001cfa093d",
                name: "Флюоресцентная булка R2-D3",
                type: "bun",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/bun-01-large.png",
                __v: 0,
              },
              {
                _id: "643d69a5c3f7b9001cfa0943",
                name: "Соус фирменный Space Sauce",
                type: "sauce",
                proteins: 50,
                fat: 22,
                carbohydrates: 11,
                calories: 14,
                price: 80,
                image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                __v: 0,
              },
              {
                _id: "643d69a5c3f7b9001cfa093d",
                name: "Флюоресцентная булка R2-D3",
                type: "bun",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/bun-01-large.png",
                __v: 0,
              },
            ],
            _id: "6691cb98119d45001b4f8777",
            owner: {
              name: "Oleg",
              email: "o.tarusow@yandex.ru",
              createdAt: "2024-05-29T22:55:01.774Z",
              updatedAt: "2024-07-12T23:17:52.799Z",
            },
            status: "done",
            name: "Space флюоресцентный бургер",
            createdAt: "2024-07-13T00:34:32.439Z",
            updatedAt: "2024-07-13T00:34:32.939Z",
            number: 45629,
            price: 2056,
          },
        },
      });
    });

    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();

    //Act
    await store.dispatch(
      sendOrder([
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093d",
      ])
    );

    //Arrange
    expect(store.getState()).toStrictEqual({
      ...initialState,
      order: {
        loading: false,
        success: true,
        order: {
          number: 45629,
          name: "Space флюоресцентный бургер",
        },
      },
    } as AppState);
  });

  it("sendOrder: status 500 Internal server error, should set success = false", async () => {
    //Arrange
    (axios.post as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        status: 500,
        statusText: "500 Internal Server Error",
        data: {
          success: true,
          name: "Space флюоресцентный бургер",
          order: {
            ingredients: [
              {
                _id: "643d69a5c3f7b9001cfa093d",
                name: "Флюоресцентная булка R2-D3",
                type: "bun",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/bun-01-large.png",
                __v: 0,
              },
              {
                _id: "643d69a5c3f7b9001cfa0943",
                name: "Соус фирменный Space Sauce",
                type: "sauce",
                proteins: 50,
                fat: 22,
                carbohydrates: 11,
                calories: 14,
                price: 80,
                image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                __v: 0,
              },
              {
                _id: "643d69a5c3f7b9001cfa093d",
                name: "Флюоресцентная булка R2-D3",
                type: "bun",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/bun-01-large.png",
                __v: 0,
              },
            ],
            _id: "6691cb98119d45001b4f8777",
            owner: {
              name: "Oleg",
              email: "o.tarusow@yandex.ru",
              createdAt: "2024-05-29T22:55:01.774Z",
              updatedAt: "2024-07-12T23:17:52.799Z",
            },
            status: "done",
            name: "Space флюоресцентный бургер",
            createdAt: "2024-07-13T00:34:32.439Z",
            updatedAt: "2024-07-13T00:34:32.939Z",
            number: 45629,
            price: 2056,
          },
        },
      });
    });

    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();

    //Act
    await store.dispatch(
      sendOrder([
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093d",
      ])
    );

    //Arrange
    expect(store.getState()).toStrictEqual({
      ...initialState,
      order: {
        loading: false,
        success: false,
        order: null,
      },
    } as AppState);
  });

  it("sendOrder, it should send request", async () => {
    const store = configureStore({ reducer: rootReducer });

    (axios.post as jest.Mock).mockImplementationOnce(jest.fn);

    //Act
    await store.dispatch(
      sendOrder([
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093d",
      ])
    );

    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      `${baseUrl}${orders}`,
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093d",
        ],
      },
      { headers: { Authorization: "", "content-type": "application/json" } }
    );
  });
});
