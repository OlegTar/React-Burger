import { Link } from 'react-router-dom';
import styles from './app-header.module.scss';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	const itemCss = 'p-5 mt-4 mb-4';
	return (
		<header className={styles.header}>
			<nav className={styles.firstMenu}>
				<ul className={styles.menu}>
					<li className={itemCss}>
						<Link to="/" className={styles.link}>
							<BurgerIcon type="primary" />
							<span className="text text_type_main-small ml-2 text_color_primary">
								Конструктор
							</span>
						</Link>
					</li>
					<li className={`${itemCss} ml-2`}>
						<ListIcon type="secondary" />
						<span className="text text_type_main-small text_color_inactive ml-2">
							Лента заказов
						</span>
					</li>
				</ul>
			</nav>
			<nav className={styles.logo}>
				<Logo />
			</nav>
			<nav className={styles['last-menu']}>
				<ul className={styles.menu}>
					<li className={itemCss}>
						<Link to="/profile" className={styles.link}>
							<ProfileIcon type="secondary" />
							<span className="text text_type_main-small text_color_inactive ml-2">
								Личный кабинет
							</span>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
