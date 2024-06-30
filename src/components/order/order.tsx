import { FC } from 'react';
import styles from './order.module.scss';
import { IngredientCircle } from '../ingredient-circle/ingredient-circle';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Order: FC = () => {
	return (
		<section className={`${styles['order']} ml-8`}>
			<header className="mt-10 mb-10 text text_type_digits-default">
				#034533
			</header>
			<header className="text text_type_main-medium mb-3">
				Black Hole Singularity острый бургер
			</header>
			<p className="text text_type_main-default text_color_success mb-15">
				Выполнен
			</p>
			<header className="text text_type_main-medium mb-6">Состав:</header>
			<section className="mr-10">
				<ul className={`${styles['list']} pr-6 mt-10`}>
					{Array.from(Array(10)).map((e) => (
						<li className={`${styles['item']} mt-4`}>
							<div className={`${styles['name']}`}>
								<IngredientCircle
									url={'https://code.s3.yandex.net/react/code/salad-mobile.png'}
								/>
								<p className="ml-4 text text_type_main-default">
									Флюоресцентная булка R2-D3
								</p>
							</div>
							<p
								className={`text text_type_digits-default ml-4 ${styles['price']}`}
							>
								2 x 20&nbsp;
								<CurrencyIcon type="primary" />
							</p>
						</li>
					))}
				</ul>
				<div className={`${styles['footer']} mb-10`}>
					<p className="text text_type_main-default text_color_inactive">
						Вчера, 13:50
					</p>
					<p className={`text text_type_digits-default ${styles['price']}`}>
						512&nbsp;
						<CurrencyIcon type="primary" />
					</p>
				</div>
			</section>
		</section>
	);
};
