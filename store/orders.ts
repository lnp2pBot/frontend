import { GetterTree, ActionTree, MutationTree } from 'vuex'

export enum OrderType {
  BUY = 'buy',
  SELL = 'sell'
}

export interface Order {
  _id: string
  description: string
  amount: number
  fee: number
  bot_fee: number
  community_fee: number
  status: string
  type: OrderType
  fiat_amount: number | null
  fiat_code: string
  payment_method: string
  taken_at: string
  tg_chat_id: string
  tg_order_message: string
  tg_channel_message1: string
  price_from_api: boolean
  price_margin: number
  community_id: string
  created_at: string
}

type OrdersByCommunity = {
  [communityId: string]: Order[]
}

export const state = () => ({
  orders: [] as Order[],
  sells: [] as Order[],
  buys: [] as Order[],
  selectedOrder: Object as () => Order,
  ordersByCommunity: {} as OrdersByCommunity
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  getAllOrders({ commit }) {
    this.$axios.$get('/orders')
      .then(orders => {
        commit('setOrders', orders)
        const sells = orders.filter((order: Order) => order.type === OrderType.SELL)
        const buys = orders.filter((order: Order) => order.type === OrderType.BUY)
        commit('setSells', sells)
        commit('setBuys', buys)
      })
      .catch(err => console.error('Error fetching all orders. err: ', err))
  },
  getOrderById({ commit }, id: string): void {
    this.$axios.$get<Order>(`/order/${id}`)
      .then(order => commit('setSelectedOrder', order))
      .catch(console.error)
  },
  getOrdersByCommunityId({ commit }, communityId: string) {
    this.$axios.$get<Order[]>(`/orders?community_id=${communityId}`)
      .then(orders => commit('setOrdersByCommunity', {communityId, orders}))
      .catch(console.error)
  }
}

export const mutations: MutationTree<RootState> = {
  setSelectedOrder(state, order) {
    state.selectedOrder = order
  },
  setOrders(state, orders) {
    state.orders = orders
  },
  setSells(state, sells) {
    state.sells = sells
  },
  setBuys(state, buys) {
    state.buys = buys
  },
  setOrdersByCommunity(state, payload: {communityId: string, orders: Order[]}) {
    const { orders, communityId } = payload
    if (!state.ordersByCommunity) {
      state.ordersByCommunity = {}
    }
    const newMap = {...state.ordersByCommunity, communityId: orders}
    state.ordersByCommunity = newMap
  }
}

export const getters: GetterTree<RootState, RootState> = {
  getOrderCount: state => (communityId: string) => {
    if (state.ordersByCommunity[communityId]) {
      return state.ordersByCommunity[communityId].length
    }
    return 0
  },
  getSellsByCommunityId: state => (communityId: string) => {
    if (!state.sells) return []
    return state.sells.filter(order => order.community_id === communityId)
  },
  getBuysByCommunityId: state => (communityId: string) => {
    if (!state.buys) return []
    return state.buys.filter(order => order.community_id === communityId)
  },
  getOrdersByCommunityId: state => (communityId: string, type: string) => {
    if (!state.ordersByCommunity) return []
    const communityOrders = state.ordersByCommunity[communityId]
    if (!communityOrders) return []
    return communityOrders.filter(order => order.type === type)
  }
}