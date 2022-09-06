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
      // @ts-ignore
      if (this.filter === '' && !this.selectedCurrency) {
        // Simple case, no filter has been set up
        return this.$store.state.communities.communities
      }
      // Applying filters
      // @ts-ignore
      let communities = this.communities
        .filter((community: Community) => {
          const nameCriteria = community.name
            .toLowerCase()
            // @ts-ignore
            .includes(this.filter)
          const currencyCriteria = community.currencies
            .join(',')
            .toLowerCase()
            // @ts-ignore
            .includes(this.filter)
          return nameCriteria || currencyCriteria
        })
      // @ts-ignore
      if (!this.selectedCurrency) {
        return communities
      }
      return communities
        .filter((community: Community) => {
          return community.currencies.find(c => {
            // @ts-ignore
            return c === this.selectedCurrency
          })
        })
    }
  }
})
</script>