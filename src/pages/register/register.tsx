import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register.module.scss';
import { noop } from '../../utils/common';

export const Register = () => {
	return (
		<section className={styles.content}>
			<header className="text text_type_main-medium">Регистрация</header>
			<Input
				value={''}
				onChange={noop}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
				extraClass="mt-6"
				placeholder="Имя"
			/>
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
				Зарегистрироваться
			</Button>
			<p className="text text_type_main-default text_color_inactive mt-20">
				Уже зарегистрированы?{' '}
				<Link to="/login" className={styles.link}>
					Войти
				</Link>
			</p>
		</section>
	);
};
