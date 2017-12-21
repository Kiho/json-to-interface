import { connect } from 'redux-zero/svelte';
import store from '../../store/store';

const mapToProps = ({ counter }) => ({ counter });

export default {
    data() {
        return {
            showH2: true,
            showH2_aa: false,
        };
    },
    oncreate() {
        console.log('H2 - oncreate');
        connect(this, store, mapToProps);
    },
    ondestroy() {
        console.log('H2 - ondestroy');
    }
};