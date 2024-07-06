import { FC } from 'react';
import styles from './order.module.scss';
import { IngredientCircle } from '../ingredient-circle/ingredient-circle';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router';
import {
	ordersFeedApi,
	useGetAllOrdersQuery,
} from '../../utils/api/orders-feed';
import { useAppSelector } from '../../hooks/redux';
import { getStatus } from '../../utils/common';
import { FillingType } from '../../types/application-types/filling-type';

export type OrderPropTypes = {
	isInModal?: boolean;
};

export const Order: FC<OrderPropTypes> = ({ isInModal = true }) => {
	const { number: numberS } = useParams();
	const { orders } = useAppSelector((state) => state.feed);
	const ingredients = useAppSelector((data) =>
		data.ingredients.ingredients.map((ing) => ing.ingredient)
	);
	const mapIdToNamePrice = ingredients.reduce((map, ingredient) => {
		if (!map.has(ingredient._id)) {
			map.set(ingredient._id, {
				name: ingredient.name,
				price: ingredient.price,
				type: ingredient.type,
				image: ingredient.imageMobile,
			});
		}
		return map;
	}, new Map<string, { name: string; price: number; type: FillingType; image: string }>());
	if (!numberS) {
		return <></>;
	}
	const number = parseInt(numberS, 10);

	//data?.data.orders.find((o) => o.number === number),
	//console.log({ data });

	//ищём в стейте
	// const { order: order1 } = ordersFeedApi.useGetAllOrdersQuery(undefined, {
	// 	//skip: true,
	// 	selectFromResult: ({ data }) => ({
	// 		order: data?.orders.find((o) => o.number === number),
	// 	}),
	// });

	//console.log({ order1 });

	//const order = 1;
	//console.log({ order });
	const order = orders.find((order) => order.number === number);

	let additionalClass = '';
	if (!isInModal) {
		additionalClass += styles['center'];
	}

	if (!order) {
		return <></>;
	}

	const price = order.ingredients.reduce(
		(sum, _id) => sum + (mapIdToNamePrice.get(_id)?.price || 0),
		0
	);

	type map = {
		[key: string]: number;
	};

	const groups = order.ingredients.reduce((groups: map, _id) => {
		if (!groups[_id]) {
			groups[_id] = 0;
		}
		groups[_id]++;
		return groups;
	}, {});

	//	const ings = new Set(order.ingredients).values();

	const ings = order.ingredients
		.reduce(
			(acc: { set: Set<string>; result: string[] }, _id) => {
				if (!acc.set.has(_id)) {
					acc.set.add(_id);
					acc.result.push(_id);
				}
				return acc;
			},
			{ set: new Set<string>(), result: [] }
		)
		.result.sort((a_id, b_id) => {
			if (mapIdToNamePrice.get(a_id)?.type == 'bun') {
				return -1;
			}
			if (mapIdToNamePrice.get(b_id)?.type == 'bun') {
				return 1;
			}
			return 0;
		});

	return (
		<section className={`${styles['order']} ml-8`}>
			<header
				className={`mt-10 mb-10 text text_type_digits-default ${additionalClass}`}
			>
				#{order.number}
			</header>
			<header className="text text_type_main-medium mb-3">{order.name}</header>
			<p className="text text_type_main-default text_color_success mb-15">
				{getStatus(order.status)}
			</p>
			<header className="text text_type_main-medium mb-6">Состав:</header>
			<section className="mr-10">
				<ul className={`${styles['list']} pr-6 mt-10`}>
					{ings.map((_id, i) => (
						<li className={`${styles['item']} mt-4`} key={i}>
							<div className={`${styles['name']}`}>
								<IngredientCircle url={mapIdToNamePrice.get(_id)?.image!} />
								<p className="ml-4 text text_type_main-default">
									{mapIdToNamePrice.get(_id)?.name}
								</p>
							</div>
							<p
								className={`text text_type_digits-default ml-4 ${styles['price']}`}
							>
								{groups[_id]}&nbsp;x&nbsp;{mapIdToNamePrice.get(_id)?.price}
								&nbsp;
								<CurrencyIcon type="primary" />
							</p>
						</li>
					))}
				</ul>
				<div className={`${styles['footer']} mb-10`}>
					<p className="text text_type_main-default text_color_inactive">
						<FormattedDate date={new Date(order.createdAt)} />
					</p>
					<p className={`text text_type_digits-default ${styles['price']}`}>
						{price}&nbsp;
						<CurrencyIcon type="primary" />
					</p>
				</div>
			</section>
		</section>
	);
};
