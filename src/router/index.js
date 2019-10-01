import Vue from 'vue'
import Router from 'vue-router'
import Error from '@/layouts/Error'
import Auth from '@/views/Guest/Auth'
import Login from '@/views/Guest/Auth/Login'
import Register from '@/views/Guest/Auth/Register'
import User from '@/views/User'
import Main from '@/views/User/Main'
import Domain from '@/views/User/Domain'
import DomainUrlInfoTemplate from '@/views/User/DomainUrlInfoTemplate'
import Url from '@/views/User/Url'
import AdminPanel from '@/views/Admin/DomainsListPage'
import getPriority from "../middleware/getPriority";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: {
                path: 'guest'
            },
            meta: {
                breadcrumb: 'guest'
            }
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            meta: {
                breadcrumb: 'Главная'
            },
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
                    component: Main,
                    meta: {
                        breadcrumb: 'Основная статистика'
                    }
                },
                {
                    path: 'admin-panel',
                    name: 'Admin panel',
                    component: AdminPanel,
                    meta: {
                        breadcrumb: 'Администрирование доменов'
                    },
                    beforeEnter(to, from, next) {
                        let priority = getPriority();
                        if (priority && priority >= 200) {
                            next();
                        } else {
                            next({path: '/user'});
                        }
                    }
                },
                {
                    path: ':domainName',
                    name: 'Domain',
                    props: true,
                    component: DomainUrlInfoTemplate,
                    meta: {
                        breadcrumb: (router, breadcrumb) => {
                            const domainName = router.params.domainName;
                            return {
                                name: domainName,
                                path: breadcrumb.path.replace(/:.*/gi, domainName)
                            }
                        }
                    },
                    children: [
                        {
                            path: '',
                            name: 'Info',
                            component: Domain,
                            meta: {
                                breadcrumb: (router, breadcrumb) => {
                                    const domainName = router.params.domainName;
                                    return {
                                        name: 'Статистика по домену',
                                        path: breadcrumb.path.replace(/:.*/gi, domainName)
                                    }
                                }
                            }
                        },
                        {
                            path: 'url-info',
                            name: 'Url-info',
                            component: Url,
                            meta: {
                                breadcrumb: (router, breadcrumb) => {
                                    const domainName = router.params.domainName;
                                    return {
                                        name: 'Сатистика по url',
                                        path: breadcrumb.path.replace(/:.*/gi, domainName)
                                    }
                                }
                            }
                        },
                    ]
                },
            ],
            beforeEnter(to, from, next) {
                let priority = getPriority();
                if (priority && priority >= 100) {
                    next();
                } else {
                    next({path: '/guest'});
                }
            }
        },
        {
            path: '/guest',
            name:
                'Guest',
            component:
            Auth,
            children:
                [
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
        },
        {
            path: '*',
            name:
                'Error',
            component:
            Error
        }
    ],
    mode: 'history'
})
