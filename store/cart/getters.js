export default {
  getCartCount(state) {
    return state.items.length
  },
  getOrders(state) {
    return state.items.map((item) => item.name)
  },
}
