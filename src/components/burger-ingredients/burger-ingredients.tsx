import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import { Ingredient } from '../ingredient/ingredient';
import { useEffect, useRef, useState } from 'react';
import { IngredientWithCount } from '../../types/ingredientWithCount';
import { FillingType } from '../../types/fillingType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { clearCurrentItem } from '../../services/reducers/current-ingredient';

interface BurgerIngredientsPropTypes {
	data: IngredientWithCount[];
}

export const BurgerIngredients = ({ data }: BurgerIngredientsPropTypes) => {
	const dispatch = useDispatch();
	const scrollPane = useRef(null);
	const [currentTab, setCurrentTab] = useState<FillingType>('bun');
	const ingredientInModal = useSelector((state: RootState) => state.current);

	useEffect(() => {
		const scrollPaneElement =
			scrollPane.current !== null ? (scrollPane.current as HTMLElement) : null;
		return () => {
			if (scrollPaneElement) {
				scrollPaneElement.removeEventListener('scroll', highLightTab);
			}
		};
	}, []);

	const scrollPaneExists = scrollPane.current !== null;

	useEffect(() => {
		const scrollPaneElement =
			scrollPane.current !== null ? (scrollPane.current as HTMLElement) : null;
		if (scrollPaneElement) {
			scrollPaneElement.addEventListener('scroll', highLightTab);
		}
	}, [scrollPaneExists]);

	function highLightTab() {
		if (!scrollPane.current) {
			return;
		}
		const pane = scrollPane.current as HTMLElement;
		const paneRect = pane.getBoundingClientRect();
		const headers = pane.querySelectorAll('header');
		let nearestHeader: HTMLElement = headers[0];
		let min = Math.abs(paneRect.top - headers[0].getBoundingClientRect().top);
		for (let i = 1; i < headers.length; i++) {
			const currentDistance = Math.abs(
				paneRect.top - headers[i].getBoundingClientRect().top
			);
			if (currentDistance < min) {
				min = currentDistance;
				nearestHeader = headers[i];
			}
		}
		const value = nearestHeader.getAttribute('data-value') as FillingType;
		setCurrentTab(value);
	}
	const noop = () => {};

	if (data.length === 0) {
		return <></>;
	}

	return (
		<>
			<section className={`mt-10 ${styles.constr}`}>
				<header className={`mb-5 text text_type_main-large`}>
					Соберите бургер
				</header>
				<nav className={`${styles.tabs} mb-10`}>
					{[
						{ value: 'bun' as FillingType, title: 'Булки' },
						{ value: 'sauce' as FillingType, title: 'Соусы' },
						{ value: 'main' as FillingType, title: 'Начинки' },
					].map(({ value, title }) => (
						<Tab
							active={value === currentTab}
							value={value}
							onClick={noop}
							key={value}
						>
							{title}
						</Tab>
					))}
				</nav>
				<section className={styles['scroll-pane']} ref={scrollPane}>
					<header className="text text_type_main-medium" data-value="bun">
						Булки
					</header>
					<section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
						{data
							.filter(({ ingredient }) => ingredient.type === 'bun')
							.map(({ ingredient: ing, count }) => (
								<Ingredient ingredient={ing} count={count} key={ing._id} />
							))}
					</section>
					<header className="text text_type_main-medium" data-value="sauce">
						Соусы
					</header>
					<section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
						{data
							.filter(({ ingredient }) => ingredient.type === 'sauce')
							.map(({ ingredient: ing, count }) => (
								<Ingredient ingredient={ing} count={count} key={ing._id} />
							))}
					</section>
					<header className="text text_type_main-medium" data-value="main">
						Начинки
					</header>
					<section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
						{data
							.filter(({ ingredient }) => ingredient.type === 'main')
							.map(({ ingredient: ing, count }) => (
								<Ingredient ingredient={ing} count={count} key={ing._id} />
							))}
					</section>
				</section>
			</section>
			{ingredientInModal && (
				<Modal
					title="Детали ингредиента"
					closeModal={() => dispatch(clearCurrentItem())}
				>
					<IngredientDetails {...ingredientInModal} />
				</Modal>
			)}
		</>
	);
};
