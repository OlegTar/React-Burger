import { AnyAction, applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { reset, resetMessages, user, UserState, initialState } from './user';
import axios, { AxiosResponse } from 'axios';
import { rootReducer } from './rootReducer';
import { AppState } from '../store';
import {
	accessToken,
	baseUrl,
	changePassword as changePasswordUrl,
	login as loginUrl,
	logout as logoutUrl,
	refreshToken,
	token,
	user as userUrl,
} from '../../config';
import { login } from '../actions/login';
import { logout } from '../actions/logout';
import { changeUserInfo } from '../actions/change-user-info';
import { changePassword } from '../actions/change-password';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { buildGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import exp from 'constants';
jest.mock('axios');

const reducer = user.reducer;

describe('user reducer tests', () => {
	it('test of initial tests', () => {
		//act
		const state = reducer(undefined, { type: '' });
		//assert
		expect(state).toStrictEqual({
			user: null,
			state: 'init',
			errorMessage: '',
			successMessage: '',
			changeUserInfoState: 'init',
			passwordResetState: 'init',
			changePasswordState: 'init',
			registerState: 'init',
		} as UserState);
	});

	it('reset: should set state to init', () => {
		//arrange
		const initialState: UserState = {
			user: null,
			state: 'success',
			errorMessage: '',
			successMessage: '',
			changeUserInfoState: 'init',
			passwordResetState: 'init',
			changePasswordState: 'init',
			registerState: 'init',
		};

		//act
		const state = reducer(initialState, reset());
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: 'init',
		});
	});

	it('resetMessages: should clear messages', () => {
		//arrange
		const initialState: UserState = {
			user: null,
			state: 'success',
			errorMessage: 'test',
			successMessage: 'test',
			changeUserInfoState: 'init',
			passwordResetState: 'init',
			changePasswordState: 'init',
			registerState: 'init',
		};

		//act
		const state = reducer(initialState, resetMessages());
		//assert
		expect(state).toStrictEqual({
			...initialState,
			errorMessage: '',
			successMessage: '',
		});
	});

	it('login: status 200 OK, should set the user property', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();
		(axios.post as jest.Mock).mockResolvedValue({
			status: 200,
			statusText: '200 OK',
			data: {
				success: true,
				accessToken:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTdiMjQ1OTdlZGUwMDAxZDA2ZDJmMCIsImlhdCI6MTcyMDgzMzI5MCwiZXhwIjoxNzIwODM0NDkwfQ.t-BuS4ZwxqV87ccXhQv8W2dl0LrERAAuSI0QhBTUg-4',
				refreshToken:
					'7c9bb020a6395e534f48a7ad75ea51935eac316c439cd5cb2ec28747eccb46bfe9fb182cf700eafe',
				user: {
					email: 'o.tarusow@yandex.ru',
					name: 'Oleg',
				},
			},
		});

		//act
		await store.dispatch(
			login({
				email: 'o.tarusow@yandex.ru',
				password: '12345',
			})
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...initialState,
			user: {
				...initialState.user,
				state: 'success',
				user: {
					email: 'o.tarusow@yandex.ru',
					name: 'Oleg',
				},
			},
		} as AppState);
	});

	it('login: status 401 Unauthorized, should set success to false', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();
		(axios.post as jest.Mock).mockResolvedValue({
			status: 401,
			statusText: '401 Unauthorized',
			data: {
				success: false,
				message: 'email or password are incorrect',
			},
		});

		//act
		await store.dispatch(
			login({
				email: 'o.tarusow@yandex.ru',
				password: '12345',
			})
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...initialState,
			user: {
				...initialState.user,
				errorMessage: 'Неверный логин/пароль',
				state: 'error',
				user: null,
			},
		} as AppState);
	});

	it('login: status 200 OK, but success is false, should set success to false', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();
		(axios.post as jest.Mock).mockResolvedValue({
			status: 200,
			statusText: '200 OK',
			data: {
				success: false,
				message: 'error',
			},
		});

		//act
		await store.dispatch(
			login({
				email: 'o.tarusow@yandex.ru',
				password: '12345',
			})
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...initialState,
			user: {
				...initialState.user,
				errorMessage: 'Неверный логин/пароль',
				state: 'error',
				user: null,
			},
		} as AppState);
	});

	it('login: should send request', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		(axios.post as jest.Mock).mockImplementationOnce(jest.fn);

		//act
		await store.dispatch(
			login({
				email: 'o.tarusow@yandex.ru',
				password: '12345',
			})
		);
		//assert
		expect(axios.post).toHaveBeenCalledWith(
			`${baseUrl}${loginUrl}`,
			{
				email: 'o.tarusow@yandex.ru',
				password: '12345',
			},
			{ headers: { 'content-type': 'application/json' } }
		);
	});

	it('logout: 200 OK, should send request', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		(axios.post as jest.Mock).mockImplementationOnce(jest.fn);
		Storage.prototype.getItem = jest.fn((t) =>
			t === refreshToken ? 'test' : ''
		);

		//act
		await store.dispatch(logout());
		//assert
		expect(axios.post).toHaveBeenCalledWith(
			`${baseUrl}${logoutUrl}`,
			{
				token: 'test',
			},
			{ headers: { 'content-type': 'application/json' } }
		);
	});

	it('logout: 200 OK: should set property user to null', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialUserState = reducer(undefined, { type: '' });
		(axios.post as jest.Mock).mockResolvedValueOnce({
			status: 200,
			statusText: '200 OK',
			data: {
				message: 'Successful logout',
				success: true,
			},
		} as AxiosResponse);
		const initialState = store.getState();

		//act
		await store.dispatch(logout());
		//assert
		expect(store.getState()).toStrictEqual({
			...initialState,
			user: {
				...initialUserState,
				user: null,
				state: 'success',
			},
		} as AppState);
	});

	it("logout: 500 Internal Server Error: should set state 'error'", async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialUserState = reducer(undefined, { type: '' });
		(axios.post as jest.Mock).mockResolvedValueOnce({
			status: 500,
			statusText: '500 Internal Server Error',
			data: {},
		} as AxiosResponse);
		const initialState = store.getState();

		//act
		await store.dispatch(logout());

		//assert
		expect(store.getState()).toStrictEqual({
			...initialState,
			user: {
				...initialUserState,
				user: null,
				state: 'error',
				errorMessage: 'Выйти не удалось',
			},
		} as AppState);
	});

	it('changeUserInfo: should send request', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		Storage.prototype.getItem = jest.fn((token) => {
			if (token === accessToken) {
				return 'Bearer test';
			}
			return '';
		});
		(axios.patch as jest.Mock).mockImplementationOnce(jest.fn);
		//act
		await store.dispatch(
			changeUserInfo({
				email: 'o.tarusow@yandex.ru',
				name: 'Oleg',
				password: '12345',
			})
		);
		//assert
		expect(axios.patch).toHaveBeenCalledWith(
			`${baseUrl}${userUrl}`,
			{
				email: 'o.tarusow@yandex.ru',
				name: 'Oleg',
				password: '12345',
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer test',
				},
			}
		);
	});

	it('changeUserInfo: 403 Forbidden: should set the error property', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialUserState = reducer(undefined, { type: '' });
		(axios.patch as jest.Mock).mockResolvedValueOnce({
			status: 403,
			statusText: '403 Forbidden',
			data: {
				message: 'User with such email already exists',
				success: false,
			},
		} as AxiosResponse);
		const initialState = store.getState();

		//act
		await store.dispatch(
			changeUserInfo({
				email: 'o.tarusow@yandex.ru1',
				name: 'Oleg',
				password: '12345',
			})
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...initialState,
			user: {
				...initialUserState,
				user: null,
				changeUserInfoState: 'error',
				errorMessage: 'Не удалось поменять данные пользователя',
			},
		} as AppState);
	});

	it('changeUserInfo: 1111 ', () => {
		//arrange
		const initialState = reducer(undefined, { type: '' });
		console.log({ initialState });
		const state = reducer(initialState, {
			type: changeUserInfo.pending.type,
		});
		console.log({ state });
		expect(state).toStrictEqual({
			...initialState,
			changeUserInfoState: 'pending',
		} as UserState);

		// (axios.patch as jest.Mock).mockResolvedValueOnce({
		// 	status: 403,
		// 	statusText: '403 Forbidden',
		// 	data: {
		// 		message: 'User with such email already exists',
		// 		success: false,
		// 	},
		// } as AxiosResponse);
		// //act
		// await store.dispatch(
		// 	changeUserInfo({
		// 		email: 'o.tarusow@yandex.ru1',
		// 		name: 'Oleg',
		// 		password: '12345',
		// 	})
		// );
		// //assert
		// expect(spy).toHaveBeenCalledWith('user/changeUserInfo/pending');
		// expect(spy).toHaveBeenCalledWith('user/changeUserInfo/rejected');
	});

	it('changeUserInfo: 200 OK: should change the user property', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialUserState = reducer(undefined, { type: '' });
		(axios.patch as jest.Mock).mockResolvedValueOnce({
			status: 200,
			statusText: '200 OK',
			data: {
				success: true,
				user: { email: 'o.tarusow@yandex.ru', name: 'Oleg' },
			},
		} as AxiosResponse);
		const initialState = store.getState();

		//act
		await store.dispatch(
			changeUserInfo({
				email: 'o.tarusow@yandex.ru',
				name: 'Oleg',
				password: '12345',
			})
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...initialState,
			user: {
				...initialUserState,
				user: {
					email: 'o.tarusow@yandex.ru',
					name: 'Oleg',
				},
				changeUserInfoState: 'success',
				successMessage: 'Данные пользователя изменены',
			},
		} as AppState);
	});

	it('changePassword: should send request', async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		Storage.prototype.getItem = jest.fn((token) => {
			if (token === accessToken) {
				return 'Bearer test';
			}
			return '';
		});
		(axios.post as jest.Mock).mockImplementationOnce(jest.fn);
		//act
		await store.dispatch(
			changePassword({
				token: 'test',
				password: '12345',
			})
		);
		//assert
		expect(axios.post).toHaveBeenCalledWith(
			`${baseUrl}${changePasswordUrl}`,
			{
				token: 'test',
				password: '12345',
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	});

	it('changePassword: should send request', async () => {
		//arrange
		const initialState = reducer(undefined, { type: '' });

		//act
		const state = reducer(
			undefined,
			changePassword.pending('', {
				password: 'test',
				token: 'test',
			})
		);

		//assert
		expect(state).toStrictEqual({
			...initialState,
			changePasswordState: 'pending',
		});
	});
});
