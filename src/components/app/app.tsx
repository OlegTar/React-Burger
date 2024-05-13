import { useEffect } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import '../../index.css';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const marginFromEnd = 10;

function App() {
	const { loading: isLoading } = useAppSelector((state) => state.ingredients);
	const dispatch = useAppDispatch();
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
			<main className={`${styles['main-content']}`}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</>
	);
}

export default App;
