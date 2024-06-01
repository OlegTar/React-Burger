import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendGetUserRequest } from '../api/user';
import { AppDispatch } from '../store';
import { setAuthChecked } from '../reducers/user';
import { User } from '../../types/application-types/user';

export const getUser = createAsyncThunk<
	User | null,
	void,
	{ dispatch: AppDispatch }
>('user/getUser', async (_, { dispatch }) => {
	if (localStorage.getItem('accessToken')) {
		try {
			const res = await sendGetUserRequest();
			return res.user;
		} finally {
			dispatch(setAuthChecked(true));
		}
	} else {
		dispatch(setAuthChecked(true));
		return null;
	}
});
