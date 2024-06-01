import { baseUrl, passwordReset } from '../../config';
import { PasswordResetRequest } from '../../types/requests/password-reset-request';
import { request } from '../../utils/common';

export const sendPasswordResetRequest = (
	passwordResetRequest: PasswordResetRequest
) => {
	return request(`${baseUrl}${passwordReset}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: passwordResetRequest,
	});
};
