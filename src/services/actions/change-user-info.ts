import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setPending, setSuccess, setUser } from '../reducers/user';
import { AppDispatch } from '../store';
import { ChangeUserInfoRequest } from '../../types/requests/change-user-info-request';
import { sendChangeUserInfoRequest } from '../api/change-user-info';

export const changeUserInfo = createAsyncThunk<
	void,
	ChangeUserInfoRequest,
	{ dispatch: AppDispatch }
>('user/changeUserInfo', async (request, { dispatch }) => {
	dispatch(setPending());
	try {
		const res = await sendChangeUserInfoRequest(request);
		if (!res.success) {
			dispatch(setError('Не удалось поменять данные пользователя'));
		} else {
			dispatch(setSuccess());
			dispatch(setUser(res.user));
		}
	} catch (e) {
		dispatch(setError('Не удалось поменять данные пользователя'));
	}
});
