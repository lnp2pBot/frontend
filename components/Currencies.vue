<template>
  <v-row>
    <div class="d-flex justify-center">
      <v-avatar 
        v-for="currency in truncatedList"
        class="currency-avatar"
        :key="currency"
        color="teal"
        size="32"
      >
        <span class="white--text currency-symbol">{{ currency }}</span>
      </v-avatar>
      <v-avatar
        v-if="currencies.length > MAX_CURRENCIES"
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
  props: ['currencies', 'trucate'],
  data() {
    return {
      MAX_CURRENCIES: 5
    }
  },
  computed: {
    truncatedList() {
      // @ts-ignore
      return this.currencies.slice(0, this.MAX_CURRENCIES - 1)
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
}
</style>