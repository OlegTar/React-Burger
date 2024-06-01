import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/application-types/user';
import { login } from '../actions/login';
import { logout } from '../actions/logout';
import { RequestState } from '../../types/application-types/request-state';

export type UserState = {
	user: User | null;
	state: RequestState;
	errorMessage: string;
	authChecked: boolean;
};

const initialState: UserState = {
	user: null,
	state: 'init',
	errorMessage: '',
	authChecked: false,
};

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.authChecked = action.payload;
		},
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		reset: (state) => {
			state.state = 'init';
		},
		setPending: (state) => {
			state.state = 'pending';
		},
		setError: (state, action: PayloadAction<string>) => {
			state.state = 'error';
			state.errorMessage = action.payload;
		},
		setSuccess: (state) => {
			state.state = 'success';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state, action) => {
				state.user = null;
				state.state = 'pending';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.state = 'success';
			})
			.addCase(login.rejected, (state) => {
				state.user = null;
				state.state = 'error';
			})
			.addCase(logout.pending, (state) => {
				state.state = 'pending';
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.state = 'init';
			})
			.addCase(logout.rejected, (state, action) => {
				state.state = 'error';
				state.errorMessage = action.error.message || '';
			});
	},
});

export const {
	setUser,
	setAuthChecked,
	reset,
	setError,
	setSuccess,
	setPending,
} = user.actions;
