import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../store';
import {
	PayloadType,
	socketClose,
	socketClosed,
	socketError,
	socketMessage,
	socketOpen,
	socketSend,
	socketStart,
} from '../actions/socket-actions';
import { OrdersFeedState } from '../../types/application-types/orders-feed-state';
import { send } from 'process';

type ActionType = { type: string; payload: PayloadType };

export const socketMiddleware = (
	wsUrl: string,
	{
		start,
		close,
		closed,
		open,
		error,
		message,
		send,
	}: {
		start: ActionType;
		close: ActionType;
		closed: ActionType;
		error: ActionType;
		open: ActionType;
		send: string;
		message: (orders: OrdersFeedState) => ActionType;
	}
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		return (next) => (action: { type: string; payload: PayloadType }) => {
			const { dispatch } = store;
			const { type, payload } = action;

			if (type === start.type) {
				const url = wsUrl + (payload ? `?token=${payload}` : '');
				// объект класса WebSocket
				if (socket == null || socket.readyState === WebSocket.CLOSED) {
					socket = new WebSocket(url);
				}
			}
			if (socket) {
				// функция, которая вызывается при открытии сокета
				socket.onopen = (event) => {
					dispatch(open);
				};

				// функция, которая вызывается при ошибке соединения
				socket.onerror = (event: Event) => {
					console.log(event);
					dispatch(error);
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = (event: MessageEvent) => {
					const data = JSON.parse(event.data) as OrdersFeedState;
					dispatch(message(data));
				};

				socket.onclose = (event: Event) => {
					dispatch(closed);
				};

				// функция, которая вызывается при закрытии соединения
				socket.onclose = (event) => {
					dispatch(closed);
				};

				if (type === send) {
					socket.send(JSON.stringify(payload));
				} else if (type == close.type) {
					socket.close();
				}
			}

			next(action);
		};
	}) as Middleware;
};
