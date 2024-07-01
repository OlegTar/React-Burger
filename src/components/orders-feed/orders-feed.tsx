import { OrderCard } from '../order-card/order-card';
import styles from './orders-feed.module.scss';
import { FC } from 'react';

export const OrdersFeed: FC = () => {
	return (
		<section className={`mt-10 ${styles['orders-feed']}`}>
			<header className={`mb-5 text text_type_main-large`}>
				Лента заказов
			</header>
			<section className={`${styles['cards']} pr-2`}>
				{Array.from(Array(10)).map((e, i) => (
					<OrderCard key={i} />
				))}
			</section>
		</section>
	);
};
