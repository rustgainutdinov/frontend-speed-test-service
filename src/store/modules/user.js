const user = {
	state: {
		data: {
			email: null,
			pass: null,
			token: null,
			priority: null
		}
	},
	mutations: {
		setUserData(state, data) {
			for (let key in data) {
				if (state.data[key] !== undefined) {
					state.data[key] = data[key];
				}
			}
		}
	},
	actions: {
		setUserData({commit}, data) {
			commit('setUserData', data);
		}
	}
};

export default user;
