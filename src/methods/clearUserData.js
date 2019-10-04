import Cookie from 'js-cookie';

function clearUserData(app) {
    app.$store.dispatch('setUserData', {email: null, token: null, priority: null});
    Cookie.set('token');
    Cookie.set('priority');
}

export default clearUserData