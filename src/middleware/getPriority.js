import Cookie from "js-cookie";
import store from '@/store'

function getPriority() {
    let priority = null;
    if (store.getters.userData.priority) {
        priority = store.getters.userData.priority;
    } else if (Cookie.get('priority')) {
        priority = Cookie.get('priority');
        store.dispatch('setUserData', {priority, token: Cookie.get('token')})
    }

    return priority ? Number(priority) : 0;
}

export default getPriority;