import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './profile.module.scss';
import { FC, useCallback, useEffect } from 'react';
import { logout as logoutAction } from '../../services/actions/logout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RequestStatus } from '../../components/request-status/request-status';
import { User } from '../../types/application-types/user';
import { useOrderModal } from '../../hooks/useOrderModal';

export const Profile: FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const showOnlyOrder = useOrderModal();

	const { state, errorMessage } = useAppSelector((state) => ({
		user: state.user.user as User,
		state: state.user.state,
		errorMessage: state.user.errorMessage,
	}));

	useEffect(() => {
		if (!showOnlyOrder) {
			fixPosition();
			window.addEventListener('load', fixPosition);
			window.addEventListener('resize', fixPosition);
		}
		return () => {
			if (!showOnlyOrder) {
				window.removeEventListener('resize', fixPosition);
				window.removeEventListener('load', fixPosition);
			}
		};
	}, []);

	const logout = useCallback(() => {
		dispatch(logoutAction());
	}, [dispatch]);

	const fixPosition = () => {
		const container = document.getElementsByClassName(
			`${styles.content}`
		)[0] as HTMLElement;
		container.style.marginLeft = '0px';
		const body = document.getElementsByClassName(`${styles.body}`)[0];
		const rect = body.getBoundingClientRect();
		const currentLeft = rect.left;
		const targetLeft = (document.body.clientWidth - rect.width) / 2;
		let delta = targetLeft - currentLeft;
		if (delta < 0) {
			delta = 100;
		}
		container.style.marginLeft = delta + 'px';
	};

	return (
		<>
			{showOnlyOrder && <Outlet />}
			{!showOnlyOrder && (
				<>
					<RequestStatus
						state={state}
						errorMessage={errorMessage}
						successMessage={''}
					/>
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
									<p
										className={`text text_type_main-medium text_color_inactive ${styles.link}`}
										onClick={logout}
									>
										Выход
									</p>
								</li>
							</ul>
							<p className="text text_type_main-default text_color_inactive mt-20">
								В этом разделе вы можете изменить свои персональные данные
							</p>
						</section>
						<section className={`${styles.body}`}>
							<Outlet />
						</section>
					</section>
				</>
			)}
		</>
	);
};
