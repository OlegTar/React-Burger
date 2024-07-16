import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import {
	socketDisconnect,
	socketClosed,
	socketError,
	socketMessage,
	socketOpen,
	socketPrivateDisconnect,
	socketPrivateClosed,
	socketPrivateError,
	socketPrivateMessage,
	socketPrivateOpen,
	socketPrivateSend,
	socketPrivateStart,
	socketSend,
	socketStart,
} from "./actions/socket-actions";
import { changeUserInfoApi } from "./api/change-user-info-api";

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			socketMiddleware({
				start: socketStart,
				open: socketOpen,
				disconnect: socketDisconnect,
				closed: socketClosed,
				error: socketError,
				send: socketSend,
				message: socketMessage,
			}),
			socketMiddleware(
				{
					start: socketPrivateStart,
					open: socketPrivateOpen,
					disconnect: socketPrivateDisconnect,
					closed: socketPrivateClosed,
					error: socketPrivateError,
					send: socketPrivateSend,
					message: socketPrivateMessage,
				},
				true,
			),
			changeUserInfoApi.middleware,
		),
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
