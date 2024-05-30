import { baseUrl, user } from '../../config';
import { UserResponse } from '../../types/user-response';
import { request } from '../../utils/common';

export const getUserRequest = () => {
	return request<UserResponse>(`${baseUrl}${user}`, {
		method: 'GET',
		headers: {
			Authorization: localStorage.getItem('accessToken') as string,
		},
	});
};
