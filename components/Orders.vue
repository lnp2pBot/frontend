<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="orders && orders.length > 0">
          <v-list three-line>
            <div v-for="(order, index) in orders" :key="order.id">
              <order-details :order="order"/>
              <v-divider v-if="index !== orders.length - 1"></v-divider>
            </div>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    orders: {
      type: Array,
      default: []
    }
  }
})
</script>