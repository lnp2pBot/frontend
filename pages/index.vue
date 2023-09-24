<template>
  <div>
    <template>
        <div class="d-flex justify-center">
      </div>
      <v-container>
        <v-row>
          <v-col cols="12">
            <search :onFilterChange="onFilterChange"/>
          </v-col>
        </v-row>
        <v-row v-if="$vuetify.breakpoint.mobile">
          <v-col cols="12">
            <v-combobox
              v-if="selected === ORDERS"
              v-model="selectedCommunity"
              :items="communities"
              :hint="$t('communityHint')"
              solo
              clearable
              :label="$t('community')"
            >
            </v-combobox>
            <v-combobox
              @change="onCurrencyChange"
              v-model="selectedCurrency"
              :items="currencies"
              :hint="$t('currencyHint')"
              solo
              clearable
              :label="$t('currency')"
            >
            </v-combobox>
            <v-select
              v-if="selected === ORDERS"
              v-model="selectedOrderType"
              :items="orderTypes"
              :hint="$t('orderTypeHint')"
              solo
              clearable
              :label="$t('buySell')"
            />
            <v-select
              v-if="selected === COMMUNITIES"
              v-model="selectedSortingMethod"
              :items="sortBy"
              hint="Sort by"
              solo
              label="Sort by"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row v-if="!$vuetify.breakpoint.mobile"
          class="d-flex justify-center">
          <v-col cols="2" v-if="selected === ORDERS">
            <v-combobox

              v-model="selectedCommunity"
              :items="communities"
              :hint="$t('communityHint')"
              solo
              clearable
              :label="$t('community')"
            >
            </v-combobox>
          </v-col>
          <v-col cols="2">
            <v-combobox
              @change="onCurrencyChange"
              v-model="selectedCurrency"
              :items="currencies"
              :hint="$t('currencyHint')"
              solo
              clearable
              :label="$t('currency')"
            >
            </v-combobox>
          </v-col>
          <v-col cols="2" v-if="selected === ORDERS">
            <v-select
              prepend-icon="mdi-map"
              v-model="selectedOrderType"
              :items="orderTypes"
              :hint="$t('orderTypeHint')"
              solo
              clearable
              :label="$t('buySell')"
            >
            </v-select>
          </v-col>
          <v-col cols="2" v-if="selected === COMMUNITIES">
            <v-select
              v-model="selectedSortingMethod"
              :items="sortBy"
              hint="Sort by"
              solo
              clearable
              label="Sort by"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-tabs-items v-model="selected">
        <v-tab-item>
          <orders :orders="ordersToDisplay"/>
        </v-tab-item>
        <v-tab-item>
          <communities :sortingMethod="selectedSortingMethod"/>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Community } from '~/store/communities'
import { Order, OrderType } from '~/store/orders'
import { Tabs } from '~/store/tabs'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'main',
  // @ts-ignore
  data() {
    return {
      selectedCurrency: null,
      selectedOrderType: null,
      selectedCommunity: null,
      selectedSortingMethod: undefined,
      COMMUNITIES: Tabs.COMMUNITIES,
      ORDERS: Tabs.ORDERS
    }
  },
  mounted() {
    this.$store.dispatch('communities/getCommunities')
    this.$store.dispatch('orders/getAllOrders')
    this.onFilterChange('')
  },
  methods: {
    // @ts-ignore
    onFilterChange(val) {
      this.$store.dispatch('communities/setFilter', val)
      this.$store.dispatch('orders/setFilter', val)
    },
    onCurrencyChange(currency: string) {
      // @ts-ignore
      this.$store.dispatch('communities/setCurrency', currency)
    },
    sortByCreationDate: (c1: Community, c2: Community) =>
      new Date(c1.created_at).getTime() - new Date(c2.created_at).getTime(),
    sortByName: (c1: Community, c2: Community) =>
      c1.name.localeCompare(c2.name, undefined, { sensitivity: 'base' }) 
  },
  computed: {
    orderTypes: () => [
      OrderType.BUY.toUpperCase(),
      OrderType.SELL.toUpperCase()
    ],
    sortBy: function() {
      return [
      { text: 'Name', value: this.sortByName },
      { text: 'Creation Date', value: this.sortByCreationDate }
    ] 
    },
    ...mapState('orders', ['orders', 'filter']),
    ...mapState('tabs', ['selected']),
    ...mapState({
      // @ts-ignore
      communities: state => state.communities.communities.map(c => ({text: c.name, value: c})),
      // @ts-ignore
      currencies: state => {
        const currencyMap = {}
        // @ts-ignore
        state.orders.orders
          .map((order: Order) => order.fiat_code)
          .filter((fiatCode: string) => fiatCode !== undefined)
          // @ts-ignore
          .forEach((fiatCode: string) => currencyMap[fiatCode] = true)

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
})
</script>
