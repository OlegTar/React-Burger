import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import {
	setAuthChecked,
	setError,
	setPending,
	setSuccess,
	setUser,
} from '../reducers/user';
import { sendRegisterRequest } from '../api/register';
import { RegisterRequest } from '../../types/requests/register-request';
import { accessToken, refreshToken } from '../../config';

export const register = createAsyncThunk<
	void,
	RegisterRequest,
	{ dispatch: AppDispatch }
>('user/register', async (registerRequest, { dispatch }) => {
	try {
		dispatch(setPending());
		const res = await sendRegisterRequest(registerRequest);
		localStorage.setItem(accessToken, res.accessToken);
		localStorage.setItem(refreshToken, res.refreshToken);
		dispatch(setSuccess());
		dispatch(setUser(res.user));
	} catch (e) {
		localStorage.removeItem(accessToken);
		localStorage.removeItem(refreshToken);
		dispatch(setError('Не удалось зарегистрироваться'));
	} finally {
		dispatch(dispatch(setAuthChecked(true)));
	}
});
