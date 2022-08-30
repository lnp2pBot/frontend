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
        v-if="truncate && currencies.length > MAX_CURRENCIES"
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
  data() {
    return {
      MAX_CURRENCIES: 5
    }
  },
  computed: {
    displayList() {
      if (this.truncate) {
        // @ts-ignore
        return this.currencies.slice(0, this.MAX_CURRENCIES - 1)
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