<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <div class="mt-5">
        <language-selector/>
      </div>
      <template v-slot:extension>
        <v-tabs @change="onTabSelected" class="d-flex justify-center" fixed-tabs centered>
          <v-tab>{{ $t('communities') }} </v-tab>
          <v-tab>{{ $t('orders') }} </v-tab>
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
      <v-spacer></v-spacer>
      <div class="text-caption text--secondary">v{{version}}</div>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import pkg from '../package.json'
import { Tabs } from '~/store/tabs'
export default Vue.extend({
  data() {
    return {
      title: 'LNP2PBot Market',
      version: pkg.version
    }
  },
  methods: {
    onTabSelected(selected: Tabs) {
      this.$store.dispatch('tabs/setTab', selected)
    }
  }
})
</script>