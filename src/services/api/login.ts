import { baseUrl, login } from '../../config';
import { LoginRequest } from '../../types/requests/login-request';
import { LoginResponse } from '../../types/responses/login-response';
import { request } from '../../utils/common';

export const sendLoginRequest = (loginRequest: LoginRequest) => {
	return request<LoginResponse>(`${baseUrl}${login}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(loginRequest),
	});
};
