export default {
  state: () => ({
    bookmarkedAnime: [],
  }),
  mutations: {
    ADD_BOOKMARK_ANIME: (state, payload) => {
      state.bookmarkedAnime.push(payload)
    },
    DELETE_BOOKMARK_ANIME: (state, payload) => {
      state.bookmarkedAnime = state.bookmarkedAnime.filter(
        (anime) => anime.id !== payload.id
      )
    },
  },
  actions: {
    addBookmarkAnime({ commit }, payload) {
      commit('ADD_BOOKMARK_ANIME', payload)
    },
    deleteBookmarkAnime({ commit }, payload) {
      commit('DELETE_BOOKMARK_ANIME', payload)
    },
  },
  getters: {},
  namespaced: true,
}
