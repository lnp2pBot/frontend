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
  props: {
    sortingMethod: {
      type: Function,
      default: (c1: Community, c2: Community) => {
        return new Date(c1.created_at).getTime() - new Date(c2.created_at).getTime()
      }
    }
  },
  computed: {
    ...mapState('communities', ['filter']),
    ...mapState('communities', ['communities']),
    ...mapState('communities', ['selectedCurrency']),
    communitiesToDisplay(): Community[] {
      console.log('this.sortingMethod: ', this.sortingMethod)
      // @ts-ignore
      const clonedCommunities: Community[] = JSON.parse(JSON.stringify(this.communities))
      // @ts-ignore
      if (this.filter === '' && !this.selectedCurrency) {
        // Simple case, no filter has been set up
        return [
          // @ts-ignore
          ...clonedCommunities.sort(this.sortingMethod ?? undefined)
        ]
      }
      // Applying filters
      // @ts-ignore
      let communities = clonedCommunities
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
        // @ts-ignore
        return communities.sort(this.sortingMethod ?? undefined)
      }
      return communities
        .filter((community: Community) => {
          return community.currencies.find(c => {
            // @ts-ignore
            return c === this.selectedCurrency
          })
        })
        // @ts-ignore
        .sort(this.sortingMethod ?? undefined)
    }
  }
})
</script>