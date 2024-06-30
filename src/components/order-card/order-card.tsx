import { FC } from 'react';
import styles from './order-card.module.scss';
import { IngredientCircle } from '../ingredient-circle/ingredient-circle';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

export const OrderCard: FC = () => {
	const navigate = useNavigate();

	const imgs = [
		'https://code.s3.yandex.net/react/code/salad-mobile.png',
		'https://code.s3.yandex.net/react/code/core-mobile.png',
		'https://code.s3.yandex.net/react/code/cheese-mobile.png',
		'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
		'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
		'https://code.s3.yandex.net/react/code/core-mobile.png',
	];

	return (
		<div
			className={`p-6 mb-4 ${styles['debug']} ${styles['card']}`}
			onClick={() => navigate('/feed/33')}
		>
			<div className={`${styles['number']} mb-6`}>
				<p className="text text_type_digits-default">#034535</p>
				<p className="text text_type_main-default text_color_inactive">
					Сегодня, 16:20
				</p>
			</div>
			<p className="text text_type_main-medium mb-6">
				Death Star Starship Main бургер
			</p>
			<div className={`${styles['footer']}`}>
				<div className={`${styles['ingredients']}`}>
					{imgs.map((e, i) => (
						<IngredientCircle
							url={e}
							margin={i}
							zIndex={imgs.length - i}
							rest={i < 5 ? 0 : 3}
						/>
					))}
				</div>
				<div className={`${styles['price']}`}>
					<p className="text text_type_digits-default mr-2">480</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};
