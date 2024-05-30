import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { setAuthChecked } from '../reducers/user';
import { sendRegisterRequest } from '../api/register';
import { RegisterRequest } from '../../types/register-request';
import { User } from '../../types/user';
import { accessToken, refreshToken } from '../../config';

export const register = createAsyncThunk<
	User | null,
	RegisterRequest,
	{ dispatch: AppDispatch }
>('user/register', async (registerRequest, { dispatch }) => {
	try {
		const res = await sendRegisterRequest(registerRequest);
		localStorage.setItem(accessToken, res.accessToken);
		localStorage.setItem(refreshToken, res.refreshToken);
		return res.user;
	} catch (e) {
		localStorage.removeItem(accessToken);
		localStorage.removeItem(refreshToken);
		throw new Error('Не удалось зарегистрироваться');
	} finally {
		dispatch(setAuthChecked(true));
	}
});
