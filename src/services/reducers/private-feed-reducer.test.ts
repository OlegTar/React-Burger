import { OrdersFeedState } from '../../types/application-types/orders-feed-state';
import {
	socketPrivateClosed,
	socketPrivateError,
	socketPrivateMessage,
	socketPrivateOpen,
} from '../actions/socket-actions';
import { privateFeedReducer } from './private-feed-reducer';

describe('private-feed-reducer tests', () => {
	it('Test of initial state', () => {
		//arrange
		const initialState: OrdersFeedState = {
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'init',
			errorMessage: '',
		};

		//act
		const state = privateFeedReducer(undefined, { type: '' });

		//assert
		expect(state).toStrictEqual(initialState);
	});

	it("socketOpen: should change state to 'open'", () => {
		//arrange
		const initialState: OrdersFeedState = {
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'init',
			errorMessage: '',
		};

		//act
		const state = privateFeedReducer(initialState, socketPrivateOpen());

		//assert
		expect(state).toStrictEqual({
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'open',
			errorMessage: '',
		});
	});

	it("socketClosed: should change state to 'init'", () => {
		//arrange
		const initialState: OrdersFeedState = {
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'open',
			errorMessage: '',
		};

		//act
		const state = privateFeedReducer(initialState, socketPrivateClosed());

		//assert
		expect(state).toStrictEqual({
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'init',
			errorMessage: '',
		});
	});

	it("socketError: should change state to 'error' and add error message", () => {
		//arrange
		const initialState: OrdersFeedState = {
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'open',
			errorMessage: '',
		};

		//act
		const state = privateFeedReducer(
			initialState,
			socketPrivateError('error message')
		);

		//assert
		expect(state).toStrictEqual({
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'error',
			errorMessage: 'error message',
		});
	});

	it("socketMessage: should add orders to the orders list and change state to 'loaded'", () => {
		//arrange
		const initialState: OrdersFeedState = {
			orders: [],
			total: 0,
			totalToday: 0,
			state: 'open',
			errorMessage: '',
		};

		//act
		const state = privateFeedReducer(
			initialState,
			socketPrivateMessage({
				orders: [
					{
						createdAt: '2024-07-11T20:18:59.131Z',
						ingredients: [
							'643d69a5c3f7b9001cfa093d',
							'643d69a5c3f7b9001cfa093e',
							'643d69a5c3f7b9001cfa093e',
						],
						name: 'Флюоресцентный фалленианский люминесцентный метеоритный бургер',
						number: 45501,
						status: 'done',
						updatedAt: '2024-07-11T20:18:59.523Z',
						_id: '66903e33119d45001b4f82f0',
					},
				],
				total: 10000,
				totalToday: 10,
				state: 'init',
				errorMessage: '',
			})
		);

		//assert
		expect(state).toStrictEqual({
			orders: [
				{
					createdAt: '2024-07-11T20:18:59.131Z',
					ingredients: [
						'643d69a5c3f7b9001cfa093d',
						'643d69a5c3f7b9001cfa093e',
						'643d69a5c3f7b9001cfa093e',
					],
					name: 'Флюоресцентный фалленианский люминесцентный метеоритный бургер',
					number: 45501,
					status: 'done',
					updatedAt: '2024-07-11T20:18:59.523Z',
					_id: '66903e33119d45001b4f82f0',
				},
			],
			total: 10000,
			totalToday: 10,
			state: 'loaded',
			errorMessage: '',
		});
	});
});
