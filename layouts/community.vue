<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-btn
        icon
        @click.stop="onBackClicked"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
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
import { mapState } from 'vuex'
export default Vue.extend({
  mounted() {
    const communityId = this.$route.params.id
    this.$store.dispatch('communities/setSelectedCommunity', communityId)
  },
  methods: {
    onBackClicked() {
      this.$router.back()
    }
  },
  computed: mapState({
    title: (state: any) => state.communities.selectedCommunity.name
  })
})
</script>