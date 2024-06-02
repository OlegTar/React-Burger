import { accessToken, baseUrl, logout, refreshToken } from '../../config';
import { LogoutResponse } from '../../types/responses/logout-response';
import { request } from '../../utils/common';

export const sendLogoutRequest = async () => {
	const body = {
		token: localStorage.getItem(refreshToken) || '',
	};
	await request<LogoutResponse>(`${baseUrl}${logout}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body,
	});
	localStorage.removeItem(accessToken);
	localStorage.removeItem(refreshToken);
};
