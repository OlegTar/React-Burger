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

describe("user reducer tests", () => {
	it("Test of initial tests", () => {
		//act
		const state = reducer(undefined, { type: "" });
		//assert
		expect(state).toStrictEqual({
			user: null,
			state: "init",
			errorMessage: "",
			successMessage: "",
			changeUserInfoState: "init",
			passwordResetState: "init",
			changePasswordState: "init",
			registerState: "init",
		} as UserState);
	});

	it("setUser: should set the user property", () => {
		//arrange
		const initialState: UserState = {
			user: null,
			state: "init",
			errorMessage: "",
			successMessage: "",
			changeUserInfoState: "init",
			passwordResetState: "init",
			changePasswordState: "init",
			registerState: "init",
		};

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
		const initialState: UserState = {
			user: {
				name: "Oleg",
				email: "o.tarusow@yandex.ru",
			},
			state: "success",
			errorMessage: "",
			successMessage: "",
			changeUserInfoState: "init",
			passwordResetState: "init",
			changePasswordState: "init",
			registerState: "init",
		};

		//act
		const state = reducer(initialState, reset());
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "init",
		});
	});

	it("resetMessages: should clear messages", () => {
		//arrange
		const initialState: UserState = {
			user: null,
			state: "success",
			errorMessage: "test",
			successMessage: "test",
			changeUserInfoState: "init",
			passwordResetState: "init",
			changePasswordState: "init",
			registerState: "init",
		};

		//act
		const state = reducer(initialState, resetMessages());
		//assert
		expect(state).toStrictEqual({
			...initialState,
			errorMessage: "",
			successMessage: "",
		});
	});

	it("login.pending should set state to 'pending' and user to null", () => {
		//arrange
		const initialState: UserState = {
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
		//act
		const state = reducer(initialState, { type: login.pending.type });
		//arrange
		expect(state).toStrictEqual({
			...initialState,
			user: null,
			state: "pending",
		});
	});

	it("login.rejected should set state to 'error', the user to null, and the successMessage to 'Неверный логин/пароль'", () => {
		//arrange
		const initialState: UserState = {
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
		//act
		const state = reducer(initialState, { type: login.rejected.type });
		//arrange
		expect(state).toStrictEqual({
			...initialState,
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
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, { type: logout.pending.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "pending",
		});
	});

	it("logout.rejected should set the state to 'error' and set the errorMessage to 'Выйти не удалось'", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, { type: logout.rejected.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "error",
			errorMessage: "Выйти не удалось",
		});
	});

	it("logout.fulfilled should set the state to 'success' and set the user to null", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, { type: logout.fulfilled.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			state: "success",
			user: null,
		});
	});

	it("changeUserInfo.pending should set the changeUserInfoState to 'pending'", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, { type: changeUserInfo.pending.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			changeUserInfoState: "pending",
		});
	});

	it("changeUserInfo.rejected should set the changeUserInfoState to 'error' and set the errorMessage", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, { type: changeUserInfo.rejected.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			changeUserInfoState: "error",
			errorMessage: "Не удалось поменять данные пользователя",
		});
	});

	it("changeUserInfo.fulfilled should set the changeUserInfoState to 'success' and set the successMessage, and fill the user", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: changeUserInfo.fulfilled.type,
			payload: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			changeUserInfoState: "success",
			successMessage: "Данные пользователя изменены",
		});
	});

	it("changePassword.pending should set the changePasswordState to 'pending'", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: changePassword.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			changePasswordState: "pending",
		});
	});

	it("changePassword.rejected should set the changePasswordState to 'error' and set the errorMessage", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, { type: changePassword.rejected.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			changePasswordState: "error",
			errorMessage: "Не удалось поменять пароль",
		});
	});

	it("changePassword.fulfilled should set the changePasswordState to 'success' and set the successMessage", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: changePassword.fulfilled.type,
			payload: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
				password: "test",
			},
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			changePasswordState: "success",
			successMessage: "Пароль изменён",
		});
	});

	it("passwordReset.pending should set the passwordResetState to 'pending'", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: passwordReset.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			passwordResetState: "pending",
		});
	});

	it("passwordReset.rejected should set the passwordResetState to 'error' and set the errorMessage", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: passwordReset.rejected.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			passwordResetState: "error",
			errorMessage: "Не удалось поменять пароль",
		});
	});

	it("passwordReset.fulfilled should set the passwordResetState to 'success' and set the successMessage", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: passwordReset.fulfilled.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			passwordResetState: "success",
			successMessage: "Письмо отправлено",
		});
	});

	it("register.pending should set the registerState to 'pending'", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: register.pending.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			registerState: "pending",
		});
	});

	it("register.rejected should set the registerState to 'error' and set the errorMessage", () => {
		//arrange
		const initialState: UserState = {
			user: {
				email: "o.tarusow@yandex.ru",
				name: "Oleg",
			},
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
		//act
		const state = reducer(initialState, {
			type: register.rejected.type,
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			registerState: "error",
			errorMessage: "Не удалось зарегистрироваться",
		});
	});

	it("register.fulfilled should set the registerState to 'success' and set the successMessage", () => {
		//arrange
		const initialState: UserState = {
			user: null,
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
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
			...initialState,
			registerState: "success",
			user: {
				name: "Oleg",
				email: "o.tarusow@yandex.ru",
			},
		});
	});

	it("getUser.pending should set the state to 'pending'", () => {
		//arrange
		const initialState: UserState = {
			user: null,
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
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
		//arrange
		const initialState: UserState = {
			user: null,
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
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
		//arrange
		const initialState: UserState = {
			user: null,
			changePasswordState: "init",
			changeUserInfoState: "init",
			passwordResetState: "init",
			registerState: "init",
			errorMessage: "",
			successMessage: "",
			state: "init",
		};
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
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();
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
			...initialState,
			user: {
				...initialState.user,
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
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();
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
			...initialState,
			user: {
				...initialState.user,
				errorMessage: "Неверный логин/пароль",
				state: "error",
				user: null,
			},
		} as AppState);
	});

	it("login: status 200 OK, but success is false, should set success to false", async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialState = store.getState();
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
			...initialState,
			user: {
				...initialState.user,
				errorMessage: "Неверный логин/пароль",
				state: "error",
				user: null,
			},
		} as AppState);
	});

	it("login: should send request", async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
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
		const store = configureStore({ reducer: rootReducer });
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
		const store = configureStore({ reducer: rootReducer });
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
		const store = configureStore({ reducer: rootReducer });
		const initialUserState = reducer(undefined, { type: "" });
		(axios.post as jest.Mock).mockResolvedValueOnce({
			status: 500,
			statusText: "500 Internal Server Error",
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
				state: "error",
				errorMessage: "Выйти не удалось",
			},
		} as AppState);
	});

	it("changeUserInfo: should send request", async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
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
		const store = configureStore({ reducer: rootReducer });
		const initialUserState = reducer(undefined, { type: "" });
		(axios.patch as jest.Mock).mockResolvedValueOnce({
			status: 403,
			statusText: "403 Forbidden",
			data: {
				message: "User with such email already exists",
				success: false,
			},
		} as AxiosResponse);
		const initialState = store.getState();

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
			...initialState,
			user: {
				...initialUserState,
				user: null,
				changeUserInfoState: "error",
				errorMessage: "Не удалось поменять данные пользователя",
			},
		} as AppState);
	});

	it("changeUserInfo: 200 OK: should change the user property", async () => {
		//arrange
		const store = configureStore({ reducer: rootReducer });
		const initialUserState = reducer(undefined, { type: "" });
		(axios.patch as jest.Mock).mockResolvedValueOnce({
			status: 200,
			statusText: "200 OK",
			data: {
				success: true,
				user: { email: "o.tarusow@yandex.ru", name: "Oleg" },
			},
		} as AxiosResponse);
		const initialState = store.getState();

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
			...initialState,
			user: {
				...initialUserState,
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
		const store = configureStore({ reducer: rootReducer });
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

	it("changePassword: should send request", async () => {
		//arrange
		const initialState = reducer(undefined, { type: "" });

		//act
		const state = reducer(
			undefined,
			changePassword.pending("", {
				password: "test",
				token: "test",
			}),
		);

		//assert
		expect(state).toStrictEqual({
			...initialState,
			changePasswordState: "pending",
		});
	});
	//Наставник сказал не тестировать store, только reducer, оставляю тестирование store'а
});
