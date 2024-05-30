import { baseUrl, user } from '../../config';
import { ChangeUserInfoRequest } from '../../types/change-user-info-request';
import { UserResponse } from '../../types/user-response';
import { request } from '../../utils/common';

export const changeUserInfoRequest = (
	changeUserInfoRequest: ChangeUserInfoRequest
) => {
	return request<UserResponse>(`${baseUrl}${user}`, {
		method: 'PATCH',
		headers: {
			Authorization: localStorage.getItem('accessToken') as string,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(changeUserInfoRequest),
	});
};
