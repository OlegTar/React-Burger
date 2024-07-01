import { FC } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { Outlet, useLocation } from 'react-router';
import { useStorage } from '../../hooks/useStorage';

export const Feed: FC = () => {
	const location = useLocation();
	const { readKey } = useStorage();

	let showOnlyOrder = false;
	if (readKey('modal') !== 'true' && /feed\/\d+$/.test(location.pathname)) {
		showOnlyOrder = true;
	}

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
