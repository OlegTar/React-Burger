import { baseUrl, passwordReset } from '../../config';
import { PasswordResetRequest } from '../../types/requests/password-reset-request';
import { SimpleResponse } from '../../types/responses/simple-response';
import { request } from '../../utils/common';

export const sendPasswordResetRequest = (
	passwordResetRequest: PasswordResetRequest
) => {
	return request<SimpleResponse>(`${baseUrl}${passwordReset}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(passwordResetRequest),
	});
};
