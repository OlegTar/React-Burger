import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RequestStatus } from '../request-status/request-status';

type TProtectedProps = {
	onlyUnAuth?: boolean;
	component: JSX.Element;
};

const Protected: FC<TProtectedProps> = ({ onlyUnAuth = false, component }) => {
	const { state, user } = useAppSelector((store) => store.user);
	const location = useLocation();

	console.log(location.state);

	if (state == 'pending') {
		return <RequestStatus state="pending" />;
	}

	const isAuthenticated = state == 'success' && user != null;

	if (onlyUnAuth && isAuthenticated) {
		// Пользователь авторизован, но роут предназначен для неавторизованного пользователя
		// Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	// !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
	// onlyUnAuth && !user Пользователь неавторизован и роут для неавторизованного пользователя
	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
	<Protected onlyUnAuth={true} component={component} />
);
