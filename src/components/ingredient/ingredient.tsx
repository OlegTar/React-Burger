import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.scss';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { IIngredient } from '../../types/ingredient';
import { useModal } from '../../hooks/useModal';

export const Ingredient = (prop: IIngredient) => {
	const { price, name, image } = prop;
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<section className={`${styles.ingredient} mr-6`}>
				<Counter count={1} size="default" extraClass="m-1" />
				<img
					src={image}
					className={`mb-1 ${styles.image}`}
					onClick={openModal}
					alt={name}
				/>
				<p className={`${styles.price} text text_type_digits-default mb-1`}>
					{price}&nbsp;
					<CurrencyIcon type="primary" />
				</p>
				<p
					className={`${styles.name} text text_type_main-small ${styles.name}`}
				>
					{name}
				</p>
			</section>
			{isModalOpen && (
				<Modal title="Детали ингредиента" closeModal={closeModal}>
					<IngredientDetails {...prop} />
				</Modal>
			)}
		</>
	);
};
