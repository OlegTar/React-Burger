import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import { useState } from 'react';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { IIngredient } from '../../types/ingredient';

interface BurgerConstructorPropTypes {
	data: IIngredient[];
}

export const BurgerConstructor = ({ data }: BurgerConstructorPropTypes) => {
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

	if (data.length === 0) {
		return <></>;
	}
	const bun = data.find((element) => element.type === 'bun');
	if (bun === undefined || bun === null) {
		throw new Error('Булочки нет');
	}

	const closeModal = () => setIsOrderModalOpen(false);

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
					text={bun.name}
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
							<li className={`${styles.ingredient} mb-4`} key={fil.id}>
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
					text={bun.name}
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
					onClick={() => setIsOrderModalOpen(true)}
				>
					Оформить заказ
				</Button>
			</footer>
			{isOrderModalOpen && (
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
