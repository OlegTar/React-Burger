import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import styles from './register.module.scss';
import { ChangeEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { register as registerAction } from '../../services/actions/register';
import { RequestStatus } from '../../components/request-status/request-status';

export const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const state = useAppSelector((state) => state.user.state);

	const dispatch = useAppDispatch();

	const register = useCallback(() => {
		dispatch(
			registerAction({
				email,
				name,
				password,
			})
		);
	}, [name, email, password, dispatch]);

	if (state === 'success') {
		return <Navigate to="/" replace></Navigate>;
	}

	return (
		<>
			<RequestStatus state={state} errorMessage={'Регистрация не удалась'} />
			<section className={`${styles.content} mt-20`}>
				<header className="text text_type_main-medium">Регистрация</header>
				<Input
					value={name}
					onChange={(e: ChangeEvent) => {
						const input = e.target as HTMLInputElement;
						setName(input.value);
					}}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					extraClass="mt-6"
					placeholder="Имя"
				/>
				<Input
					value={email}
					onChange={(e: ChangeEvent) => {
						const input = e.target as HTMLInputElement;
						setEmail(input.value);
					}}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					extraClass="mt-6"
					placeholder="E-mail"
				/>
				<Input
					value={password}
					onChange={(e: ChangeEvent) => {
						const input = e.target as HTMLInputElement;
						setPassword(input.value);
					}}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					extraClass="mt-6"
					placeholder="Пароль"
					type={showPassword ? 'text' : 'password'}
					icon={showPassword ? 'HideIcon' : 'ShowIcon'}
					onIconClick={() => {
						setShowPassword(!showPassword);
					}}
				/>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6"
					onClick={register}
				>
					Зарегистрироваться
				</Button>
				<p className="text text_type_main-default text_color_inactive mt-20">
					Уже зарегистрированы?{' '}
					<Link to="/login" className={styles.link}>
						Войти
					</Link>
				</p>
			</section>
		</>
	);
};
