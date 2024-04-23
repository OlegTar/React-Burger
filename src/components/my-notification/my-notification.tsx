import ReactDOM from 'react-dom';
import styles from './my-notificaiton.module.scss';
import { useEffect, useState } from 'react';

const notificationContainer = document.getElementById('notification');
if (notificationContainer === null) {
	throw new Error('Error');
}

interface MyNotificationPropTypes {
	success: boolean;
	message: string;
}

export const MyNotification = ({
	success,
	message,
}: MyNotificationPropTypes) => {
	const [showing, setShowing] = useState(true);

	const additionalClass = success ? styles.success : styles.error;
	const additionalClass2 = showing ? styles.appearing : '';
	useEffect(() => {
		setTimeout(() => setShowing(false), 2000);
	}, []);

	return ReactDOM.createPortal(
		<p
			className={`${styles.notification} ${additionalClass} ${additionalClass2} text text_type_main-medium p-5`}
		>
			{message}
		</p>,
		notificationContainer
	);
};
