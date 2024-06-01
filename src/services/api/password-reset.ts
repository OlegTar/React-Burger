import { baseUrl, passwordReset, resetPasswordCalled } from '../../config';
import { PasswordResetRequest } from '../../types/requests/password-reset-request';
import { request } from '../../utils/common';

export const sendPasswordResetRequest = (
	passwordResetRequest: PasswordResetRequest
) => {
	const result = request(`${baseUrl}${passwordReset}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: passwordResetRequest,
	});
	localStorage.setItem(resetPasswordCalled, '1');
	return result;
};
