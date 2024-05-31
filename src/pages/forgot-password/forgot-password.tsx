import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import styles from './forgot-password.module.scss';
import { ChangeEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RequestStatus } from '../../components/request-status/request-status';
import { passwordReset } from '../../services/actions/password-reset';
import { resetPasswordCalled } from '../../config';

export const ForgotPassword = () => {
	const dispatch = useAppDispatch();
	const { state, errorMessage } = useAppSelector((state) => ({
		state: state.user.state,
		errorMessage: state.user.errorMessage,
	}));
	const [email, setEmail] = useState('');
	const resetPassword = useCallback(() => {
		localStorage.removeItem(resetPasswordCalled);
		dispatch(
			passwordReset({
				email,
			})
		);
	}, [email, dispatch]);

	const isPasswordSent = localStorage.getItem(resetPasswordCalled) === '1';
	if (isPasswordSent && state === 'success') {
		return <Navigate to="/reset-password" />;
	}

	return (
		<>
			{`state = ${state}`}
			<RequestStatus state={state} errorMessage={errorMessage} />
			<section className={`${styles.content} mt-20`}>
				<header className="text text_type_main-medium">
					Восстановление пароля
				</header>
				<Input
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setEmail(e.target.value);
					}}
					extraClass="mt-6"
					placeholder="Укажите e-mail"
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				/>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6"
					onClick={resetPassword}
				>
					Восстановить
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
