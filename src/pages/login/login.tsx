import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { Link } from 'react-router-dom';
import { noop } from '../../utils/common';

export const Login = () => {
	return (
		<section className={styles.content}>
			<header className="text text_type_main-medium">Вход</header>
			<Input
				value={''}
				onChange={noop}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
				extraClass="mt-6"
				placeholder="E-mail"
			/>
			<Input
				value={''}
				onChange={noop}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
				extraClass="mt-6"
				placeholder="Пароль"
				type="password"
				icon="ShowIcon"
			/>
			<Button htmlType="button" type="primary" size="large" extraClass="mt-6">
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
	);
};
