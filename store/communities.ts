import { ActionTree, MutationTree } from 'vuex'

export class OrderChannel {
  name!: string
  type!: string
}

export class Solver {
  username!: string
}

export class Community {
  _id!: string
  name!: string
  order_channels!: OrderChannel[]
  group!: string
  fee!: number
  earnings!: number
  orders_to_redeem!: number
  dispute_channel!: string
  solvers!: Solver[]
  public!: boolean
  currencies!: string[]
  created_at!: string
}

export const state = () => ({
  isLoading: false,
  communities: [] as Community[]
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
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

export const mutations: MutationTree<RootState> = {
  setCommunities(state, communities) {
    state.communities = communities
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  }
}