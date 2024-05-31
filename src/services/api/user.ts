import { baseUrl, user } from '../../config';
import { UserResponse } from '../../types/responses/user-response';
import { request } from '../../utils/common';

export const sendGetUserRequest = () => {
	return request<UserResponse>(`${baseUrl}${user}`, {
		method: 'GET',
		headers: {
			Authorization: localStorage.getItem('accessToken') as string,
		},
	});
};
