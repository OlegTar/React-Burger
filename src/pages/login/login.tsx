import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.scss";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login as loginAction } from "../../services/actions/login";
import { RequestStatus } from "../../components/request-status/request-status";
import { MyNotification } from "../../components/my-notification/my-notification";
import { useForm } from "../../hooks/useForm";

export const Login: FC = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	// if (localStorage.getItem(accessToken)) {
	// 	dispatch(getUser());
	// }

	const {
		state,
		user,
		errorMessage: error,
	} = useAppSelector((state) => state.user);

	const { values, handleChange } = useForm<{
		email: string;
		password: string;
	}>({
		email: "",
		password: "",
	});
	const { email, password } = values;

	const login = () => {
		dispatch(loginAction({ email: values.email, password: values.password }));
	};

	if (state === "success" && user !== null) {
		const { from } = location.state || { from: { pathname: "/" } };
		return <Navigate to={from} />;
	}

	return (
		<>
			{location.state?.message && (
				<MyNotification success={true} message={location.state.message} />
			)}
			<RequestStatus state={state} errorMessage={error} />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					login();
				}}
			>
				<section className={`${styles.content} mt-20`}>
					<header className="text text_type_main-medium">Вход</header>
					<Input
						value={email}
						onChange={handleChange}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
						extraClass="mt-6"
						placeholder="E-mail"
						type="email"
						name="email"
					/>
					<PasswordInput
						value={password}
						onChange={handleChange}
						extraClass="mt-6"
						placeholder="Пароль"
						name="password"
					/>
					<Button
						htmlType="submit"
						type="primary"
						size="large"
						extraClass="mt-6"
					>
						Войти
					</Button>
					<p className="text text_type_main-default text_color_inactive mt-10">
						Вы &mdash; новый пользователь?{" "}
						<Link to="/register" className={styles.link}>
							Зарегистрироваться
						</Link>
					</p>
					<p className="text text_type_main-default text_color_inactive mt-4">
						Забыли пароль?{" "}
						<Link to="/forgot-password" className={styles.link}>
							Восстановить пароль
						</Link>
					</p>
				</section>
			</form>
		</>
	);
};
