import { FC } from 'react';
import styles from './ingredient-circle.module.scss';

type IngredientCirclePropTypes = {
	url: string;
	margin: number;
	zIndex: number;
	rest: number;
};

export const IngredientCircle: FC<IngredientCirclePropTypes> = ({
	url,
	margin,
	zIndex,
	rest,
}) => {
	return (
		<div
			className={`${styles['container']}`}
			style={{ left: `${margin * 50}px`, zIndex: zIndex }}
		>
			<div
				className={`${styles['debug']} ${styles['ingredient-circle']}`}
				style={{
					backgroundImage: `url(${url})`,
				}}
			>
				{rest !== 0 && (
					<span className="text text_type_main-default">+{rest}</span>
				)}
			</div>
		</div>
	);
};
