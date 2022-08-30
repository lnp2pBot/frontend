<template>
  <div>
    <v-container>
      <v-row>
        <currencies
          class="my-4"
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
          <solvers :community="selectedCommunity"/>
        </v-col>
      </v-row>
      <v-row v-if="$vuetify.breakpoint.mobile">
        <v-col cols="12">
          <div class="text-h5 d-flex justify-center">
            Orders
          </div>
          <orders :orders="getAllOrders()"/>
        </v-col>
      </v-row>
      <v-row v-if="!$vuetify.breakpoint.mobile">
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
      <v-row>
        <v-col cols="12">
          <creation-date
            :creationDate="selectedCommunity.created_at"
          />
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
      return this.getSellsByCommunityId(this.id)
    },
    getBuyOrders(): Order[] {
      // @ts-ignore
      return this.getBuysByCommunityId(this.id)
    },
    getAllOrders(): Order[] {
      // @ts-ignore
      return this.getOrdersByCommunityId(this.id)
    }
  },
  computed: {
    ...mapGetters('orders', ['getSellsByCommunityId', 'getBuysByCommunityId', 'getOrdersByCommunityId']),
    ...mapState('communities',['communities','selectedCommunity'])
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