import { FC } from 'react';
import { Order } from '../../components/order/order';
import { Modal } from '../../components/modal/modal';
import { useLocation, useNavigate } from 'react-router';

export const OrderPage: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location.state);
	const background = location.state && location.state.background;
	const isInModal = !!background;

	if (isInModal) {
		return (
			<Modal title="" closeModal={() => navigate(-1)}>
				<Order isInModal={true} />
			</Modal>
		);
	} else {
		return <Order isInModal={false} />;
	}
	//return <Order isInModal={false} />;;
};
