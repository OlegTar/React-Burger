import { useEffect } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import '../../index.css';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { MyNotification } from '../my-notification/my-notification';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IIngredient } from '../../types/ingredient';
import { setBun as setBunInConstructor } from '../../services/reducers/constructor-ingredients';
import {
	setBun as setBunInIngrdients,
	increaseItem,
	removeBun as removeBunInIngredients,
} from '../../services/reducers/ingredients';
import { addIngredient } from '../../services/reducers/constructor-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';

const marginFromEnd = 10;

function App() {
	const {
		loading: isLoading,
		success,
		ingredients: data,
	} = useSelector((state: RootState) => state.ingredients);

	const { bun: currentBun } = useSelector(
		(state: RootState) => state['constructor-ingredients']
	);

	const dispatch = useDispatch<AppDispatch>();
	const onDropHandler = (ingredient: IIngredient) => {
		if (ingredient.type === 'bun') {
			if (currentBun !== null) {
				dispatch(removeBunInIngredients(currentBun._id));
			}
			dispatch(setBunInIngrdients(ingredient._id));
			dispatch(setBunInConstructor(ingredient));
		} else {
			dispatch(increaseItem(ingredient._id));
			dispatch(addIngredient(ingredient));
		}
	};

	const calculateNewHeight = () => {
		const elements = document.getElementsByClassName(styles['main-content']);
		if (elements.length === 0) {
			return;
		}
		const element = elements[0] as HTMLElement;
		const rect = element.getBoundingClientRect();
		const newHeight = window.innerHeight - rect.top - marginFromEnd;
		element.style.height = newHeight + 'px';
	};

	useEffect(() => {
		dispatch(getIngredients());
		window.addEventListener('resize', calculateNewHeight);
		return () => {
			window.removeEventListener('resize', calculateNewHeight);
		};
	}, [dispatch]);

	useEffect(calculateNewHeight, [isLoading]);

	return (
		<>
			<AppHeader />
			{success === true && (
				<MyNotification success={true} message={'Данные загружены'} />
			)}
			{success === false && (
				<MyNotification
					success={false}
					message={'Данные не удалось подгрузить'}
				/>
			)}
			{isLoading && (
				<Modal title="" closeModal={() => {}} hideClose={true}>
					<div className={`${styles.loading}`}>
						<p className="text text_type_main-medium p-15">Загрузка...</p>
					</div>
				</Modal>
			)}
			{data !== undefined && (
				<main className={`${styles['main-content']}`}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients data={data} />
						<BurgerConstructor onDropHandler={onDropHandler} />
					</DndProvider>
				</main>
			)}
		</>
	);
}

export default App;
