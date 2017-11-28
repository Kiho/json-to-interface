import App from './components/App.html';
import store from './store/store';

const app = new App({
	target: document.querySelector('main'),
	store: store
});
