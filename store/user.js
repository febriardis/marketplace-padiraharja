export const state = () => ({
  cart_count: null,
})

export const getters = {
  cartCount: (state) => state.cart_count,
}

export const mutations = {
  SET_CART_COUNT(state, value) {
    state.cart_count = value
  },
}
