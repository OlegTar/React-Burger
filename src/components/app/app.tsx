import { useEffect } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.scss';
import '../../index.css';
import { getIngredients } from '../../services/actions/ingredients';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { Home } from '../../pages/home';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { MyNotification } from '../my-notification/my-notification';

const marginFromEnd = 10;

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const { loading, success } = useAppSelector((state) => state.ingredients);
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

	const handleModalClose = () => {
		// Возвращаемся к предыдущему пути при закрытии модалки
		navigate(-1);
	};

	useEffect(() => {
		dispatch(getIngredients());
		window.addEventListener('resize', calculateNewHeight);
		return () => {
			window.removeEventListener('resize', calculateNewHeight);
		};
	}, [dispatch]);

	useEffect(calculateNewHeight, [loading]);

	return (
		<>
			{success && (
				<MyNotification success={true} message={'Данные загружены'} />
			)}
			{success === false && (
				<MyNotification
					success={false}
					message={'Данные не удалось подгрузить'}
				/>
			)}
			{loading && (
				<Modal title="" closeModal={() => {}} hideClose={true}>
					<div className={`${styles.loading}`}>
						<p className="text text_type_main-medium p-15">Загрузка...</p>
					</div>
				</Modal>
			)}
			<AppHeader />
			<main className={`${styles['main-content']}`}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ingredients/:id" element={<IngredientDetails />} />
				</Routes>
				{background && (
					<Routes>
						<Route
							path="/ingredients/:id"
							element={
								loading ? null : (
									<>
										<Modal
											title="Детали ингредиента"
											closeModal={handleModalClose}
										>
											<IngredientDetails />
										</Modal>
									</>
								)
							}
						/>
					</Routes>
				)}
			</main>
		</>
	);
}

export default App;
