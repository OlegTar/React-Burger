import { createContext } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { FC, ReactNode, useEffect } from "react";
import { linkHandler } from "../../utils/common";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal");
if (modalRoot === null) {
	throw new Error("Error");
}

interface ModalPropTypes {
	closeModal: () => void;
	children: ReactNode;
	title: string;
	hideClose?: boolean;
	fixPositionPromise?: Promise<void>;
}

export const ModalContext = createContext({
	setPosition: () => {},
});

export const Modal: FC<ModalPropTypes> = ({
	closeModal,
	children,
	title,
	fixPositionPromise,
	hideClose = false,
}) => {
	let element: HTMLDivElement | null;
	const saveElement = (element_: HTMLDivElement | null) => {
		element = element_;
	};

	const setPosition = () => {
		if (element === null) {
			return;
		}
		const rect = element.getBoundingClientRect();
		const halfOfWidth = Math.round(rect.width / 2);
		const halfOfHeight = Math.round(rect.height / 2);
		element.style.top = `calc(50% - ${halfOfHeight}px)`;
		element.style.left = `calc(50% - ${halfOfWidth}px)`;
	};

	if (fixPositionPromise) {
		fixPositionPromise
			.then(() => {
				setPosition();
			})
			.catch(() => {});
	}

	const handlerKeyPress = (e: KeyboardEvent) => {
		if (e.code === "Escape") {
			closeModal();
		}
	};

	useEffect(() => {
		window.addEventListener("resize", setPosition);
		if (!hideClose) {
			window.document.body.addEventListener("keydown", handlerKeyPress);
		}
		setTimeout(setPosition, 0);

		return () => {
			window.removeEventListener("resize", setPosition);
			if (!hideClose) {
				window.document.body.removeEventListener("keydown", handlerKeyPress);
			}
		};
	});

	const additionalClass = title === "" ? styles.abs : "";

	return ReactDOM.createPortal(
		<ModalContext.Provider value={{ setPosition }}>
			<div className={styles.modal} ref={saveElement}>
				{!hideClose && (
					<header
						className={`${styles.header} ${additionalClass} pl-10 pr-10 pt-10`}
					>
						<p className={`text text_type_main-large`}>{title}</p>
						<a
							href="/"
							onClick={(e) => linkHandler(e, closeModal)}
							data-cy="close-modal"
						>
							<CloseIcon type="primary" />
						</a>
					</header>
				)}
				{children}
				<ModalOverlay closeModal={closeModal} />
			</div>
		</ModalContext.Provider>,
		modalRoot,
	);
};
