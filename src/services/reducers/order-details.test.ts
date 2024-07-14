import { configureStore } from '@reduxjs/toolkit';
import { orderDetails, OrderDetailsState } from './order-details';
import { rootReducer } from './rootReducer';
import { getOrder } from '../actions/order-details';
import { AppState } from '../store';
import axios, { AxiosResponse } from 'axios';
import { ApplicationResponse } from '../../types/responses/response-type';
jest.mock('axios');
const reducer = orderDetails.reducer;

describe('order-reducer tests', () => {
	it('Test of initial state', () => {
		const state = reducer(undefined, { type: '' });
		expect(state).toStrictEqual({
			loading: false,
			success: null,
			order: null,
		});
	});

	it('getOrder: status 200 OK should add order', async () => {
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();

		(axios.get as jest.Mock).mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
				statusText: '200 OK',
				data: {
					success: true,
					orders: [
						{
							_id: '6691bd57119d45001b4f8767',
							ingredients: [
								'643d69a5c3f7b9001cfa093d',
								'643d69a5c3f7b9001cfa093e',
								'643d69a5c3f7b9001cfa093e',
							],
							owner: '66873cfc856777001bb1fdb5',
							status: 'done',
							name: 'Флюоресцентный люминесцентный бургер',
							createdAt: '2024-07-12T23:33:43.986Z',
							updatedAt: '2024-07-12T23:33:44.466Z',
							number: 45626,
						},
					],
				},
			});
		});

		await store.dispatch(getOrder(45626));

		expect(store.getState()).toStrictEqual({
			...initialState,
			'order-details': {
				loading: false,
				success: true,
				order: {
					_id: '6691bd57119d45001b4f8767',
					ingredients: [
						'643d69a5c3f7b9001cfa093d',
						'643d69a5c3f7b9001cfa093e',
						'643d69a5c3f7b9001cfa093e',
					],
					owner: '66873cfc856777001bb1fdb5',
					status: 'done',
					name: 'Флюоресцентный люминесцентный бургер',
					createdAt: '2024-07-12T23:33:43.986Z',
					updatedAt: '2024-07-12T23:33:44.466Z',
					number: 45626,
				},
			},
		} as AppState);
	});

	it('getOrder: status 200 OK, but data is empty, should set error', async () => {
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();

		(axios.get as jest.Mock).mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
				statusText: '200 OK',
				data: {
					success: true,
					orders: [],
				},
			});
		});

		await store.dispatch(getOrder(45626));

		expect(store.getState()).toStrictEqual({
			...initialState,
			'order-details': {
				loading: false,
				success: false,
				order: null,
			},
		} as AppState);
	});

	it('getOrder: status 500 Internal Error should set error', async () => {
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();

		(axios.get as jest.Mock).mockImplementationOnce(() => {
			return Promise.resolve({
				status: 500,
				statusText: '500 Internal Server Errror',
				data: {
					success: true,
					orders: [],
				},
			});
		});

		await store.dispatch(getOrder(45626));

		expect(store.getState()).toStrictEqual({
			...initialState,
			'order-details': {
				loading: false,
				success: false,
				order: null,
			},
		} as AppState);
	});
});
