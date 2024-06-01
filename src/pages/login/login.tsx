import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login as loginAction } from '../../services/actions/login';
import { RequestStatus } from '../../components/request-status/request-status';
import { reset } from '../../services/reducers/user';
import { MyNotification } from '../../components/my-notification/my-notification';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { state, user } = useAppSelector((state) => ({
		state: state.user.state,
		user: state.user.user,
	}));

	const { values, handleChange } = useForm<{
		email: string;
		password: string;
	}>({
		email: '',
		password: '',
	});
	const { email, password } = values;

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	const login = useCallback(() => {
		dispatch(loginAction({ email: values.email, password: values.password }));
	}, [values.email, values.password, dispatch]);

	if (state === 'success' && user !== null) {
		return <Navigate to="/" replace></Navigate>;
	}

	return (
		<>
			{location.state?.message && (
				<MyNotification success={true} message={location.state.message} />
			)}
			<RequestStatus state={state} errorMessage={'Неверные логин и пароль'} />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					login();
				}}
			>
				<section className={`${styles.content} mt-20`}>
					<header className="text text_type_main-medium">Вход</header>
					<Input
						value={email}
						onChange={handleChange}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
						extraClass="mt-6"
						placeholder="E-mail"
						type="email"
						name="email"
					/>
					<PasswordInput
						value={password}
						onChange={handleChange}
						extraClass="mt-6"
						placeholder="Пароль"
						name="password"
					/>
					<Button
						htmlType="submit"
						type="primary"
						size="large"
						extraClass="mt-6"
					>
						Войти
					</Button>
					<p className="text text_type_main-default text_color_inactive mt-20">
						Вы &mdash; новый пользователь?{' '}
						<Link to="/register" className={styles.link}>
							Зарегистрироваться
						</Link>
					</p>
					<p className="text text_type_main-default text_color_inactive mt-4">
						Забыли пароль?{' '}
						<Link to="/forgot-password" className={styles.link}>
							Восстановить пароль
						</Link>
					</p>
				</section>
			</form>
		</>
	);
};
