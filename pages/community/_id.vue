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
                v-if="getSellOrders().length === 0"
                class="text-subtitle d-flex justify-center"
              >
                No Sell Orders
              </div>
              <template v-for="(sell, index) in getSellOrders()">
                <div :key="sell.id">
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title>{{ sell.fiat_amount }} {{ sell.fiat_code }}</v-list-item-title>
                      <v-list-item-subtitle>{{ sell.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index !== getSellOrders().length - 1"></v-divider>
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
                v-if="getBuyOrders().length === 0"
                class="text-subtitle d-flex justify-center"
              >
                No Buy Orders
              </div>
              <template v-for="(buy, index) in getBuyOrders()">
                <div :key="buy.id">
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title>{{ buy.fiat_amount }} {{ buy.fiat_code }}</v-list-item-title>
                      <v-list-item-subtitle>{{ buy.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index !== getBuyOrders().length - 1"></v-divider>
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
import { mapGetters } from 'vuex'
import { Order } from '../../store/orders'
export default Vue.extend({
  layout: 'community',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  methods: {
    getSellOrders(): Order[] {
      // @ts-ignore
      return this['orders/getSellsByCommunityId'](this.id)
    },
    getBuyOrders(): Order[] {
      // @ts-ignore
      return this['orders/getBuysByCommunityId'](this.id)
    }
  },
  computed: {
    ...mapGetters([
      'orders/getSellsByCommunityId',
      'orders/getBuysByCommunityId'
    ])
  },
})
</script>