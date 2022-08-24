<template>
  <div>
    <template>
      <v-tabs v-model="tab" class="d-flex justify-center" fixed-tabs>
        <v-tab>Communities</v-tab>
        <v-tab>Orders</v-tab>
      </v-tabs>
      <search :onFilterChange="onFilterChange"/>
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
import { Order } from '~/store/orders'

enum Tabs {
  COMMUNITIES = 0,
  ORDERS = 1
}

export default {
  name: 'IndexPage',
  layout: 'main',
  data() {
    return {
      tab: 0
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
    }
  },
  computed: {
    ...mapState('orders', ['orders', 'filter']),
    ordersToDisplay(): Order[] {
      // @ts-ignore
      if (this.filter === '') {
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
    }
  }
}
</script>
