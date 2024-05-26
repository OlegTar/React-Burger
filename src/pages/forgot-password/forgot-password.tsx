import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { noop } from '../../utils/common';
import styles from './forgot-password.module.scss';
export const ForgotPassword = () => {
	return (
		<section className={styles.content}>
			<header className="text text_type_main-medium">
				Восстановление пароля
			</header>
			<Input
				value={''}
				onChange={noop}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
				extraClass="mt-6"
				placeholder="Укажите e-mail"
			/>
			<Button htmlType="button" type="primary" size="large" extraClass="mt-6">
				Восстановить
			</Button>
			<p className="text text_type_main-default text_color_inactive mt-20">
				Вспомнили пароль?{' '}
				<Link to="/login" className={styles.link}>
					Войти
				</Link>
			</p>
		</section>
	);
};
