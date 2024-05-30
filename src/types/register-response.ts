import { User } from './user';

export type RegisterResponse = {
	success: boolean;
	user: User;
	accessToken: string;
	refreshToken: string;
};
