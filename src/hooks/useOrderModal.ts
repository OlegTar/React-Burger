import { useLocation } from 'react-router';
import { useStorage } from './useStorage';

export const useOrderModal = () => {
	const location = useLocation();
	const { readKey } = useStorage();

	let showOnlyOrder = false;
	if (
		readKey('modal') !== 'true' &&
		/(feed|profile\/orders)\/\d+$/.test(location.pathname)
	) {
		showOnlyOrder = true;
	}

	return showOnlyOrder;
};
