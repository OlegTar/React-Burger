import { FC, useEffect } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { Outlet } from 'react-router';
import { useOrderModal } from '../../hooks/useOrderModal';
import { useDispatch } from 'react-redux';
import {
	socketStart,
	socketClose,
} from '../../services/actions/socket-actions';
import { ordersAll } from '../../config';

export const Feed: FC = () => {
	const showOnlyOrder = useOrderModal();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!showOnlyOrder) {
			console.log('start!');
			dispatch(socketStart(ordersAll));
			return () => {
				if (!showOnlyOrder) {
					console.log('close!');
					dispatch(socketClose());
				}
			};
		}
	});

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
