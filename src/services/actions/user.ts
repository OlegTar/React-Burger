import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendGetUserRequest } from '../api/user';
import { AppDispatch } from '../store';
import { setAuthChecked, setUser } from '../reducers/user';
import { accessToken, refreshToken } from '../../config';

export const getUser = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
	'user/getUser',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			try {
				const res = await sendGetUserRequest();
				dispatch(setUser(res.user));
				dispatch(setAuthChecked(true));
			} catch (e) {
				localStorage.removeItem(accessToken);
				localStorage.removeItem(refreshToken);
			} finally {
				dispatch(setAuthChecked(true));
			}
		} else {
			dispatch(setAuthChecked(true));
		}
	}
);
