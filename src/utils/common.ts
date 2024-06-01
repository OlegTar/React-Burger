import { SyntheticEvent } from 'react';
import {
	DataFromServerResponse,
	IIngredientFromServer,
} from '../types/responses/data-from-server-response';
import { IIngredient } from '../types/application-types/ingredient';
import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { accessToken, baseUrl, refreshToken, token } from '../config';
import { RefreshTokenResponse } from '../types/responses/refresh-token-response';
import { ChangePasswordRequest } from '../types/requests/change-password-request';
import { ChangeUserInfoRequest } from '../types/requests/change-user-info-request';
import { LoginRequest } from '../types/requests/login-request';
import { PasswordResetRequest } from '../types/requests/password-reset-request';
import { OrderRequest } from '../types/requests/order-request';
import { LogoutRequest } from '../types/requests/logout-request';
import { LoginResponse } from '../types/responses/login-response';
import { LogoutResponse } from '../types/responses/logout-response';
import { SimpleResponse } from '../types/responses/simple-response';
import { OrderResponse } from '../types/responses/order-response';
import { UserResponse } from '../types/responses/user-response';

const refreshAccessToken = async () => {
	const axiosInstance = axios.create();
	const { data: result } = await axiosInstance<RefreshTokenResponse>(
		`${baseUrl}${token}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			data: {
				token: localStorage.getItem('refreshToken'),
			},
		}
	);

	if (!result.success) {
		throw new Error('Не удалось обновить токен');
	}

	localStorage.setItem(refreshToken, result.refreshToken);
	localStorage.setItem(accessToken, result.accessToken);
	return result.accessToken;
};

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		const data = error.response.data as SimpleResponse;
		if (data.message === 'jwt expired' && !originalRequest._retry) {
			originalRequest._retry = true;
			const accessToken = await refreshAccessToken();
			axios.defaults.headers.common['Authorization'] = accessToken;
			return axios(originalRequest);
		}
		return Promise.reject(error);
	}
);

export const linkHandler = (
	e: SyntheticEvent<HTMLAnchorElement>,
	callback: () => void
) => {
	//чтобы не было перехода по ссылке
	e.preventDefault();
	callback();
};

export const convert = (ing: IIngredientFromServer): IIngredient => {
	return {
		...ing,
		type: ing.type === 'bun' ? 'bun' : ing.type === 'sauce' ? 'sauce' : 'main',
		imageLarge: ing.image_large,
		imageMobile: ing.image_mobile,
	};
};

type ResponseType =
	| LoginResponse
	| LogoutResponse
	| SimpleResponse
	| UserResponse
	| OrderResponse
	| DataFromServerResponse;

type RequestOptions = {
	method: 'GET' | 'POST' | 'PATCH';
	headers: {
		[key: string]: string;
	};
	body?:
		| LoginRequest
		| LogoutRequest
		| PasswordResetRequest
		| ChangePasswordRequest
		| ChangeUserInfoRequest
		| OrderRequest;
};

const checkResponse = (response: AxiosResponse<ResponseType>) => {
	if (response.status !== HttpStatusCode.Ok) {
		return Promise.reject(`Ошибка ${response.status}`);
	}
	if (!response.data.success) {
		return Promise.reject(`Ошибка ${response.data.message || ''}`);
	}
	return response.data;
};

export const request = async <T extends ResponseType>(
	url: string,
	options?: RequestOptions
) => {
	const headers: Record<string, string> = {};
	if (options && options.headers !== undefined) {
		const optionsHeaders = options.headers as { [key: string]: string };

		Object.keys(optionsHeaders).forEach((key) => {
			headers[key] = optionsHeaders[key];
		});
	}

	const response = await axios<ResponseType>(url, {
		method: !options ? 'GET' : options.method,
		data: options?.body,
		headers: headers,
	});
	return checkResponse(response) as T;
};
