import { FC, useEffect } from 'react';
import { Order } from '../../components/order/order';
import { useStorage } from '../../hooks/useStorage';
import { Modal } from '../../components/modal/modal';
import { useNavigate } from 'react-router';

export const OrderPage: FC = () => {
	const navigate = useNavigate();
	const { readKey, removeKey } = useStorage();

	let modal = readKey('modal');
	useEffect(() => {
		modal = readKey('modal');
		return () => {
			removeKey('modal');
		};
	});
	if (modal === 'true') {
		return (
			<Modal title="" closeModal={() => navigate(-1)}>
				<Order isInModal={true} />
			</Modal>
		);
	} else {
		return <Order isInModal={false} />;
	}
};
