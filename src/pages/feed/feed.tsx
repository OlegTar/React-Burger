import { FC, useEffect } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { Outlet } from 'react-router';
import { useOrderModal } from '../../hooks/useOrderModal';
import { useDispatch } from 'react-redux';
import {
	socketStart,
	socketDisconnect,
} from '../../services/actions/socket-actions';
import { ordersAll } from '../../config';

export const Feed: FC = () => {
	const showOnlyOrder = useOrderModal();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!showOnlyOrder) {
			dispatch(socketStart(ordersAll));
			return () => {
				if (!showOnlyOrder) {
					dispatch(socketDisconnect());
				}
			};
		}
	}, []);

	return (
		<>
			{!showOnlyOrder && (
				<>
					<OrdersFeed />
					<OrdersSummary />
				</>
			)}
			<Outlet />
		</>
	);
};
