import { SyntheticEvent } from 'react';

export const linkHandler = (
	e: SyntheticEvent<HTMLAnchorElement>,
	callback: () => void
) => {
	//чтобы не было перехода по ссылке
	e.preventDefault();
	callback();
};
