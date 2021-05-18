export default {
  getCartCount(state) {
    return state.items !== null ? state.items.length : 0
  },
  getOrders(state) {
    return state.items.map((item) => item.name)
  },
}
