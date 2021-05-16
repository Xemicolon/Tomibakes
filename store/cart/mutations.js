export default {
  ADD_ITEM(state, item) {
    state.items.push({
      name: item,
    })
  },
  REMOVE_ITEM(state, item) {
    state.items = state.items.filter((items) => items.name !== item)
  },
  SAVE_ORDER(state) {
    localStorage.setItem('orders', JSON.stringify(state.items))
  },
}
