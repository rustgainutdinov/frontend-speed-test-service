import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Guest/Auth'
import Login from '@/views/Guest/Auth/Login'
import Register from '@/views/Guest/Auth/Register'
import User from '@/views/User'
import Main from '@/views/User/Main'
import Domain from '@/views/User/Domain'
import Url from '@/views/User/Url'
import Cookie from 'js-cookie';
import store from '@/store'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: {
				path: 'guest'
			}
		},
		{
			path: '/user',
			name: 'User',
			component: User,
			children: [
				{
					path: '',
					name: 'Main Redirect',
					redirect: {
						path: 'main'
					}
				},
				{
					path: 'main',
					name: 'Main',
					component: Main
				},
				{
					path: 'domain',
					name: 'Domain',
					component: Domain
				},
				{
					path: 'url',
					name: 'Url',
					component: Url
				}
			],
			async beforeEnter(to, from, next) {
				let priority = null;
				if (store.getters.userData.priority) {
					priority = store.getters.userData.priority;
				} else if (Cookie.get('priority')) {
					priority = Cookie.get('priority');
					store.dispatch('setUserData', {priority, token: Cookie.get('token')})
				}

				if (priority && priority >= 100) {
					next();
				} else next({path: '/guest'});
			}
		},
		{
			path: '/guest',
			name: 'Guest',
			component: Auth,
			children: [
				{
					path: '',
					name: 'Guest Redirect',
					redirect: {
						path: 'login'
					}
				},
				{
					path: 'login',
					name: 'Login',
					component: Login
				},
				{
					path: 'register',
					name: 'Register',
					component: Register
				}
			]
		}
	],
	mode: 'history'
})
