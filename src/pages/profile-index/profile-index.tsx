import {
	Input,
	PasswordInput,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback } from "react";
import { changeUserInfo as changeUserInfoAction } from "../../services/actions/change-user-info";

import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RequestStatus } from "../../components/request-status/request-status";
import { useChangeUserInfoMutation } from "../../services/api/change-user-info-api";

export const ProfileIndex: FC = () => {
	const { user, state, errorMessage, successMessage, changeUserInfoState } =
		useAppSelector((state) => state.user);
	const [changeUserInfo, result] = useChangeUserInfoMutation();
	const { values, setValues, handleChange } = useForm<{
		name: string;
		email: string;
		password: string;
	}>({
		name: user ? user.name : "",
		email: user ? user.email : "",
		password: "",
	});
	const { name, email, password } = values;
	const dispatch = useAppDispatch();

	if (user == null) {
		throw new Error("Ошибка в коде");
	}

	const reset = () => {
		setValues({
			name: user.name,
			email: user.email,
			password: "",
		});
	};

	const isChanged =
		user.name !== name || user.email !== email || password !== "";

	const changeUserInfoAct = useCallback(() => {
		dispatch(
			changeUserInfoAction({
				name,
				email,
				password,
			}),
		);
	}, [email, name, password, dispatch]);

	return (
		<>
			<RequestStatus
				state={state}
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
			<RequestStatus
				state={changeUserInfoState}
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					changeUserInfoAct();
				}}
			>
				<Input
					value={name}
					onChange={handleChange}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					placeholder={`Имя`}
					icon="EditIcon"
					onSubmit={changeUserInfoAct}
					name="name"
				/>
				<Input
					value={email}
					onChange={handleChange}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					placeholder={`Логин`}
					extraClass="mt-6"
					icon="EditIcon"
					name="email"
				/>
				<PasswordInput
					value={password}
					onChange={handleChange}
					placeholder={`Пароль`}
					extraClass="mt-6"
					icon="EditIcon"
					name="password"
				/>
				{isChanged && (
					<p>
						<Button
							htmlType="button"
							type="secondary"
							size="medium"
							onClick={reset}
						>
							Отмена
						</Button>
						<Button
							htmlType="submit"
							type="primary"
							size="medium"
							extraClass="mt-6"
						>
							Сохранить
						</Button>
					</p>
				)}
			</form>
		</>
	);
};
