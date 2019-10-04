import Cookie from 'js-cookie';


function setUserData(app, token, priority, email) {
    app.$store.dispatch('setUserData', {token, priority, email});
    Cookie.set('token', token);
    Cookie.set('priority', priority);
}

export default setUserData