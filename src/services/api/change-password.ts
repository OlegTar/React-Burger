import { baseUrl, changePassword } from '../../config';
import { ChangePasswordRequest } from '../../types/requests/change-password-request';
import { SimpleResponse } from '../../types/responses/simple-response';
import { request } from '../../utils/common';

export const sendChangePasswordRequest = (
	changePasswordRequest: ChangePasswordRequest
) => {
	return request<SimpleResponse>(`${baseUrl}${changePassword}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(changePasswordRequest),
	});
};
