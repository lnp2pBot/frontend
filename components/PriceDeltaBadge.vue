<template>
  <v-badge v-if="order.price_from_api"
    class="mx-2 my-0 py-0"
    offset-y="5"
    :color="getPriceMarginColor(order)"
    :content="(order.price_margin > 0 ? '+': '') + order.price_margin +'%'"
  >
  </v-badge>
</template>
<script lang="ts">
import Vue from 'vue'
import { Order, OrderType } from '~/store/orders'

// Color scale used to classify orders by attractiveness
const Colors = {
  STRONG_GREEN: '#57DC0B',
  LIGHT_GREEN: '#A0DC07',
  AMBER: '#D8C108',
  ORANGE: '#FC5E0A',
  STRONG_RED: '#FC0A0A'
}

export default Vue.extend({
  props: ['order'],
  methods: {
    getPriceMarginColor(order: Order) {
      if (order.type === OrderType.BUY) {
        if (order.price_margin > 2) {
          return Colors.STRONG_GREEN
        } else if (order.price_margin > 1) {
          return Colors.LIGHT_GREEN
        } else if (order.price_margin > 0) {
          return Colors.AMBER
        } else if (order.price_margin > -1) {
          return Colors.ORANGE
        } else {
          return Colors.STRONG_RED
        }
      } else if (order.type === OrderType.SELL) {
        if (order.price_margin > 2) {
          return Colors.STRONG_RED
        } else if (order.price_margin > 1) {
          return Colors.ORANGE
        } else if (order.price_margin > 0) {
          return Colors.AMBER
        } else if (order.price_margin > -1) {
          return Colors.LIGHT_GREEN
        } else {
          return Colors.STRONG_GREEN
        }
      }
    }
  }
})
</script>