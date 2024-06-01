import { createAsyncThunk } from '@reduxjs/toolkit';
import { PasswordResetRequest } from '../../types/requests/password-reset-request';
import { sendPasswordResetRequest } from '../api/password-reset';
import { AppDispatch } from '../store';
import { setError, setPending, setSuccess } from '../reducers/user';
import { resetPasswordCalled } from '../../config';

export const passwordReset = createAsyncThunk<
	void,
	PasswordResetRequest,
	{ dispatch: AppDispatch }
>(
	'user/passwordReset',
	async (passwordResetRequest: PasswordResetRequest, { dispatch }) => {
		try {
			dispatch(setPending());
			await sendPasswordResetRequest(passwordResetRequest);
			dispatch(setSuccess());
			localStorage.setItem(resetPasswordCalled, '1');
		} catch (e) {
			dispatch(setError('Не удалось поменять пароль'));
		}
	}
);
