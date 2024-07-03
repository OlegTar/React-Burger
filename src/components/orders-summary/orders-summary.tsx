import { FC } from 'react';
import styles from './orders-summary.module.scss';

export const OrdersSummary: FC = () => {
	const maxColumnSize = 10;
	const orders = Array.from(Array(15));
	const columns: number[][] = [];
	orders.forEach((v, i) => {
		if (i % maxColumnSize == 0) {
			columns.push([]);
		}
		columns[columns.length - 1].push(345311);
	});

	const inProcessing = Array.from(Array(6));
	const columnsProcessing: number[][] = [];
	inProcessing.forEach((v, i) => {
		if (i % maxColumnSize == 0) {
			columnsProcessing.push([]);
		}
		columnsProcessing[columnsProcessing.length - 1].push(345311);
	});

	return (
		<section className={`mt-25 ${styles['container']} ml-15`}>
			<section className={`mb-15 ${styles['orders-summary']}`}>
				<section>
					<header className={`mb-6 text text_type_main-large`}>Готовы:</header>
					<section className={`${styles.columns}`}>
						{columns.map((column) => {
							return (
								<div className={`${styles.column} mr-2`}>
									{column.map((number) => {
										return (
											<p className="text text_type_digits-default text_color_success mb-2">
												034531
											</p>
										);
									})}
								</div>
							);
						})}
					</section>
				</section>
				<section className="ml-9">
					<header className={`mb-6 text text_type_main-large`}>
						В работе:
					</header>
					<section className={`${styles.columns}`}>
						{columnsProcessing.map((column) => {
							return (
								<div className={`${styles.column} mr-2`}>
									{column.map((number) => {
										return (
											<p className="text text_type_digits-default text_color_primary mb-2">
												034531
											</p>
										);
									})}
								</div>
							);
						})}
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
