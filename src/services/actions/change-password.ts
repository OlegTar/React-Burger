import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendChangePasswordRequest } from '../api/change-password';

export const changePassword = createAsyncThunk(
	'user/changePassword',
	sendChangePasswordRequest
);
