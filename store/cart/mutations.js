export default {
  ADD_ITEM(state, item) {
    state.items.push(item)
    state.totalItems = state.items !== null ? state.items.length : 0
  },
  ADD_ITEMS(state, items) {
    state.items = items
    state.totalItems = state.items !== null ? state.items.length : 0
  },
  UPDATE_ITEMS(state, items) {
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].name === items.name) {
        console.log(state.items[i].name)
        state.items[i] = items
        return
      }
    }
  },
  REMOVE_ITEM(state, item) {
    state.items = state.items.filter((items) => items.name !== item.name)
    state.totalItems = state.items.length
  },
  SAVE_ORDER(state) {
    localStorage.setItem('orders', JSON.stringify(state.items))
  },
}
