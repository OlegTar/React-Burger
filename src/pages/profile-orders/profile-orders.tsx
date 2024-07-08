import { FC, useContext, useEffect } from 'react';
import styles from './profile-orders.module.scss';
import { OrderCard } from '../../components/order-card/order-card';
import { accessToken, ordersPrivate } from '../../config';
import { useDispatch } from 'react-redux';
import {
	socketPrivateDisconnect,
	socketPrivateStart,
} from '../../services/actions/socket-actions';
import { useAppSelector } from '../../hooks/redux';
import { RequestStatus } from '../../components/request-status/request-status';
import { ProfileContext } from '../profile/profile';
import { sortByDateReversed } from '../../utils/common';

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
		// eslint-disable-next-line
	}, []);
	const profileContext = useContext(ProfileContext);

	const { orders, state } = useAppSelector((state) => state.privateFeed);

	if (orders.length > 0) {
		setTimeout(profileContext.fixPosition, 0);
	}

	let ordersSorted = [...orders];
	ordersSorted.sort(sortByDateReversed);

	return (
		<>
			{state === 'init' && <RequestStatus state="pending" />}
			<ul className={`${styles['orders-list']}`}>
				{ordersSorted.map((order) => (
					<li key={order._id} className="mr-2">
						<OrderCard inProfile={true} order={order} />
					</li>
				))}
			</ul>
		</>
	);
};
