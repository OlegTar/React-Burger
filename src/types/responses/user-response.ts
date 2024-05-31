import { User } from '../application-types/user';

export type UserResponse = {
	success: boolean;
	user: User;
};
