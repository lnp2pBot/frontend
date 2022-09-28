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
  computed: {
    ...mapState('communities', ['filter']),
    ...mapState('communities', ['communities']),
    ...mapState('communities', ['selectedCurrency']),
    communitiesToDisplay(): Community[] {
      const sortMethod = (c1: Community, c2: Community) =>
        c1.name.localeCompare(c2.name)
      // @ts-ignore
      if (this.filter === '' && !this.selectedCurrency) {
        // Simple case, no filter has been set up
        // @ts-ignore
        return [...this.communities].sort(sortMethod)
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
        return communities.sort(sortMethod)
      }
      return communities
        .filter((community: Community) => {
          return community.currencies.find(c => {
            // @ts-ignore
            return c === this.selectedCurrency
          })
        })
        .sort(sortMethod)
    }
  }
})
</script>