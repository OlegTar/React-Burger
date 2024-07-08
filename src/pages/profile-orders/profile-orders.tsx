import { FC, useEffect } from 'react';
import styles from './profile-orders.module.scss';
import { OrderCard } from '../../components/order-card/order-card';
import { OrderInFeed } from '../../types/application-types/order-in-feed';
import { useGetOrdersQuery } from '../../utils/api/orders-feed';
import { accessToken, ordersPrivate } from '../../config';
import { useDispatch } from 'react-redux';
import {
	socketPrivateDisconnect,
	socketPrivateStart,
} from '../../services/actions/socket-actions';
import { useAppSelector } from '../../hooks/redux';
import { RequestStatus } from '../../components/request-status/request-status';

export const ProfileOrders: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			socketPrivateStart(
				`${ordersPrivate}?token=${localStorage
					.getItem(accessToken)
					?.replace('Bearer ', '')}`
			)
		);

		return () => {
			dispatch(socketPrivateDisconnect());
		};
	}, []);

	const { orders, state } = useAppSelector((state) => state.privateFeed);

	return (
		<>
			{state == 'init' && <RequestStatus state="pending" />}
			<ul className={`${styles['orders-list']}`}>
				{orders.map((order, i) => (
					<li key={i} className="mr-2">
						<OrderCard inProfile={true} order={order} />
					</li>
				))}
			</ul>
		</>
	);
};
