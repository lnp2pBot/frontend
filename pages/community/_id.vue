<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h5 d-flex justify-center">
            Sells
          </div>
          <v-card>
            <v-list three-line>
              <div
                v-if="sells.length === 0"
                class="text-subtitle d-flex justify-center"
              >
                No Sell Orders
              </div>
              <template v-for="(sell, index) in sells">
                <div :key="sell.id">
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title>{{ sell.fiat_amount }} {{ sell.fiat_code }}</v-list-item-title>
                      <v-list-item-subtitle>{{ sell.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index !== sells.length - 1"></v-divider>
                </div>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-col>
          <div class="text-h5 d-flex justify-center">
            Buys
          </div>
          <v-card>
            <v-list three-line>
              <div
                v-if="buys.length === 0"
                class="text-subtitle d-flex justify-center"
              >
                No Buy Orders
              </div>
              <template v-for="(buy, index) in buys">
                <div :key="buy.id">
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title>{{ buy.fiat_amount }} {{ buy.fiat_code }}</v-list-item-title>
                      <v-list-item-subtitle>{{ buy.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index !== buys.length - 1"></v-divider>
                </div>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { OrderType } from '../../store/orders'
export default Vue.extend({
  layout: 'community',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  mounted() {
    // @ts-ignore
    console.log('this.id: ', this.id)
    // @ts-ignore
    this.$store.dispatch('orders/getOrdersByCommunityId', this.id)
  },
  computed: mapState({
    orders: (state: any) => state.orders.orders,
    sells: (state: any) => state.orders.orders.filter((order: any) => order.type === OrderType.BUY),
    buys: (state: any) => state.orders.orders.filter((order: any) => order.type === OrderType.SELL)
  })
})
</script>