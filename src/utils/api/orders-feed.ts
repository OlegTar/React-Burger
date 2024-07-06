import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrdersFeedState } from '../../types/application-types/orders-feed-state';

const initialState: OrdersFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
};

export const ordersFeedApi = createApi({
	reducerPath: 'ordersFeed',
	baseQuery: () => {
		return {
			data: initialState,
		};
	},
	endpoints: (builder) => ({
		getAllOrders: builder.query<OrdersFeedState, void>({
			query: () => '',
			async onCacheEntryAdded(
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				// create a websocket connection when the cache subscription starts
				const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
				try {
					// wait for the initial query to resolve before proceeding
					await cacheDataLoaded;

					console.log('111111111111');

					// when data is received from the socket connection to the server,
					// if it is a message and for the appropriate channel,
					// update our query result with the received message
					const listener = (event: MessageEvent) => {
						const data = JSON.parse(event.data) as OrdersFeedState;
						updateCachedData((draft) => {
							draft.orders = data.orders;
							draft.total = data.total;
							draft.totalToday = data.totalToday;
						});
					};

					ws.onmessage = listener;
				} catch {
					// no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
					// in which case `cacheDataLoaded` will throw
				}
				// cacheEntryRemoved will resolve when the cache subscription is no longer active
				await cacheEntryRemoved;
				console.log('22222222222');
				// perform cleanup steps once the `cacheEntryRemoved` promise resolves
				ws.close();
			},
		}),
	}),
});

export const { useGetAllOrdersQuery } = ordersFeedApi;
