import { ActionTree, MutationTree } from 'vuex'

export enum Tabs {
  COMMUNITIES = 0,
  ORDERS = 1
}

export const state = () => ({
  selected: Tabs.COMMUNITIES 
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  setTab({ commit }, tab: Tabs) {
    commit('setSelectedTab', tab)
  }
}

export const mutations: MutationTree<RootState> = {
  setSelectedTab(state, tab) {
    state.selected = tab
  }
}