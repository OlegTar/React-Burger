import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import '../../index.css';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { url } from '../../config';
import { Modal } from '../modal/modal';
import { MyNotification } from '../my-notification/my-notification';
import DataFromServer, {
	IIngredientFromServer,
} from '../../types/dataFromServer';
import { IIngredient } from '../../types/ingredient';

const marginFromEnd = 10;

function App() {
	const calculateNewHeight = () => {
		const elements = document.getElementsByClassName(styles['main-content']);
		if (elements.length === 0) {
			return;
		}
		const element = elements[0] as HTMLElement;
		const rect = element.getBoundingClientRect();
		const newHeight = window.innerHeight - rect.top - marginFromEnd;
		element.style.height = newHeight + 'px';
	};

	const [state, setState] = useState<'init' | 'loading' | 'success' | 'error'>(
		'init'
	);

	const [data, setData] = useState<IIngredient[]>([]);

	const convert = (ing: IIngredientFromServer): IIngredient => {
		return {
			id: ing._id,
			imageLarge: ing.image_large,
			imageMobile: ing.image_mobile,
			...ing,
		};
	};

	useEffect(() => {
		window.addEventListener('resize', calculateNewHeight);
		calculateNewHeight();

		const delay = new Promise<void>((r) => {
			setTimeout(r, 1000);
		});

		setState('loading');

		//чтобы надпись Загрузка быстро не моргала.
		Promise.all([fetch(url), delay])
			.then(([data]) => {
				setState('success');
				return data.json();
			})
			.then((e: DataFromServer) => {
				setData(e.data.map(convert));
			})
			.catch(() => {
				setState('error');
			})
			.finally(() => {
				setTimeout(() => setState('init'), 3000);
			});

		return () => {
			window.removeEventListener('resize', calculateNewHeight);
		};
	}, []);

	return (
		<>
			<AppHeader />
			{state === 'success' && (
				<MyNotification success={true} message={'Данные загружены'} />
			)}
			{state === 'error' && (
				<MyNotification
					success={false}
					message={'Данные не удалось подгрузить'}
				/>
			)}
			{state === 'loading' && (
				<Modal title="" closeModal={() => {}} hideClose={true}>
					<div className={`${styles.loading}`}>
						<p className="text text_type_main-medium p-15">Загрузка...</p>
					</div>
				</Modal>
			)}
			<section className={`${styles['main-content']}`}>
				<BurgerIngredients data={data} />
				<BurgerConstructor data={data} />
			</section>
		</>
	);
}

export default App;
