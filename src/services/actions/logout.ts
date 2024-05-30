import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendLogoutRequest } from '../api/logout';
import { accessToken, refreshToken } from '../../config';

export const logout = createAsyncThunk<void, void>('user/logout', async () => {
	const res = await sendLogoutRequest(
		localStorage.getItem(refreshToken) as string
	);
	if (!res.success) {
		throw new Error('Выйти не удалось');
	}
	localStorage.removeItem(accessToken);
	localStorage.removeItem(refreshToken);
});
