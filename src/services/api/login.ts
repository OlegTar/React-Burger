import { baseUrl, login } from '../../config';
import { LoginRequest } from '../../types/login-request';
import { LoginResponse } from '../../types/login-response';
import { request } from '../../utils/common';

export const sendLoginRequest = (loginRequest: LoginRequest) => {
	return request<LoginResponse>(`${baseUrl}${login}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(loginRequest),
	});
};
