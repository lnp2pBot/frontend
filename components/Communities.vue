<template>
  <v-container>
    <v-row>
      <v-col
        v-for="community in communitiesToDisplay"
        lg="3"
        md="6"
        sm="6"
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
import { mapState } from 'vuex'
import { Community } from '../store/communities'
export default Vue.extend({
  mounted() {
    this.$store.dispatch('communities/getCommunities')
    this.$store.dispatch('orders/getAllOrders')
  },
  computed: {
    ...mapState('communities', ['filter']),
    ...mapState('communities', ['communities']),
    ...mapState('communities', ['selectedCurrency']),
    communitiesToDisplay(): Community[] {
      console.log('communities to display')
      if (this.filter === '' && !this.selectedCurrency) {
        // Simple case, no filter has been set up
        return this.$store.state.communities.communities
      }
      // Applying filters
      let communities = this.communities
        .filter((community: Community) => {
          const nameCriteria = community.name
            .toLowerCase()
            .includes(this.filter)
          const currencyCriteria = community.currencies
            .join(',')
            .toLowerCase()
            .includes(this.filter)
          return nameCriteria || currencyCriteria
        })
      if (!this.selectedCurrency) {
        return communities
      }
      return communities
        .filter((community: Community) => {
          return community.currencies.find(c => {
            return c === this.selectedCurrency
          })
        })
    }
  }
})
</script>