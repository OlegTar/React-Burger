import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../reducers/user';
import { AppDispatch } from '../store';
import { ChangeUserInfoRequest } from '../../types/change-user-info-request';
import { changeUserInfoRequest } from '../api/change-user-info';

export const changeUserInfo = createAsyncThunk<
	void,
	ChangeUserInfoRequest,
	{ dispatch: AppDispatch }
>('user/changeUserInfo', async (request, { dispatch }) => {
	const res = await changeUserInfoRequest(request);
	if (!res.success) {
		throw new Error('Не удалось поменять данные пользователя');
	}
	dispatch(setUser(res.user));
});
