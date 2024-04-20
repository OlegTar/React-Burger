import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//имя файла App требуется, чтобы было с большой буквы (не смотря на то, что разрабатываю под Виндой)
//которая безралична к регистру символов в файле.
//Реакт выдаёт ошибку, если имя app.tsx с маленькой буквы, ну и в import'е c маленькой буквы.
import App from './components/app/App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
