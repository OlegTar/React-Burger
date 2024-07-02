import { FC } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { Outlet } from 'react-router';
import { useOrderModal } from '../../hooks/useOrderModal';

export const Feed: FC = () => {
	const showOnlyOrder = useOrderModal();

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
