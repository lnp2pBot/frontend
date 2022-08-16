

export const state = () => ({
  isLoading: false,
  communities: []
})

export const actions = {
  getCommunities({ commit }) {
    commit('setLoading', true)
    this.$axios.$get('/communities')
      .then(data => {
        commit('setCommunities', data)
      })
      .catch(console.error)
      .finally(() => commit('setLoading', false))
  }
}

export const mutations = {
  setCommunities(state, communities) {
    state.communities = communities
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  }
}