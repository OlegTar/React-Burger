import {
	Input,
	Button,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import styles from './reset-password.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RequestStatus } from '../../components/request-status/request-status';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { resetPasswordCalled } from '../../config';
import { reset } from '../../services/reducers/user';
import { changePassword as changePasswordAction } from '../../services/actions/change-password';
import { MyNotification } from '../../components/my-notification/my-notification';
import { useForm } from '../../hooks/useForm';

export const ResetPassword = () => {
	const isResetPasswordCalled =
		localStorage.getItem(resetPasswordCalled) === '1';

	const location = useLocation();
	const dispatch = useAppDispatch();
	const { state, errorMessage } = useAppSelector((state) => ({
		state: state.user.state,
		errorMessage: state.user.errorMessage,
	}));
	const { values, handleChange } = useForm<{
		token: string;
		password: string;
	}>({
		token: '',
		password: '',
	});

	const { password, token } = values;

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	const changePassword = useCallback(() => {
		dispatch(
			changePasswordAction({
				token,
				password,
			})
		);
	}, [token, password, dispatch]);

	if (!isResetPasswordCalled) {
		if (state == 'init') {
			return <Navigate to={'/forgot-password'} replace />;
		} else if (state === 'success') {
			return (
				<Navigate to={'/login'} state={{ message: 'Пароль изменён' }} replace />
			);
		}
	}

	return (
		<>
			{location.state?.message && (
				<MyNotification success={true} message={location.state.message} />
			)}
			<RequestStatus state={state} errorMessage={errorMessage} />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					changePassword();
				}}
			>
				<section className={`${styles.content} mt-20`}>
					<header className="text text_type_main-medium">
						Восстановление пароля
					</header>
					<PasswordInput
						value={password}
						onChange={handleChange}
						extraClass="mt-6"
						placeholder="Введите новый пароль"
						name="password"
					/>
					<Input
						value={token}
						onChange={handleChange}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
						extraClass="mt-6"
						placeholder="Введите код из письма"
						name="token"
					/>
					<Button
						htmlType="submit"
						type="primary"
						size="large"
						extraClass="mt-6"
					>
						Сохранить
					</Button>
					<p className="text text_type_main-default text_color_inactive mt-20">
						Вспомнили пароль?{' '}
						<Link to="/login" className={styles.link}>
							Войти
						</Link>
					</p>
				</section>
			</form>
		</>
	);
};
