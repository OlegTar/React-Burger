import { User } from './user';

export type LoginResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: User;
};
