<template>
  <div>
    <template>
      <v-tabs v-model="tab" class="d-flex justify-center" fixed-tabs>
        <v-tab>Communities</v-tab>
        <v-tab>Orders</v-tab>
      </v-tabs>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col xs="12" md="6" xl="4">
            <v-text-field
              @input="onFilterChange"
              class="px-5 mt-5"
              solo
              rounded
              prepend-inner-icon="mdi-magnify"
              hint="Works for both orders or communities"
              label="Enter search term"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <communities/>
        </v-tab-item>
        <v-tab-item>
          <orders :orders="orders"/>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'

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
          console.log('Would filter orders')
          return
      }
    }
  },
  computed: {
    ...mapState('orders', ['orders'])
  }
}
</script>
