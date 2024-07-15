import { configureStore } from "@reduxjs/toolkit";
import {
	initialState,
	reset,
	resetMessages,
	setUser,
	user,
	UserState,
} from "./user";
import axios, { AxiosResponse } from "axios";
import { rootReducer } from "./rootReducer";
import { AppState } from "../store";
import {
	accessToken,
	baseUrl,
	changePassword as changePasswordUrl,
	login as loginUrl,
	logout as logoutUrl,
	passwordReset as passwordResetUrl,
	refreshToken,
	user as userUrl,
} from "../../config";
import { login } from "../actions/login";
import { logout } from "../actions/logout";
import { changeUserInfo } from "../actions/change-user-info";
import { changePassword } from "../actions/change-password";
import { User } from "../../types/application-types/user";
import { passwordReset } from "../actions/password-reset";
import { register } from "../actions/register";
import { getUser } from "../actions/user";
jest.mock("axios");

const reducer = user.reducer;

const initialStateWithUser: UserState = {
	user: {
		name: "Oleg",
		email: "o.tarusow@yandex.ru",
	},
	changePasswordState: "init",
	passwordResetState: "init",
	changeUserInfoState: "init",
	registerState: "init",
	errorMessage: "",
	successMessage: "",
	state: "init",
};

describe("user reducer tests", () => {
	let store: ReturnType<typeof configureStore<AppState>>;
	let appInitialState: AppState;
	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		appInitialState = store.getState();
	});

	it("Test of initial tests", () => {
		//act
		const state = reducer(undefined, { type: "" });
		//assert
		expect(state).toStrictEqual(initialState);
	});

	it("setUser: should set the user property", () => {
		//act
		const state = reducer(
			initialState,
			setUser({
				name: "Oleg",
				email: "o.tarusow@yandex.ru",
			}),
		);
		//assert
		expect(state).toStrictEqual({
			...initialState,
			user: { name: "Oleg", email: "o.tarusow@yandex.ru" },
		});
	});

	it("reset: should set state to init", () => {
		//arrange
		const initialStateSuccess: UserState = {
			...initialState,
			state: "success",
		};

		//act
		const state = reducer(initialStateSuccess, reset());
		//assert
		expect(state).toStrictEqual({ ...initialStateSuccess, state: "init" });
	});

	it("resetMessages: should clear messages", () => {
		//arrange
		const initialStateWithMessages: UserState = {
			...initialState,
			errorMessage: "test",
			successMessage: "test",
		};

		//act
		const state = reducer(initialStateWithMessages, resetMessages());
		//assert
		expect(state).toStrictEqual({
			...initialStateWithMessages,
			errorMessage: "",
			successMessage: "",
		});
	});

	it("login.pending should set state to 'pending' and user to null", () => {
		//arrange

		//act
		const state = reducer(initialStateWithUser, { type: login.pending.type });
		//arrange
		expect(state).toStrictEqual({
			...initialStateWithUser,
			user: null,
			state: "pending",
		});
	});

	it("login.rejected should set state to 'error', the user to null, and the successMessage to 'Неверный логин/пароль'", () => {
		//act
		const state = reducer(initialStateWithUser, { type: login.rejected.type });
		//arrange
		expect(state).toStrictEqual({
			...initialStateWithUser,
			user: null,
			state: "error",
			errorMessage: "Неверный логин/пароль",
		});
	});

	it("login.fulfilled should set the state to 'success' and fill the user property", () => {
		//act
		const state = reducer(initialState, {
			type: login.fulfilled.type,
			payload: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			} as User,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "success",
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
		});
	});

	it("logout.pending should set state to 'pending'", () => {
		//act
		const state = reducer(initialStateWithUser, { type: logout.pending.type });
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			state: "pending",
		});
	});

	it("logout.rejected should set the state to 'error' and set the errorMessage to 'Выйти не удалось'", () => {
		//act
		const state = reducer(initialStateWithUser, { type: logout.rejected.type });
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			state: "error",
			errorMessage: "Выйти не удалось",
		});
	});

	it("logout.fulfilled should set the state to 'success' and set the user to null", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: logout.fulfilled.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			state: "success",
			user: null,
		});
	});

	it("changeUserInfo.pending should set the changeUserInfoState to 'pending'", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: changeUserInfo.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			changeUserInfoState: "pending",
		});
	});

	it("changeUserInfo.rejected should set the changeUserInfoState to 'error' and set the errorMessage", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: changeUserInfo.rejected.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			changeUserInfoState: "error",
			errorMessage: "Не удалось поменять данные пользователя",
		});
	});

	it("changeUserInfo.fulfilled should set the changeUserInfoState to 'success' and set the successMessage, and fill the user", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: changeUserInfo.fulfilled.type,
			payload: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			changeUserInfoState: "success",
			successMessage: "Данные пользователя изменены",
		});
	});

	it("changePassword.pending should set the changePasswordState to 'pending'", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: changePassword.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			changePasswordState: "pending",
		});
	});

	it("changePassword.rejected should set the changePasswordState to 'error' and set the errorMessage", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: changePassword.rejected.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			changePasswordState: "error",
			errorMessage: "Не удалось поменять пароль",
		});
	});

	it("changePassword.fulfilled should set the changePasswordState to 'success' and set the successMessage", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: changePassword.fulfilled.type,
			payload: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
				password: "test",
			},
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			changePasswordState: "success",
			successMessage: "Пароль изменён",
		});
	});

	it("passwordReset.pending should set the passwordResetState to 'pending'", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: passwordReset.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			passwordResetState: "pending",
		});
	});

	it("passwordReset.rejected should set the passwordResetState to 'error' and set the errorMessage", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: passwordReset.rejected.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			passwordResetState: "error",
			errorMessage: "Не удалось поменять пароль",
		});
	});

	it("passwordReset.fulfilled should set the passwordResetState to 'success' and set the successMessage", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: passwordReset.fulfilled.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			passwordResetState: "success",
			successMessage: "Письмо отправлено",
		});
	});

	it("register.pending should set the registerState to 'pending'", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: register.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			registerState: "pending",
		});
	});

	it("register.rejected should set the registerState to 'error' and set the errorMessage", () => {
		//act
		const state = reducer(initialStateWithUser, {
			type: register.rejected.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			registerState: "error",
			errorMessage: "Не удалось зарегистрироваться",
		});
	});

	it("register.fulfilled should set the registerState to 'success' and set the successMessage", () => {
		//act
		const state = reducer(initialState, {
			type: register.fulfilled.type,
			payload: {
				name: "Oleg",
				email: "o.tarusow@yandex.ru",
			},
		});
		//assert
		expect(state).toStrictEqual({
			...initialStateWithUser,
			registerState: "success",
		});
	});

	it("getUser.pending should set the state to 'pending'", () => {
		//act
		const state = reducer(initialState, {
			type: getUser.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "pending",
		});
	});

	it("getUser.rejected should set the state to 'error', the user to null, and set the errorMessage", () => {
		//act
		const state = reducer(initialState, {
			type: getUser.rejected.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "error",
			user: null,
			errorMessage: "Не удалось получить данные пользователя",
		});
	});

	it("getUser.fulfilled should set the state to 'success', fill the user property", () => {
		//act
		const state = reducer(initialState, {
			type: getUser.fulfilled.type,
			payload: {
				name: "Oleg",
				email: "o.tarusow@yandex.ru",
			},
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "success",
			user: {
				name: "Oleg",
				email: "o.tarusow@yandex.ru",
			},
		});
	});

	it("login: status 200 OK, should set the user property", async () => {
		//arrange
		(axios.post as jest.Mock).mockResolvedValue({
			status: 200,
			statusText: "200 OK",
			data: {
				success: true,
				accessToken:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTdiMjQ1OTdlZGUwMDAxZDA2ZDJmMCIsImlhdCI6MTcyMDgzMzI5MCwiZXhwIjoxNzIwODM0NDkwfQ.t-BuS4ZwxqV87ccXhQv8W2dl0LrERAAuSI0QhBTUg-4",
				refreshToken:
					"7c9bb020a6395e534f48a7ad75ea51935eac316c439cd5cb2ec28747eccb46bfe9fb182cf700eafe",
				user: {
					email: "o.tarusow@yandex.ru",
					name: "Oleg",
				},
			},
		});

		//act
		await store.dispatch(
			login({
				email: "o.tarusow@yandex.ru",
				password: "12345",
			}),
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...appInitialState,
			user: {
				...initialState,
				state: "success",
				user: {
					email: "o.tarusow@yandex.ru",
					name: "Oleg",
				},
			},
		} as AppState);
	});

	it("login: status 401 Unauthorized, should set success to false", async () => {
		//arrange
		(axios.post as jest.Mock).mockResolvedValue({
			status: 401,
			statusText: "401 Unauthorized",
			data: {
				success: false,
				message: "email or password are incorrect",
			},
		});

		//act
		await store.dispatch(
			login({
				email: "o.tarusow@yandex.ru",
				password: "12345",
			}),
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...appInitialState,
			user: {
				...initialState,
				errorMessage: "Неверный логин/пароль",
				state: "error",
				user: null,
			},
		} as AppState);
	});

	it("login: status 200 OK, but success is false, should set success to false", async () => {
		//arrange
		(axios.post as jest.Mock).mockResolvedValue({
			status: 200,
			statusText: "200 OK",
			data: {
				success: false,
				message: "error",
			},
		});

		//act
		await store.dispatch(
			login({
				email: "o.tarusow@yandex.ru",
				password: "12345",
			}),
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...appInitialState,
			user: {
				...initialState,
				errorMessage: "Неверный логин/пароль",
				state: "error",
				user: null,
			},
		} as AppState);
	});

	it("login: should send request", async () => {
		//arrange
		(axios.post as jest.Mock).mockImplementationOnce(jest.fn);

		//act
		await store.dispatch(
			login({
				email: "o.tarusow@yandex.ru",
				password: "12345",
			}),
		);
		//assert
		expect(axios.post).toHaveBeenCalledWith(
			`${baseUrl}${loginUrl}`,
			{
				email: "o.tarusow@yandex.ru",
				password: "12345",
			},
			{ headers: { "content-type": "application/json" } },
		);
	});

	it("logout: 200 OK, should send request", async () => {
		//arrange
		(axios.post as jest.Mock).mockImplementationOnce(jest.fn);
		Storage.prototype.getItem = jest.fn((t) =>
			t === refreshToken ? "test" : "",
		);

		//act
		await store.dispatch(logout());
		//assert
		expect(axios.post).toHaveBeenCalledWith(
			`${baseUrl}${logoutUrl}`,
			{
				token: "test",
			},
			{ headers: { "content-type": "application/json" } },
		);
	});

	it("logout: 200 OK: should set property user to null", async () => {
		//arrange
		const initialUserState = reducer(undefined, { type: "" });
		(axios.post as jest.Mock).mockResolvedValueOnce({
			status: 200,
			statusText: "200 OK",
			data: {
				message: "Successful logout",
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
				state: "success",
			},
		} as AppState);
	});

	it("logout: 500 Internal Server Error: should set state 'error'", async () => {
		//arrange
		(axios.post as jest.Mock).mockResolvedValueOnce({
			status: 500,
			statusText: "500 Internal Server Error",
			data: {},
		} as AxiosResponse);
		//act
		await store.dispatch(logout());

		//assert
		expect(store.getState()).toStrictEqual({
			...appInitialState,
			user: {
				...initialState,
				user: null,
				state: "error",
				errorMessage: "Выйти не удалось",
			},
		} as AppState);
	});

	it("changeUserInfo: should send request", async () => {
		//arrange
		Storage.prototype.getItem = jest.fn((token) => {
			if (token === accessToken) {
				return "Bearer test";
			}
			return "";
		});
		(axios.patch as jest.Mock).mockImplementationOnce(jest.fn);
		//act
		await store.dispatch(
			changeUserInfo({
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
				password: "12345",
			}),
		);
		//assert
		expect(axios.patch).toHaveBeenCalledWith(
			`${baseUrl}${userUrl}`,
			{
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
				password: "12345",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer test",
				},
			},
		);
	});

	it("changeUserInfo: 403 Forbidden: should set the error property", async () => {
		//arrange
		(axios.patch as jest.Mock).mockResolvedValueOnce({
			status: 403,
			statusText: "403 Forbidden",
			data: {
				message: "User with such email already exists",
				success: false,
			},
		} as AxiosResponse);

		//act
		await store.dispatch(
			changeUserInfo({
				email: "o.tarusow@yandex.ru1",
				name: "Oleg",
				password: "12345",
			}),
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...appInitialState,
			user: {
				...initialState,
				user: null,
				changeUserInfoState: "error",
				errorMessage: "Не удалось поменять данные пользователя",
			},
		} as AppState);
	});

	it("changeUserInfo: 200 OK: should change the user property", async () => {
		//arrange
		(axios.patch as jest.Mock).mockResolvedValueOnce({
			status: 200,
			statusText: "200 OK",
			data: {
				success: true,
				user: { email: "o.tarusow@yandex.ru", name: "Oleg" },
			},
		} as AxiosResponse);
		//act
		await store.dispatch(
			changeUserInfo({
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
				password: "12345",
			}),
		);
		//assert
		expect(store.getState()).toStrictEqual({
			...appInitialState,
			user: {
				...initialState,
				user: {
					email: "o.tarusow@yandex.ru",
					name: "Oleg",
				},
				changeUserInfoState: "success",
				successMessage: "Данные пользователя изменены",
			},
		} as AppState);
	});

	it("changePassword: should send request", async () => {
		//arrange
		Storage.prototype.getItem = jest.fn((token) => {
			if (token === accessToken) {
				return "Bearer test";
			}
			return "";
		});
		(axios.post as jest.Mock).mockImplementationOnce(jest.fn);
		//act
		await store.dispatch(
			changePassword({
				token: "test",
				password: "12345",
			}),
		);
		//assert
		expect(axios.post).toHaveBeenCalledWith(
			`${baseUrl}${changePasswordUrl}`,
			{
				token: "test",
				password: "12345",
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	});
	//Наставник сказал не тестировать store, только reducer, оставляю тестирование store'а
});
