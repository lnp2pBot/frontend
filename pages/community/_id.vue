<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h5 d-flex justify-center">
            {{ $t('coins') }}
          </div>
          <currencies
            class="my-4"
            :currencies="selectedCommunity.currencies"
            :truncate="false"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-h5 d-flex justify-center">
            {{ $t('discount') }}
          </div>
          <div class="d-flex justify-center font-weight-light">
            {{ communityDiscount.toFixed(1) }}%
          </div>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col md="6" sm="12">
          <channels v-if="selectedCommunity" :community="selectedCommunity"/>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col md="6" sm="12">
          <creator :creator="selectedCommunityCreator" :error="creatorError"/>
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
            {{ $t('orders') }}
          </div>
          <orders :orders="getAllOrders()"/>
        </v-col>
      </v-row>
      <v-row v-if="!$vuetify.breakpoint.mobile">
        <v-col>
          <div class="text-h5 d-flex justify-center">
            {{ $t('sells') }}
          </div>
          <div
            v-if="getSellOrders().length === 0"
            class="text-subtitle d-flex justify-center"
          >
            {{ $t('noSells') }}
          </div>
          <orders :orders="getSellOrders()"/>
        </v-col>
        <v-col>
          <div class="text-h5 d-flex justify-center">
            {{ $t('buys') }}
          </div>
          <div
            v-if="getBuyOrders().length === 0"
            class="text-subtitle d-flex justify-center"
          >
            {{ $t('noBuys') }}
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
import { Order } from '~/store/orders'
import { Community } from '~/store/communities'
import { calculateDiscount } from '~/utils'
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
    ...mapState('communities',['communities','selectedCommunity']),
    ...mapState('users',['selectedCommunityCreator', 'creatorError']),
    communityDiscount() {
      // @ts-ignore
      return calculateDiscount(this.selectedCommunity.fee)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async ({$store}) => {
      if (from.name !== 'index') {
        await $store.dispatch('communities/getCommunities')
      }
      // @ts-ignore
      const community: Community = await $store.dispatch(
        'communities/setSelectedCommunity',
        to.params.id
      )
      const user = await $store.dispatch('users/getUserById', community.creator_id)
      await $store.dispatch('users/setCommunityCreator', user)
      next()
    })
  }
})
</script>
<style>
a {
  text-decoration: none;
  color:inherit;
}
</style>