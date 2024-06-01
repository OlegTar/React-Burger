import { baseUrl, changePassword, resetPasswordCalled } from '../../config';
import { ChangePasswordRequest } from '../../types/requests/change-password-request';
import { request } from '../../utils/common';

export const sendChangePasswordRequest = (
	changePasswordRequest: ChangePasswordRequest
) => {
	const result = request(`${baseUrl}${changePassword}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: changePasswordRequest,
	});
	localStorage.removeItem(resetPasswordCalled);
	return result;
};
