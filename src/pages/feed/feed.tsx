import { FC } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { Outlet } from 'react-router';
import { useOrderModal } from '../../hooks/useOrderModal';
import { useGetAllOrdersQuery } from '../../utils/api/orders-feed';
import { RequestStatus } from '../../components/request-status/request-status';

export const Feed: FC = () => {
	const showOnlyOrder = useOrderModal();
	const { isLoading } = useGetAllOrdersQuery();

	return (
		<>
			{!showOnlyOrder && (
				<>
					{isLoading && <RequestStatus state="pending" />}
					<OrdersFeed />
					<OrdersSummary />
				</>
			)}
			<Outlet />
		</>
	);
};
