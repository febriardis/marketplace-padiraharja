export const state = () => ({
  token: localStorage.getItem('token') || null,
  session: null,
})

export const getters = {
  loggedIn: (state) => state.token != null,
  getSessionData: (state) => state.session,
}

export const mutations = {
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

export const actions = {
  logout({ commit }) {
    localStorage.removeItem('token')
    commit('DESTROY_TOKEN')
    // window.location.reload()
  },
}
