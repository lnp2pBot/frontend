<template>
  <div>
    <v-container>
      <v-row>
        <currencies
          class="ml-4"
          :currencies="selectedCommunity.currencies"
          :truncate="false"
        />
      </v-row>
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
              <div v-for="(sell, index) in getSellOrders()" :key="sell.id">
                <order-details :order="sell"/>
                <v-divider v-if="index !== getSellOrders().length - 1"></v-divider>
              </div>
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
              <div v-for="(buy, index) in getBuyOrders()" :key="buy.id">
                <order-details :order="buy"/>
                <v-divider v-if="index !== getBuyOrders().length - 1"></v-divider>
              </div>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
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
    ]),
    ...mapState('communities',['selectedCommunity']),
    ...mapState('communities',['communities'])
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'index') {
      next()
    } else {
      next(({$store}) => {
        $store.dispatch('communities/getCommunities')
          .then(() => {
            // @ts-ignore
            $store.dispatch('communities/setSelectedCommunity', to.params.id)
            next()
          })
      })
    }
  }
})
</script>