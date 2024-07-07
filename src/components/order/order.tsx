import { FC, useEffect } from 'react';
import styles from './order.module.scss';
import { IngredientCircle } from '../ingredient-circle/ingredient-circle';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getStatus } from '../../utils/common';
import { FillingType } from '../../types/application-types/filling-type';
import { RequestStatus } from '../request-status/request-status';
import { getOrder } from '../../services/actions/order-details';

export type OrderPropTypes = {
	isInModal?: boolean;
};

export const Order: FC<OrderPropTypes> = ({ isInModal = true }) => {
	const { number: numberS } = useParams();
	const { orders } = useAppSelector((state) => state.feed);
	const { ingredients } = useAppSelector((data) => data.ingredients);
	const {
		success,
		order: order_,
		loading,
	} = useAppSelector((state) => state['order-details']);

	const fixSizeOfList = () => {
		const lists = document.getElementsByClassName(`${styles['list']}`);
		const footers = document.getElementsByClassName(`${styles['footer']}`);
		if (lists.length > 0 && footers.length > 0) {
			const list = lists[0] as HTMLElement;
			const footer = footers[0] as HTMLElement;
			const listRect = list.getBoundingClientRect();
			const footerRect = footer.getBoundingClientRect();
			if (footerRect.top + footerRect.height > document.body.clientHeight) {
				const delta =
					footerRect.top + footerRect.height - document.body.clientHeight;
				list.style.height = listRect.height - delta + 'px';
			}
		}
	};

	useEffect(() => {
		window.addEventListener('load', fixSizeOfList);
		window.addEventListener('resize', fixSizeOfList);
		return () => {
			window.removeEventListener('load', fixSizeOfList);
			window.removeEventListener('resize', fixSizeOfList);
		};
	}, []);

	const error = success !== null && !success;

	const dispatch = useAppDispatch();
	if (!numberS) {
		return <></>;
	}
	const number = parseInt(numberS, 10);

	const mapIdToNamePrice = ingredients
		.map(({ ingredient }) => ingredient)
		.reduce((map, ingredient) => {
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

	//ищём сначала в state'е вебсокета
	let order = orders.find((order) => order.number === number);

	let additionalClass = '';
	if (!isInModal) {
		additionalClass += styles['center'];
	}

	if (!order) {
		if (order_) {
			order = order_.orders[0];
		} else if (!loading) {
			dispatch(getOrder(number));
		}
	}

	type map = {
		[key: string]: number;
	};

	let price = 0;
	let groups: map = {};
	let ings: string[] = [];

	if (order) {
		price = order.ingredients.reduce(
			(sum, _id) => sum + (mapIdToNamePrice.get(_id)?.price || 0),
			0
		);

		groups = order.ingredients.reduce((groups: map, _id) => {
			if (!groups[_id]) {
				groups[_id] = 0;
			}
			groups[_id]++;
			return groups;
		}, {});

		//	const ings = new Set(order.ingredients).values();

		ings = order.ingredients
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
	}

	if (!loading) {
		setTimeout(fixSizeOfList, 0);
	}

	return (
		<>
			{(error || loading) && (
				<RequestStatus
					state={error ? 'error' : 'pending'}
					errorMessage="Не удалось получить данные"
				/>
			)}
			{order && (
				<section className={`${styles['order']} ml-8`}>
					<header
						className={`mt-10 mb-10 text text_type_digits-default ${additionalClass}`}
					>
						#{order.number}
					</header>
					<header className="text text_type_main-medium mb-3">
						{order.name}
					</header>
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
						<div className={`${styles['footer']} ${isInModal ? 'mb-10' : ''}`}>
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
			)}
		</>
	);
};
