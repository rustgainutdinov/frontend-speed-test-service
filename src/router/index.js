import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Guest/Auth'
import Login from '@/views/Guest/Auth/Login'
import Register from '@/views/Guest/Auth/Register'


Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: {
				path: 'guest/login'
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
