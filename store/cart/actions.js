export default {
  addItem({ commit }, item) {
    commit('ADD_ITEM', item)
    commit('SAVE_ORDER')
  },
  removeItem({ commit }, item) {
    commit('REMOVE_ITEM', item)
    commit('SAVE_ORDER')
  },
  saveorder({ commit }) {
    commit('SAVE_ORDER')
  },
  addItems({ commit }, items) {
    commit('ADD_ITEMS', items)
  },
  updateItems({ commit }, items) {
    commit('UPDATE_ITEMS', items)
    commit('SAVE_ORDER')
  },
}
