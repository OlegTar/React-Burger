import { FC } from 'react';
import styles from './profile-orders.module.scss';
import { OrderCard } from '../../components/order-card/order-card';
import { OrderInFeed } from '../../types/application-types/order-in-feed';

export const ProfileOrders: FC = () => {
	const order: OrderInFeed = {
		_id: 'asdfa',
		createdAt: new Date().toDateString(),
		updatedAt: new Date().toDateString(),
		number: 13433,
		ingredients: [],
		status: 'done',
		name: 'asdf',
	};

	return (
		<ul className={`${styles['orders-list']}`}>
			{Array.from(Array(10)).map((e, i) => (
				<li key={i} className="mr-2">
					<OrderCard inProfile={true} order={order} />
				</li>
			))}
		</ul>
	);
};
