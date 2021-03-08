const state = {
  cart_count: null,
}

const getters = {
  cartCount: (state) => state.cart_count,
}

const mutations = {
  SET_CART_COUNT(state, value) {
    state.cart_count = value
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
