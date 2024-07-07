import { createApi } from '@reduxjs/toolkit/query/react';
import { OrdersFeedState } from '../../types/application-types/orders-feed-state';
import { setOrders } from '../../services/reducers/feed';

export const ordersFeedApi = createApi({
	reducerPath: 'ordersFeed',
	baseQuery: () => {
		return { data: {} };
	},
	endpoints: (builder) => ({
		getAllOrders: builder.query<OrdersFeedState, void>({
			query: () => '',
			keepUnusedDataFor: 1, //для ревьювера: время в секундах, сколько держать соединение, после размонтирования компонента, для проверки можно поставить 1
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
			) {
				// create a websocket connection when the cache subscription starts
				const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
				try {
					// wait for the initial query to resolve before proceeding
					await cacheDataLoaded;

					// when data is received from the socket connection to the server,
					// if it is a message and for the appropriate channel,
					// update our query result with the received message
					const listener = (event: MessageEvent) => {
						const data = JSON.parse(event.data) as OrdersFeedState;
						dispatch(setOrders(data));
						// updateCachedData((draft) => {
						// 	draft.orders = data.orders;
						// 	draft.total = data.total;
						// 	draft.totalToday = data.totalToday;
						// 	draft.state = 'loaded';
						// });
					};

					ws.addEventListener('message', listener);
				} catch {
					// no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
					// in which case `cacheDataLoaded` will throw
				}
				// cacheEntryRemoved will resolve when the cache subscription is no longer active
				await cacheEntryRemoved;
				console.log('connection closed');
				// perform cleanup steps once the `cacheEntryRemoved` promise resolves
				ws.close(); //для ревьювера: посмотрите комент про keepUnusedDataFor
			},
		}),
	}),
});

export const { useGetAllOrdersQuery } = ordersFeedApi;
