import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import { IIngredient } from '../../types/ingredient';
import { Ingredient } from '../ingredient/ingredient';

interface BurgerIngredientsPropTypes {
	data: IIngredient[];
}

export const BurgerIngredients = ({ data }: BurgerIngredientsPropTypes) => {
	if (data.length === 0) {
		return <></>;
	}

	const noop = () => {};
	return (
		<section className={`mt-10 ${styles.constr}`}>
			<header className={`mb-5 text text_type_main-large`}>
				Соберите бургер
			</header>
			<nav className={`${styles.tabs} mb-10`}>
				<Tab active={true} value="bun" onClick={noop}>
					Булки
				</Tab>
				<Tab active={false} value="sauce" onClick={noop}>
					Соусы
				</Tab>
				<Tab active={false} value="main" onClick={noop}>
					Начинки
				</Tab>
			</nav>
			<section className={styles['scroll-pane']}>
				<header className="text text_type_main-medium">Булки</header>
				<section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
					{data
						.filter((ing) => ing.type === 'bun')
						.map((ing) => (
							<Ingredient {...ing} imageLarge={ing.imageLarge} key={ing._id} />
						))}
				</section>
				<header className="text text_type_main-medium">Соусы</header>
				<section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
					{data
						.filter((ing) => ing.type === 'sauce')
						.map((ing) => (
							<Ingredient {...ing} imageLarge={ing.imageLarge} key={ing._id} />
						))}
				</section>
				<header className="text text_type_main-medium">Начинки</header>
				<section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
					{data
						.filter((ing) => ing.type === 'main')
						.map((ing) => (
							<Ingredient {...ing} imageLarge={ing.imageLarge} key={ing._id} />
						))}
				</section>
			</section>
		</section>
	);
};
