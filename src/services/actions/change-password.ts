import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setPending, setSuccess } from '../reducers/user';
import { AppDispatch } from '../store';
import { ChangePasswordRequest } from '../../types/requests/change-password-request';
import { sendChangePasswordRequest } from '../api/change-password';

export const changePassword = createAsyncThunk<
	void,
	ChangePasswordRequest,
	{ dispatch: AppDispatch }
>('user/changePassword', async (request, { dispatch }) => {
	try {
		dispatch(setPending());
		await sendChangePasswordRequest(request);
		dispatch(setSuccess());
	} catch (e) {
		dispatch(setError('Не удалось поменять пароль'));
	}
});
