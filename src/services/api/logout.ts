import { baseUrl, logout } from '../../config';
import { LogoutResponse } from '../../types/logout-response';
import { request } from '../../utils/common';

export const sendLogoutRequest = (token: string) => {
	const body = {
		token,
	};
	return request<LogoutResponse>(`${baseUrl}${logout}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(body),
	});
};
