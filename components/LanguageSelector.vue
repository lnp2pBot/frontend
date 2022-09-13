<template>
  <v-select class="language-selector"
    :value="language"
    :items="$i18n.locales"
    @change="onLocaleChange"
    item-text="icon"
    item-value="code"
    dense
    single-line
    outlined
  >
  </v-select>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      language: this.$i18n.locale
    }
  },
  methods: {
    onLocaleChange(locale: string) {
      // @ts-ignore
      const newPath = this.switchLocalePath(locale)
      // @ts-ignore
      this.$router.push(newPath)
    }
  }
})
</script>
<style scoped>
.language-selector {
  max-width: 6.5em;
  cursor: pointer;
}
</style>