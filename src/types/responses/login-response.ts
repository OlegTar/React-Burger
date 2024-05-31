import { User } from '../application-types/user';

export type LoginResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: User;
};
