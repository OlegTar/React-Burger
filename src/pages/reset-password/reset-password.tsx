import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import styles from './reset-password.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RequestStatus } from '../../components/request-status/request-status';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { resetPasswordCalled } from '../../config';
import { reset } from '../../services/reducers/user';
import { changePassword as changePasswordAction } from '../../services/actions/change-password';

export const ResetPassword = () => {
	const isResetPasswordCalled =
		localStorage.getItem(resetPasswordCalled) === '1';

	const dispatch = useAppDispatch();
	const { state, errorMessage } = useAppSelector((state) => ({
		state: state.user.state,
		errorMessage: state.user.errorMessage,
	}));
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [isPassword, setIsPassword] = useState(true);

	useEffect(() => {
		dispatch(reset());
	}, []);

	const changePassword = useCallback(() => {
		dispatch(
			changePasswordAction({
				token,
				password,
			})
		);
	}, [token, password]);

	if (!isResetPasswordCalled) {
		return <Navigate to={'/forgot-password'} replace />;
	}

	return (
		<>
			<RequestStatus
				state={state}
				errorMessage={errorMessage}
				successMessage={'Пароль изменён'}
			/>
			<section className={`${styles.content} mt-20`}>
				<header className="text text_type_main-medium">
					Восстановление пароля
				</header>
				<Input
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setPassword(e.target.value);
					}}
					extraClass="mt-6"
					placeholder="Введите новый пароль"
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					type={isPassword ? 'password' : 'text'}
					icon={isPassword ? 'ShowIcon' : 'HideIcon'}
					onIconClick={() => {
						setIsPassword(!isPassword);
					}}
				/>
				<Input
					value={token}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setToken(e.target.value);
					}}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					extraClass="mt-6"
					placeholder="Введите код из письма"
				/>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6"
					onClick={changePassword}
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
		</>
	);
};
