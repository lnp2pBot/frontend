<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <template v-slot:extension>
        <v-tabs @change="onTabSelected" class="d-flex justify-center" fixed-tabs centered>
          <v-tab>Communities</v-tab>
          <v-tab>Orders</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import { Tabs } from '~/store/tabs'
export default Vue.extend({
  data() {
    return {
      title: 'LNP2PBot Market'
    }
  },
  methods: {
    onTabSelected(selected: Tabs) {
      this.$store.dispatch('tabs/setTab', selected)
    }
  }
})
</script>