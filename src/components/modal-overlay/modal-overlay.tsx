import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.scss';
import { FC } from 'react';

const modalOverlay = document.getElementById('modal-overlay');
if (modalOverlay === null) {
	throw new Error('Error!');
}

interface ModalOverlayPropTypes {
	closeModal: () => void;
}

export const ModalOverlay: FC<ModalOverlayPropTypes> = ({ closeModal }) => {
	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={closeModal} />,
		modalOverlay
	);
};
