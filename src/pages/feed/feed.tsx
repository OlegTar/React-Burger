import { FC, useEffect } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { useDispatch } from 'react-redux';
import {
	socketStart,
	socketDisconnect,
} from '../../services/actions/socket-actions';
import { ordersAll } from '../../config';

export const Feed: FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(socketStart(ordersAll));
		return () => {
			dispatch(socketDisconnect());
		};
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<OrdersFeed />
			<OrdersSummary />
		</>
	);
};
