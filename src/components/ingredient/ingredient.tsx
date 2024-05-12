import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.scss';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { IIngredient } from '../../types/ingredient';
import { useModal } from '../../hooks/useModal';
import { useDrag } from 'react-dnd';

interface IngredientPropTypes {
	ingredient: IIngredient;
	count: number;
}

export const Ingredient = ({ ingredient, count }: IngredientPropTypes) => {
	const { price, name, image } = ingredient;
	const { isModalOpen, openModal, closeModal } = useModal();
	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	return (
		<>
			<section className={`${styles.ingredient} mr-6`} ref={dragRef}>
				{count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
				<img
					draggable={false}
					onDragStart={(e) => {
						e.preventDefault();
					}}
					onDrag={(e) => {
						e.preventDefault();
					}}
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
					<IngredientDetails {...ingredient} />
				</Modal>
			)}
		</>
	);
};
