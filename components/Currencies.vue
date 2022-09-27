<template>
  <v-row class="d-flex justify-center mx-2">
    <div>
      <v-avatar 
        v-for="currency in displayList"
        class="currency-avatar"
        :key="currency"
        color="teal"
        size="32"
      >
        <span class="white--text currency-symbol">{{ currency }}</span>
      </v-avatar>
      <v-avatar
        v-if="truncate && currencies.length > maxCurrencies"
        class="currency-avatar"
        color="teal"
        size="32"
      >
        <span class="white--text currency-symbol">...</span>
      </v-avatar>
    </div>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    currencies: {
      type: Array,
      default: () => []
    },
    truncate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    maxCurrencies() {
      // @ts-ignore
      const breakpoint = this.$vuetify.breakpoint.name
      switch (breakpoint) {
        case 'xl':
        case 'lg':
          return 5
        case 'md':
        case 'sm':
        case 'xs':
          return 3
      }
    },
    displayList() {
      if (this.truncate) {
        // @ts-ignore
        return this.currencies.slice(0, this.maxCurrencies - 1)
      } else {
        return this.currencies
      }
    }
  }
})
</script>
<style scoped>
.currency-symbol {
  font-size: 0.6em;
}
.currency-avatar {
  margin: 1px;
  cursor: pointer;
}
</style>