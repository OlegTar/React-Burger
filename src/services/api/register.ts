import { baseUrl, register } from '../../config';
import { RegisterResponse } from '../../types/register-response';

import { RegisterRequest } from '../../types/register-request';
import { request } from '../../utils/common';

export const sendRegisterRequest = (registerRequest: RegisterRequest) => {
	return request<RegisterResponse>(`${baseUrl}${register}`, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json' }),
		body: JSON.stringify(registerRequest),
	});
};
