import { FC } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';

export const Feed: FC = () => {
	return (
		<>
			<OrdersFeed />
			<OrdersSummary />
		</>
	);
};
