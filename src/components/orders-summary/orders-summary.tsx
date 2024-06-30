import { FC } from 'react';
import styles from './orders-summary.module.scss';

export const OrdersSummary: FC = () => {
	return (
		<section className={`mt-25 ${styles['container']} ml-15`}>
			<section className={`mb-15 ${styles['orders-summary']}`}>
				<section>
					<header className={`mb-6 text text_type_main-large`}>Готовы:</header>
					<section>
						<p className="text text_type_digits-default text_color_success mb-2">
							034533
						</p>
						<p className="text text_type_digits-default text_color_success mb-2">
							034532
						</p>
						<p className="text text_type_digits-default text_color_success mb-2">
							034530
						</p>
						<p className="text text_type_digits-default text_color_success mb-2">
							034527
						</p>
						<p className="text text_type_digits-default text_color_success">
							034525
						</p>
					</section>
				</section>
				<section className="ml-9">
					<header className={`mb-6 text text_type_main-large`}>
						В работе:
					</header>
					<section>
						<p className="text text_type_digits-default mb-2">034538</p>
						<p className="text text_type_digits-default mb-2">034541</p>
						<p className="text text_type_digits-default">034542</p>
					</section>
				</section>
			</section>
			<header className={`text text_type_main-large`}>
				Выполнено за всё время:
			</header>
			<p className={`text text_type_digits-large mb-15 ${styles['number']}`}>
				28 752
			</p>
			<header className={`text text_type_main-large`}>
				Выполнено за сегодня:
			</header>
			<p className={`text text_type_digits-large ${styles['number']}`}>138</p>
		</section>
	);
};
