export default {
  ADD_ITEM(state, item) {
    state.items.push({
      name: item,
    })
    state.totalItems = state.items.length
  },
  REMOVE_ITEM(state, item) {
    state.items = state.items.filter((items) => items.name !== item)
    state.totalItems = state.items.length
  },
  SAVE_ORDER(state) {
    localStorage.setItem('orders', JSON.stringify(state.items))
  },
}
