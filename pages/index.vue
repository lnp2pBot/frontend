<template>
  <div>
    <template>
      <v-tabs v-model="tab" class="d-flex justify-center" fixed-tabs>
        <v-tab>Communities</v-tab>
        <v-tab>Orders</v-tab>
      </v-tabs>
      <search :onFilterChange="onFilterChange"/>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="2">
            <v-combobox
              v-if="tab === 1"
              v-model="selectedCommunity"
              :items="communities"
              hint="Select a community"
              solo
              clearable
              label="Community"
            >
            </v-combobox>
          </v-col>
          <v-col cols="2">
            <v-combobox
              @change="onCurrencyChange"
              v-model="selectedCurrency"
              :items="currencies"
              hint="Select a currency"
              solo
              clearable
              label="Currency"
            >
            </v-combobox>
          </v-col>
          <v-col cols="2">
            <v-combobox
              v-if="tab === 1"
              v-model="selectedOrderType"
              :items="orderTypes"
              hint="Select an order type"
              solo
              clearable
              label="Buy/Sell"
            >
            </v-combobox>
          </v-col>
        </v-row>
      </v-container>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <communities/>
        </v-tab-item>
        <v-tab-item>
          <orders :orders="ordersToDisplay"/>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { Community } from '~/store/communities'
import { Order, OrderType } from '~/store/orders'

enum Tabs {
  COMMUNITIES = 0,
  ORDERS = 1
}

export default {
  name: 'IndexPage',
  layout: 'main',
  data() {
    return {
      tab: 0,
      selectedCurrency: null,
      selectedOrderType: null,
      selectedCommunity: null
    }
  },
  methods: {
    // @ts-ignore
    onFilterChange(val) {
      // @ts-ignore
      switch(this.tab) {
        case Tabs.COMMUNITIES:
          // @ts-ignore
          this.$store.dispatch('communities/setFilter', val)
          return
        case Tabs.ORDERS:
          // @ts-ignore
          this.$store.dispatch('orders/setFilter', val)
          return
      }
    },
    onCurrencyChange(currency: string) {
      // @ts-ignore
      this.$store.dispatch('communities/setCurrency', currency)
    },
  },
  computed: {
    orderTypes: () => [
      OrderType.BUY.toUpperCase(),
      OrderType.SELL.toUpperCase()
    ],
    ...mapState('orders', ['orders', 'filter']),
    ...mapState({
      // @ts-ignore
      communities: state => state.communities.communities.map(c => ({text: c.name, value: c})),
      currencies: state => {
        const currencyMap = {}
        // @ts-ignore
        const _currencies = state.communities
          // @ts-ignore
          .communities.map(community => community.currencies)
          .flat()
          // @ts-ignore
          .forEach((c: string) => currencyMap[c] = true)

        return Object.keys(currencyMap)
      }
    }),
    ordersToDisplay(): Order[] {
      // @ts-ignore
      if (this.filter === '' &&
          // @ts-ignore
          !this.selectedCommunity &&
          // @ts-ignore
          !this.selectedOrderType &&
          // @ts-ignore
          !this.selectedCurrency
      ) {
        // @ts-ignore
        return this.orders
      }
      // @ts-ignore
      return this.orders
        // @ts-ignore
        .filter((order: Order) => {
          const descriptionCriteria = order.description
            .toLowerCase()
            // @ts-ignore
            .includes(this.filter)
          const fiatCodeCriteria = order
            .fiat_code
            .toLowerCase()
            // @ts-ignore
            .includes(this.filter)
          return descriptionCriteria || fiatCodeCriteria
        })
        .filter((order: Order) => {
          // @ts-ignore
          // There is no community filtering, just allow everything
          if (!this.selectedCommunity) return true
          // This order doesn't belong to any community, take it out
          if (!order.community_id) return false
          // Find out to which community this order belongs to
          // @ts-ignore
          const community = this.communities.find(c => {
            // console.log(`Comparing community id ${c._id} with order's community id: ${order.community_id}`)
            return c.value._id === order.community_id
          })
          if (!community) {
            // This order belongs to an unknown community
            return false
          }
          // @ts-ignore
          return community.value._id === this.selectedCommunity.value._id
        })
        .filter((order: Order) => {
          // @ts-ignore
          // If there is no order type filtering, just allow everything
          if (!this.selectedOrderType) return true
          // @ts-ignore
          return order.type.toLowerCase() === this.selectedOrderType.toLowerCase()
        })
        .filter((order: Order) => {
          // @ts-ignore
          // If there is not currency filtering, just allow everything
          if (!this.selectedCurrency) return true
          // @ts-ignore
          return order.fiat_code === this.selectedCurrency
        })
    }
  }
}
</script>
