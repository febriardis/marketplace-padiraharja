const state = {
  token: localStorage.getItem('token') || null,
  session: null,
}

const getters = {
  loggedIn: (state) => state.token != null,
  getSessionData: (state) => state.session,
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_SESSION(state, data) {
    state.session = data
  },
  DESTROY_TOKEN(state) {
    state.token = null
    state.session = null
  },
}

const actions = {
  logout({ commit }) {
    localStorage.removeItem('token')
    commit('DESTROY_TOKEN')
    // window.location.reload()
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
