import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../store';
import { PayloadType } from '../actions/socket-actions';
import { OrdersFeedState } from '../../types/application-types/orders-feed-state';
import { refreshAccessToken } from '../../utils/common';
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
	{
		start,
		disconnect,
		closed,
		open,
		error,
		message,
		send,
	}: {
		start: ActionCreatorWithPayload<string>;
		disconnect: ActionCreatorWithoutPayload;
		closed: ActionCreatorWithoutPayload;
		error: ActionCreatorWithPayload<string>;
		open: ActionCreatorWithoutPayload;
		send: ActionCreatorWithPayload<PayloadType>;
		message: ActionCreatorWithPayload<OrdersFeedState>;
	},
	withTokenRefresh: boolean = false
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		let url = '';
		let isConnected = false;
		let reconnectTimer = 0;

		return (next) => (action) => {
			const { dispatch } = store;
			console.log({ action });

			if (start.match(action)) {
				if (socket == null) {
					url = action.payload as string;
					socket = new WebSocket(url);
					isConnected = true;
				}
			}
			if (socket) {
				// функция, которая вызывается при открытии сокета
				socket.onopen = (event) => {
					//console.log(`n = ${n}`);
					console.log({ url });
					dispatch(open());
				};

				// функция, которая вызывается при ошибке соединения
				socket.onerror = (event: Event) => {
					console.log(event);
					//dispatch(error('Произошла ошибка'));
					//dispatch(close());
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = (event: MessageEvent) => {
					console.log('message1');
					try {
						const data = JSON.parse(event.data) as OrdersFeedState;
						console.log(data);
						//dispatch(message(data));

						//let data: OrdersFeedState; // & { message?: string };
						//throw new Error('asdfasdf');
						// 	// if (
						// 	// 	withTokenRefresh &&
						// 	// 	data.message === 'Invalid or missing token'
						// 	// ) {
						// 	// 	try {
						// 	// 		const newAccessToken = await refreshAccessToken();
						// 	// 		const wssUrl = new URL(url);
						// 	// 		wssUrl.searchParams.set(
						// 	// 			'token',
						// 	// 			newAccessToken.replace('Bearer ', '')
						// 	// 		);
						// 	// 		dispatch(close());
						// 	// 		dispatch(start(wssUrl.toString()));
						// 	// 	} catch (e) {
						// 	// 		throw new Error('Не удалось обновить токен');
						// 	// 	}
						// 	// } else {
						// 	//}
					} catch (err) {
						// 	// const e = err as Error;
						// 	// dispatch(error(e.message));
						// 	//isConnected = false;
						// 	//dispatch(close());
					}
				};

				socket.onclose = () => {
					// if (isConnected) {
					// 	console.log('reconnect');
					// 	if (reconnectTimer) {
					// 		clearTimeout(reconnectTimer);
					// 	}
					// 	reconnectTimer = window.setTimeout(() => {
					// 		dispatch(start(url));
					// 	}, RECONNECT_PERIOD);
					// }
					//dispatch(closed());
				};

				if (send.match(action)) {
					//socket.send(JSON.stringify(action.payload));
				} else if (disconnect.match(action)) {
					console.log('close!!');
					isConnected = false;
					clearTimeout(reconnectTimer);
					reconnectTimer = 0;
					socket.close();
					socket = null;
				}
			}

			next(action);
		};
	}) as Middleware;
};
