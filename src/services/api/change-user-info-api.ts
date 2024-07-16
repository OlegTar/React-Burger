import { createApi } from "@reduxjs/toolkit/query/react";
import { UserResponse } from "../../types/responses/user-response";
import { sendChangeUserInfoRequest } from "../../utils/api/change-user-info";
import { ChangeUserInfoRequest } from "../../types/requests/change-user-info-request";

export const changeUserInfoApi = createApi({
	reducerPath: "changeUserInfo",
	baseQuery: async (req: ChangeUserInfoRequest) => {
		try {
			const data = await sendChangeUserInfoRequest(req);
			return {
				data,
			};
		} catch (error) {
			return { error };
		}
	},
	endpoints: (builder) => ({
		changeUserInfo: builder.mutation<UserResponse, ChangeUserInfoRequest>({
			query: (req) => req,
		}),
	}),
});

export const { useChangeUserInfoMutation } = changeUserInfoApi;
