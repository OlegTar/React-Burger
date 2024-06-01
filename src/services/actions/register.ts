import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { setAuthChecked } from '../reducers/user';
import { sendRegisterRequest } from '../api/register';
import { RegisterRequest } from '../../types/requests/register-request';
import { User } from '../../types/application-types/user';

export const register = createAsyncThunk<
	User,
	RegisterRequest,
	{ dispatch: AppDispatch }
>('user/register', async (registerRequest, { dispatch }) => {
	try {
		const res = await sendRegisterRequest(registerRequest);
		return res.user;
	} finally {
		dispatch(dispatch(setAuthChecked(true)));
	}
});
