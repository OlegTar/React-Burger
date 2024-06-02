import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendPasswordResetRequest } from '../api/password-reset';

export const passwordReset = createAsyncThunk(
	'user/passwordReset',
	sendPasswordResetRequest
);
