import { configureStore } from "@reduxjs/toolkit";
import { orderDetails, OrderDetailsState } from "./order-details";
import { rootReducer } from "./rootReducer";
import { getOrder } from "../actions/order-details";
import { AppState } from "../store";
import { initialState } from "./order-details";
import axios from "axios";
jest.mock("axios");
const reducer = orderDetails.reducer;

describe("order-reducer tests", () => {
  it("Test of initial state", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toStrictEqual({
      loading: false,
      success: null,
      order: null,
    });
  });

  it("getOrder.pending should set the loading property to true", () => {
    //act
    const state = reducer(initialState, { type: getOrder.pending.type });
    expect(state).toStrictEqual({
      ...initialState,
      loading: true,
    });
  });

  it("getOrder.rejected should set the loading and success properties to false, the order property to null", () => {
    //arrange
    const initialState: OrderDetailsState = {
      loading: true,
      success: true,
      order: {
        _id: "6693e366119d45001b4f8d3d",
        ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
        owner: "6657b24597ede0001d06d2f0",
        status: "done",
        name: "Краторный бургер",
        createdAt: "2024-07-14T14:40:38.339Z",
        updatedAt: "2024-07-14T14:40:38.722Z",
        number: 45769,
      },
    };

    //act
    const state = reducer(initialState, { type: getOrder.rejected.type });
    expect(state).toStrictEqual({
      ...initialState,
      loading: false,
      success: false,
      order: null,
    });
  });

  it("getOrder.fulfilled should set the loading to false, the success to true, fill the order property", () => {
    //arrange
    const initialState: OrderDetailsState = {
      loading: true,
      success: false,
      order: null,
    };

    //act
    const state = reducer(initialState, {
      type: getOrder.fulfilled.type,
      payload: {
        orders: [
          {
            _id: "6693e366119d45001b4f8d3d",
            ingredients: [
              "643d69a5c3f7b9001cfa093c",
              "643d69a5c3f7b9001cfa093c",
            ],
            owner: "6657b24597ede0001d06d2f0",
            status: "done",
            name: "Краторный бургер",
            createdAt: "2024-07-14T14:40:38.339Z",
            updatedAt: "2024-07-14T14:40:38.722Z",
            number: 45769,
          },
        ],
      },
    });
    expect(state).toStrictEqual({
      ...initialState,
      loading: false,
      success: true,
      order: {
        _id: "6693e366119d45001b4f8d3d",
        ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
        owner: "6657b24597ede0001d06d2f0",
        status: "done",
        name: "Краторный бургер",
        createdAt: "2024-07-14T14:40:38.339Z",
        updatedAt: "2024-07-14T14:40:38.722Z",
        number: 45769,
      },
    });
  });

  it("getOrder.fulfilled with empty list should set the loading to false, the success to flse, the order property to null", () => {
    //arrange
    const initialState: OrderDetailsState = {
      loading: true,
      success: false,
      order: {
        _id: "6693e366119d45001b4f8d3d",
        ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
        owner: "6657b24597ede0001d06d2f0",
        status: "done",
        name: "Краторный бургер",
        createdAt: "2024-07-14T14:40:38.339Z",
        updatedAt: "2024-07-14T14:40:38.722Z",
        number: 45769,
      },
    };

    //act
    const state = reducer(initialState, {
      type: getOrder.fulfilled.type,
      payload: {
        orders: [],
      },
    });
    expect(state).toStrictEqual({
      ...initialState,
      loading: false,
      success: false,
      order: null,
    });
  });

  it("getOrder: status 200 OK should add order", async () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();

    (axios.get as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: "200 OK",
        data: {
          success: true,
          orders: [
            {
              _id: "6691bd57119d45001b4f8767",
              ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093e",
              ],
              owner: "66873cfc856777001bb1fdb5",
              status: "done",
              name: "Флюоресцентный люминесцентный бургер",
              createdAt: "2024-07-12T23:33:43.986Z",
              updatedAt: "2024-07-12T23:33:44.466Z",
              number: 45626,
            },
          ],
        },
      });
    });

    await store.dispatch(getOrder(45626));

    expect(store.getState()).toStrictEqual({
      ...initialState,
      "order-details": {
        loading: false,
        success: true,
        order: {
          _id: "6691bd57119d45001b4f8767",
          ingredients: [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093e",
          ],
          owner: "66873cfc856777001bb1fdb5",
          status: "done",
          name: "Флюоресцентный люминесцентный бургер",
          createdAt: "2024-07-12T23:33:43.986Z",
          updatedAt: "2024-07-12T23:33:44.466Z",
          number: 45626,
        },
      },
    } as AppState);
  });

  it("getOrder: status 200 OK, but data is empty, should set error", async () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();

    (axios.get as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: "200 OK",
        data: {
          success: true,
          orders: [],
        },
      });
    });

    await store.dispatch(getOrder(45626));

    expect(store.getState()).toStrictEqual({
      ...initialState,
      "order-details": {
        loading: false,
        success: false,
        order: null,
      },
    } as AppState);
  });

  it("getOrder: status 500 Internal Error should set error", async () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();

    (axios.get as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        status: 500,
        statusText: "500 Internal Server Errror",
        data: {
          success: true,
          orders: [],
        },
      });
    });

    await store.dispatch(getOrder(45626));

    expect(store.getState()).toStrictEqual({
      ...initialState,
      "order-details": {
        loading: false,
        success: false,
        order: null,
      },
    } as AppState);
  });
});
