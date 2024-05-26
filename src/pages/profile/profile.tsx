import { Link, useLocation } from 'react-router-dom';
import styles from './profile.module.scss';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useEffect } from 'react';
import { noop } from '../../utils/common';

export const Profile = () => {
	const { pathname } = useLocation();

	const resize = () => {
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

	useEffect(() => {
		resize();
		window.addEventListener('load', resize);
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('load', resize);
		};
	}, []);

	return (
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
						<Link
							to="/profile"
							className={`text text_type_main-medium text_color_inactive ${styles.link}`}
						>
							Выход
						</Link>
					</li>
				</ul>
				<p className="text text_type_main-default text_color_inactive mt-20">
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
			<section className={`${styles.body}`}>
				<Input
					value={''}
					onChange={noop}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					placeholder={`Имя`}
					icon="EditIcon"
				/>
				<Input
					value={''}
					onChange={noop}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					placeholder={`Логи`}
					extraClass="mt-6"
					icon="EditIcon"
				/>
				<Input
					value={''}
					onChange={noop}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					placeholder={`Пароль`}
					extraClass="mt-6"
					icon="EditIcon"
				/>
			</section>
		</section>
	);
};
