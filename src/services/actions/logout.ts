import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendLogoutRequest } from '../api/logout';

export const logout = createAsyncThunk('user/logout', sendLogoutRequest);
