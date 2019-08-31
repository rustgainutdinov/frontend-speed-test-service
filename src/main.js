import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VChart from 'viser-vue'
import axios from 'axios'

const base = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000/'
});

Vue.prototype.$http = base;

Vue.use(Antd);
Vue.use(VChart);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
