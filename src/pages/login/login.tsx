import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { Link, Navigate } from 'react-router-dom';
import {
	ChangeEvent,
	MouseEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login as loginAction } from '../../services/actions/login';
import { RequestStatus } from '../../components/request-status/request-status';
import { reset } from '../../services/reducers/user';

export const Login = () => {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPassword, setIsPassword] = useState(true);
	const { state, user } = useAppSelector((state) => ({
		state: state.user.state,
		user: state.user.user,
	}));

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	const login = useCallback(() => {
		dispatch(loginAction({ email, password }));
	}, [email, password, dispatch]);

	if (state === 'success' && user !== null) {
		return <Navigate to="/" replace></Navigate>;
	}

	return (
		<>
			<RequestStatus state={state} errorMessage={'Неверные логин и пароль'} />
			<section className={`${styles.content} mt-20`}>
				<header className="text text_type_main-medium">Вход</header>
				<Input
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setEmail(e.target.value);
					}}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					extraClass="mt-6"
					placeholder="E-mail"
					type="email"
				/>
				<Input
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setPassword(e.target.value);
					}}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					extraClass="mt-6"
					placeholder="Пароль"
					type={isPassword ? 'password' : 'text'}
					icon={isPassword ? 'ShowIcon' : 'HideIcon'}
					onIconClick={(e: MouseEvent<HTMLDivElement>) => {
						setIsPassword(!isPassword);
					}}
				/>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6"
					onClick={login}
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
		</>
	);
};
