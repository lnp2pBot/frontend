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
      <v-row class="d-flex justify-center">
        <v-col md="6" sm="12">
          <channels :community="selectedCommunity"/>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col md="6" sm="12">
          <div class="d-flex justify-center text-h6">Solvers</div>
          <div
            class="text-subtitle-2 d-flex justify-center text--secondary font-weight-light"
            v-if="selectedCommunity.solvers.length === 0"
          >
            No solvers ¯\_(ツ)_/¯
          </div>
          <div class="d-flex justify-center">
            <a :href="'http://t.me/jhonsu777'" target="_blank" rel="noopener noreferrer">
              <v-chip
                style="cursor:pointer"
                class="ma-2"
                color="indigo"
                text-color="white"
                v-for="solver in selectedCommunity.solvers"
                :key="solver.username"
              >
                @{{ solver.username }}
              </v-chip>
            </a>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h5 d-flex justify-center">
            Sells
          </div>
          <div
            v-if="getSellOrders().length === 0"
            class="text-subtitle d-flex justify-center"
          >
            No Sell Orders
          </div>
          <orders :orders="getSellOrders()"/>
        </v-col>
        <v-col>
          <div class="text-h5 d-flex justify-center">
            Buys
          </div>
          <div
            v-if="getBuyOrders().length === 0"
            class="text-subtitle d-flex justify-center"
          >
            No Buy Orders
          </div>
          <orders :orders="getBuyOrders()"/>
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
<style>
a {
  text-decoration: none;
  color:inherit;
}
</style>