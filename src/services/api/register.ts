import { baseUrl, register } from '../../config';
import { RegisterResponse } from '../../types/responses/register-response';

import { RegisterRequest } from '../../types/requests/register-request';
import { request } from '../../utils/common';

export const sendRegisterRequest = (registerRequest: RegisterRequest) => {
	return request<RegisterResponse>(`${baseUrl}${register}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: registerRequest,
	});
};
