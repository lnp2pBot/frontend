import { ActionTree, MutationTree } from 'vuex'

export interface OrderChannel {
  name: string
  type: string
}

export interface Solver {
  username: string
}

export interface Community {
  _id: string
  name: string
  order_channels: OrderChannel[]
  group: string
  fee: number
  earnings: number
  orders_to_redeem: number
  dispute_channel: string
  solvers: Solver[]
  public: boolean
  currencies: string[]
  created_at: string
}

export const state = () => ({
  isLoading: false,
  communities: [] as Community[],
  filter: '',
  selectedCurrency: null,
  selectedCommunity: Object as () => Community
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  getCommunities({ commit }) {
    commit('setLoading', true)
    return this.$axios.$get<Community[]>('/communities')
      .then(data => {
        commit('setCommunities', data)
      })
      .catch(console.error)
      .finally(() => commit('setLoading', false))
  },
  setSelectedCommunity({ state, commit }, communityId) {
    if (state.communities.length > 0) {
      const selectedCommunity = state.communities.find(
        comm => comm._id === communityId
      )
      if (selectedCommunity) {
        commit('setSelectedCommunity', selectedCommunity)
      }
    }
  },
  setFilter({ commit }, filter) {
    commit('setFilter', filter)
  },
  setCurrency({ commit }, currency) {
    commit('setCurrency', currency)
  }
}

export const mutations: MutationTree<RootState> = {
  setCommunities(state, communities) {
    state.communities = communities
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setSelectedCommunity(state, selectedCommunity) {
    state.selectedCommunity = selectedCommunity
  },
  setFilter(state, filter) {
    state.filter = filter.toLowerCase()
  },
  setCurrency(state, currency) {
    state.selectedCurrency = currency
  }
}