import { FC } from 'react';
import styles from './profile-orders.module.scss';
import { OrderCard } from '../../components/order-card/order-card';

export const ProfileOrders: FC = () => {
	return (
		<ul className={`${styles['orders-list']}`}>
			{Array.from(Array(10)).map((e, i) => (
				<li key={i} className="mr-2">
					<OrderCard inProfile={true} />
				</li>
			))}
		</ul>
	);
};
