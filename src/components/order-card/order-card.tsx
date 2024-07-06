import { FC, useMemo } from 'react';
import styles from './order-card.module.scss';
import { IngredientCircle } from '../ingredient-circle/ingredient-circle';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../hooks/useStorage';
import {
	OrderInFeed,
	OrderStatus,
} from '../../types/application-types/order-in-feed';
import { useAppSelector } from '../../hooks/redux';

export type OrderCardPropTypes = {
	inProfile?: boolean;
	order: OrderInFeed;
};

export const OrderCard: FC<OrderCardPropTypes> = ({
	inProfile = false,
	order,
}) => {
	const navigate = useNavigate();
	const { setKey } = useStorage();
	const { ingredients } = useAppSelector((state) => state.ingredients);

	const mapOfImages = useMemo(
		() =>
			ingredients
				.map((ing) => ing.ingredient)
				.reduce((acc, cur) => {
					if (!acc.has(cur._id)) {
						acc.set(cur._id, cur.imageMobile);
					}
					return acc;
				}, new Map<string, string>()),
		[ingredients]
	);

	const map = useMemo(
		() =>
			new Map<OrderStatus, string>([
				['done', 'Готов'],
				['pending', 'Готовится'],
				['cancelled', 'Отменён'],
				['created', 'Создан'],
			]),
		[]
	);

	const getStatus = (status: OrderStatus) => map.get(status);
	const imgs = order.ingredients.map((ing) => mapOfImages.get(ing) || '');

	return (
		<div
			className={`p-6 mb-4 ${styles['debug']} ${styles['card']} ${
				inProfile ? styles['profile-width'] : ''
			}`}
			onClick={() => {
				setKey('modal', 'true');
				if (inProfile) {
					navigate(`/profile/orders/${order.number}`);
				} else {
					navigate(`/feed/${order.number}`);
				}
			}}
		>
			<div className={`${styles['number']} mb-6`}>
				<p className="text text_type_digits-default">#{order.number}</p>
				<p className="text text_type_main-default text_color_inactive">
					<FormattedDate date={new Date(order.createdAt)} />
				</p>
			</div>
			<p className="text text_type_main-medium">{order.name}</p>
			{inProfile && (
				<p className="text text_type_main-default text_color_success mt-2">
					{getStatus(order.status)}
				</p>
			)}
			<div className={`${styles['footer']} mt-6`}>
				<div className={`${styles['ingredients']}`}>
					{imgs.map((e, i) => (
						<IngredientCircle
							key={i}
							url={e}
							margin={i}
							zIndex={imgs.length - i}
							rest={i < 5 ? 0 : 3}
						/>
					))}
				</div>
				<div className={`${styles['price']}`}>
					<p className="text text_type_digits-default mr-2">480</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};
