import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendLoginRequest } from '../api/login';
import { LoginRequest } from '../../types/requests/login-request';
import { accessToken, refreshToken } from '../../config';

export const login = createAsyncThunk(
	'user/login',
	async (loginRequest: LoginRequest) => {
		const res = await sendLoginRequest(loginRequest);
		if (!res.success) {
			throw new Error('Войти не удалось');
		}
		localStorage.setItem(accessToken, res.accessToken);
		localStorage.setItem(refreshToken, res.refreshToken);
		return res.user;
	}
);
