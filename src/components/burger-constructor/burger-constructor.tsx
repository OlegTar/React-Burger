import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { IIngredient } from '../../types/ingredient';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/reducers/constructor-ingredients';
import { decreaseItem } from '../../services/reducers/ingredients';
import { DragConstructorElement } from '../drag-constructor-element/drag-constructor-element';
import { useMemo } from 'react';
import { sendOrder } from '../../services/actions/order';
import { MyNotification } from '../my-notification/my-notification';
import { clearOrder } from '../../services/reducers/order';

export interface BurgerConstructorPropTypes {
	onDropHandler: (ingredient: IIngredient) => void;
}

export const BurgerConstructor = ({
	onDropHandler,
}: BurgerConstructorPropTypes) => {
	const dispatch = useDispatch<AppDispatch>();
	const { bun, ingredients } = useSelector(
		(state: RootState) => state['constructor-ingredients']
	);

	const { loading, success, order } = useSelector(
		(state: RootState) => state.order
	);

	const createOrder = () => {
		const ids: string[] = [
			bun!._id,
			...ingredients.map(({ ingredient }) => ingredient._id),
			bun!._id,
		];
		dispatch(sendOrder(ids));
	};

	const totalSum = useMemo(() => {
		return (
			(bun?.price || 0) * 2 +
			ingredients.reduce((acc, { ingredient }) => acc + ingredient.price, 0)
		);
	}, [bun, ingredients]);

	const handleClose = (ingredient: IIngredient, unqid: string) => {
		dispatch(removeIngredient(unqid));
		dispatch(decreaseItem(ingredient._id));
	};

	const [{ isHover }, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(itemId: IIngredient) {
			onDropHandler(itemId);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	const additionalClass = isHover ? styles.dashed : '';
	let fixPositionCallBack: () => void;
	const fixPositionPromise = new Promise<void>(function (resolve) {
		fixPositionCallBack = resolve;
	});

	return (
		<section className={`${styles.constr} pt-25 pl-4 ml-10`}>
			<section
				className={`${styles.burger} ${additionalClass}`}
				ref={dropTarget}
			>
				{bun && (
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.imageMobile}
						extraClass="ml-8"
					/>
				)}

				<ul
					id="burger-constructor-list"
					className={`${styles.list} scroll-pane custom-scroll`}
				>
					{ingredients.map(({ ingredient, uniqId }, index) => {
						return (
							<DragConstructorElement
								index={index}
								key={uniqId}
								ingredient={ingredient}
								uniqId={uniqId}
								handleClose={handleClose}
							/>
						);
					})}
				</ul>
				{bun && (
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.imageMobile}
						extraClass="ml-8"
					/>
				)}
			</section>
			<footer>
				<p className="text text_type_digits-medium mr-10">
					{totalSum}&nbsp;
					<CurrencyIcon type="primary" />
				</p>
				<Button
					htmlType="button"
					type="primary"
					size="medium"
					onClick={createOrder}
					disabled={bun === null}
				>
					Оформить заказ
				</Button>
			</footer>
			{success === true && (
				<MyNotification success={true} message={'Заказ создался'} />
			)}
			{success === false && (
				<MyNotification success={false} message={'Заказ не удалось создать'} />
			)}
			{loading && (
				<Modal title="" closeModal={() => {}} hideClose={true}>
					<div className={`${styles.loading}`}>
						<p className="text text_type_main-medium p-15">
							Создание заказа...
						</p>
					</div>
				</Modal>
			)}
			{order && (
				<Modal
					title={''}
					closeModal={() => dispatch(clearOrder())}
					fixPositionPromise={fixPositionPromise}
				>
					<OrderDetails
						fixPositionCallback={fixPositionCallBack!}
						order={order}
					/>
				</Modal>
			)}
		</section>
	);
};
