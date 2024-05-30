import { Link, useLocation } from 'react-router-dom';
import styles from './profile.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RequestStatus } from '../../components/request-status/request-status';
import { logout as logoutAction } from '../../services/actions/logout';
import { changeUserInfo as changeUserInfoAction } from '../../services/actions/change-user-info';
import { User } from '../../types/user';

export const Profile = () => {
	const { pathname } = useLocation();
	const { user, state } = useAppSelector((state) => ({
		user: state.user.user as User,
		state: state.user.state,
	}));
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSucessMessage] = useState('');
	const dispatch = useAppDispatch();

	if (user == null) {
		throw new Error(
			'Ошибка в коде. Этот компонент не должен показываться неавторизованному пользователю'
		);
	}

	useEffect(() => {
		fixPosition();
		window.addEventListener('load', fixPosition);
		window.addEventListener('resize', fixPosition);
		return () => {
			window.removeEventListener('resize', fixPosition);
			window.removeEventListener('load', fixPosition);
		};
	}, []);

	const logout = useCallback(() => {
		setErrorMessage('Выйти не удалось');
		dispatch(logoutAction());
	}, [setErrorMessage, dispatch]);

	const changeUserInfo = useCallback(() => {
		setErrorMessage('Не удалось поменять данные пользователя');
		setSucessMessage('Данные пользователя обновлены');
		dispatch(
			changeUserInfoAction({
				name,
				email,
				password,
			})
		);
	}, [setErrorMessage, dispatch, name, email, password]);

	const fixPosition = () => {
		const container = document.getElementsByClassName(
			`${styles.content}`
		)[0] as HTMLElement;
		container.style.marginLeft = '0px';
		const body = document.getElementsByClassName(`${styles.body}`)[0];
		const rect = body.getBoundingClientRect();
		const currentLeft = rect.left;
		const targetLeft = (document.body.clientWidth - rect.width) / 2;
		const delta = targetLeft - currentLeft;
		container.style.marginLeft = delta + 'px';
	};

	return (
		<>
			<RequestStatus
				state={state}
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
			<section className={`${styles.content} mt-20`}>
				<section className={`${styles.menu} pr-15`}>
					<ul>
						<li>
							<Link
								to="/profile"
								className={`text text_type_main-medium ${styles.link} ${
									pathname === '/profile'
										? 'text_color_primary'
										: 'text_color_inactive'
								}`}
							>
								Профиль
							</Link>
						</li>
						<li className="mt-2">
							<Link
								to="/profile/orders"
								className={`text text_type_main-medium ${styles.link} ${
									pathname === '/profile/orders'
										? 'text_color_primary'
										: 'text_color_inactive'
								}`}
							>
								История заказов
							</Link>
						</li>
						<li className="mt-2">
							<p
								className={`text text_type_main-medium text_color_inactive ${styles.link}`}
								onClick={logout}
							>
								Выход
							</p>
						</li>
					</ul>
					<p className="text text_type_main-default text_color_inactive mt-20">
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</section>
				<section className={`${styles.body}`}>
					<Input
						value={name}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setName(e.target.value);
						}}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
						placeholder={`Имя`}
						icon="EditIcon"
					/>
					<Input
						value={email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setEmail(e.target.value);
						}}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
						placeholder={`Логин`}
						extraClass="mt-6"
						icon="EditIcon"
					/>
					<Input
						value={password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value);
						}}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
						placeholder={`Пароль`}
						extraClass="mt-6"
						icon="EditIcon"
					/>
					<Button
						htmlType="button"
						type="primary"
						size="large"
						extraClass="mt-6"
						onClick={changeUserInfo}
					>
						Сохранить
					</Button>
				</section>
			</section>
		</>
	);
};
