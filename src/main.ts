import App from './components/App.html';
import store from './store/store';
import H2 from './components/counter/H2.html';

const app = new App({
	target: document.querySelector('main'),
	store: store
});

const h2 = new H2({
	target: document.querySelector('#h2'),
	store: store
});

function h2extend(c: H2) {
	const { showH2, showH2_aa } = c.get();
	const aa = c.get('showH2_aa');
	console.log('h2extend - showH2', showH2, showH2_aa);
}

h2extend(h2);