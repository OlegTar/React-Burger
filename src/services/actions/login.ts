import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendLoginRequest } from '../api/login';
import { LoginRequest } from '../../types/login-request';
import { accessToken, refreshToken } from '../../config';

export const login = createAsyncThunk(
	'user/login',
	async (loginRequest: LoginRequest) => {
		const res = await sendLoginRequest(loginRequest);
		localStorage.setItem(accessToken, res.accessToken);
		localStorage.setItem(refreshToken, res.refreshToken);
		return res.user;
	}
);
