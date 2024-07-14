import { baseUrl, changePassword, resetPasswordCalled } from '../../config';
import { ChangePasswordRequest } from '../../types/requests/change-password-request';
import { ApplicationResponse } from '../../types/responses/response-type';
import { request } from '../common';

export const sendChangePasswordRequest = (
	changePasswordRequest: ChangePasswordRequest
): Promise<ApplicationResponse> => {
	const result = request(`${baseUrl}${changePassword}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: changePasswordRequest,
	});
	localStorage.removeItem(resetPasswordCalled);
	return result;
};
