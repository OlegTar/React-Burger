import { useGetAllOrdersQuery } from '../../utils/api/orders-feed';
import { OrderCard } from '../order-card/order-card';
import styles from './orders-feed.module.scss';
import { FC } from 'react';

export const OrdersFeed: FC = () => {
	const { data } = useGetAllOrdersQuery();

	if (!data) {
		return <></>;
	}
	const { orders } = data;

	return (
		<section className={`mt-10 ${styles['orders-feed']}`}>
			<header className={`mb-5 text text_type_main-large`}>
				Лента заказов
			</header>
			<section className={`${styles['cards']} pr-2`}>
				{orders.map((order, i) => (
					<OrderCard key={i} order={order} />
				))}
			</section>
		</section>
	);
};
