import { baseUrl, user } from '../../config';
import { UserResponse } from '../../types/responses/user-response';
import { request } from '../../utils/common';

export const sendGetUserRequest = () => {
	const result = request<UserResponse>(`${baseUrl}${user}`, {
		method: 'GET',
		headers: {
			Authorization: localStorage.getItem('accessToken') as string,
		},
	});
	return result;
};
