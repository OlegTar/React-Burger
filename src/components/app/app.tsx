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
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ResetPassword } from '../../pages/reset-password';
import { ForgotPassword } from '../../pages/forgot-password';
import { Profile } from '../../pages/profile';
import { getUser } from '../../services/actions/user';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { NotFound } from '../../pages/not-found';

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
		dispatch(getUser());
	}, [dispatch]);

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
			{success === false && location.pathname === '/' && (
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
					<Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
					<Route
						path="/register"
						element={<OnlyUnAuth component={<Register />} />}
					/>
					<Route
						path="/forgot-password"
						element={<OnlyUnAuth component={<ForgotPassword />} />}
					/>
					<Route
						path="/reset-password"
						element={<OnlyUnAuth component={<ResetPassword />} />}
					/>
					<Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
						<Route
							path="orders"
							element={<OnlyAuth component={<Profile />} />}
						/>
						<Route
							path="orders/:number"
							element={<OnlyAuth component={<Profile />} />}
						/>
					</Route>
					<Route path="*" element={<NotFound />} />
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
