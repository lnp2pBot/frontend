<template>
  <div>
    <div class="text-h3 d-flex justify-center">Communities</div>
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
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Community } from '../store/communities'
export default Vue.extend({
  mounted() {
    this.$store.dispatch('communities/getCommunities')
  },
  computed: {
    communities(): Community[] {
      return this.$store.state.communities.communities
    }
  }
})
</script>