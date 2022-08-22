<template>
  <v-container>
    <v-row>
      <v-col
        v-for="community in communities"
        cols="12"
        lg="3"
        md="6"
        sm="12"
        :key="community._id"
      >
        <community
          :community="community"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { Community } from '../store/communities'
export default Vue.extend({
  mounted() {
    this.$store.dispatch('communities/getCommunities')
    this.$store.dispatch('orders/getAllOrders')
  },
  computed: {
    communities(): Community[] {
      return this.$store.state.communities.communities
    }
  }
})
</script>