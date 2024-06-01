import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendLogoutRequest } from '../api/logout';
import { accessToken, refreshToken } from '../../config';

export const logout = createAsyncThunk<void, void>('user/logout', async () => {
	await sendLogoutRequest(localStorage.getItem(refreshToken) as string);
	localStorage.removeItem(accessToken);
	localStorage.removeItem(refreshToken);
});
