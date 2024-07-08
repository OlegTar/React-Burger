import { useAppSelector } from '../../hooks/redux';
import { OrderCard } from '../order-card/order-card';
import { RequestStatus } from '../request-status/request-status';
import styles from './orders-feed.module.scss';
import { FC } from 'react';

export const OrdersFeed: FC = () => {
	const { orders, state } = useAppSelector((state) => state.feeds);

	return (
		<>
			{(state == 'init' || state == 'error') && (
				<RequestStatus
					state={`${state == 'init' ? 'pending' : 'error'}`}
					errorMessage="Не удалось установить соединение"
				/>
			)}
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
		</>
	);
};
