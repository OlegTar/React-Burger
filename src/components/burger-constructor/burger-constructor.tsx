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

interface BurgerConstructorPropTypes {
	data: IIngredient[];
}

export const BurgerConstructor = ({ data }: BurgerConstructorPropTypes) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	if (data.length === 0) {
		return <></>;
	}
	const bun = data.find((element) => element.type === 'bun');
	if (bun === undefined || bun === null) {
		throw new Error('Булочки нет');
	}

	const fillings = data.filter((element) => element.type !== 'bun');
	let fixPositionCallBack: () => void;
	const fixPositionPromise = new Promise<void>(function (resolve) {
		fixPositionCallBack = resolve;
	});

	return (
		<section className={`${styles.constr} pt-25 pl-4 ml-10`}>
			<section className={styles.burger}>
				<ConstructorElement
					type="top"
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.imageMobile}
					extraClass="ml-8"
				/>

				<ul
					id="burger-constructor-list"
					className={`${styles.list} scroll-pane custom-scroll`}
				>
					{fillings.map((fil) => {
						return (
							<li className={`${styles.ingredient} mb-4`} key={fil._id}>
								<section className={styles.drag}>
									<DragIcon type="primary" />
								</section>
								<ConstructorElement
									extraClass="ml-8"
									isLocked={false}
									text={fil.name}
									price={fil.price}
									thumbnail={fil.imageMobile}
								/>
							</li>
						);
					})}
				</ul>
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.imageMobile}
					extraClass="ml-8"
				/>
			</section>
			<footer>
				<p className="text text_type_digits-medium mr-10">
					610&nbsp;
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
