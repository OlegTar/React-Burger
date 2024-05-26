import styles from './profile.module.scss';

export const Profile = () => {
	return (
		<section className={styles.content}>
			<section className={styles.menu}>
				<ul>
					<li className="text text_type_main-medium">Профиль</li>
					<li className="text text_type_main-medium mt-2 text_color_inactive">
						История заказов
					</li>
					<li className="text text_type_main-medium mt-2 text_color_inactive">
						Выход
					</li>
				</ul>
				<p className="text text_type_main-default text_color_inactive mt-20">
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
		</section>
	);
};
