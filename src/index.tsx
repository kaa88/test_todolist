import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux'; // clean package
// import { store } from './store/store';
import App from './App';
import './styles/index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('app') as HTMLElement
)
root.render(
	// <Provider store={store}>
		<App />
	// </Provider>
)
