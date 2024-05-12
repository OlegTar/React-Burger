import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { IIngredient } from '../../types/ingredient';
import { useModal } from '../../hooks/useModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/reducers/constructor-ingredients';
import { decreaseItem } from '../../services/reducers/ingredients';

export interface BurgerConstructorPropTypes {
	onDropHandler: (ingredient: IIngredient) => void;
}

export const BurgerConstructor = ({
	onDropHandler,
}: BurgerConstructorPropTypes) => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const dispatch = useDispatch();
	const { bun, ingredients } = useSelector(
		(state: RootState) => state['constructor-ingredients']
	);

	const totalSum =
		(bun?.price || 0) * 2 +
		ingredients.reduce((acc, { ingredient }) => acc + ingredient.price, 0);

	const [, dragRef] = useDrag({
		type: 'constr',
	});

	const [, dropTargetConstr] = useDrop({
		accept: 'constr',
		drop() {
			alert(2);
		},
	});

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
					ref={dropTargetConstr}
				>
					{ingredients.map(({ ingredient, uniqId }) => {
						return (
							<li className={`${styles.ingredient} mb-4`} key={uniqId}>
								<section className={styles.drag} draggable>
									<DragIcon type="primary" />
								</section>
								<ConstructorElement
									extraClass="ml-8"
									isLocked={false}
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.imageMobile}
									handleClose={() => handleClose(ingredient, uniqId)}
								/>
							</li>
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
					onClick={openModal}
				>
					Оформить заказ
				</Button>
			</footer>
			{isModalOpen && (
				<Modal
					title={''}
					closeModal={closeModal}
					fixPositionPromise={fixPositionPromise}
				>
					<OrderDetails fixPositionCallback={fixPositionCallBack!} />
				</Modal>
			)}
		</section>
	);
};
