import { ActionTree, MutationTree } from 'vuex'

export interface User {
  _id: string,
  username: string,
  trades_completed: number,
  total_reviews: number,
  total_rating: number,
  created_at: string
}

export const state = () => ({
  users: {},
  selectedCommunityCreator: null as User | null,
  creatorError: false
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  getUserById({ commit }, id) {
    return this.$axios.$get(`/user/${id}`)
      .then(user => {
        commit('setUser', user)
        return user
      })
      .catch(err => {
        commit('setCreatorError', true)
        console.error(`Error fetching user with id ${id}. err: `, err)
      })
  },
  setCommunityCreator({ commit }, user) {
    commit('setCommunityCreator', user)
  }
}

export const mutations: MutationTree<RootState> = {
  // @ts-ignore
  setUser(state, user: User) {
    const updatedUsers = { ...state.users, [user._id]: user }
    state.users = updatedUsers
  },
  setCommunityCreator(state, user: User) {
    state.selectedCommunityCreator = user
  },
  setCreatorError(state, error) {
    state.creatorError = error
  }
}