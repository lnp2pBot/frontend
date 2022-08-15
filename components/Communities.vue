<template>
  <div>
    List of communities
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    console.log('Communities has been mounted')
    this.$store.dispatch('communities/getCommunities')
    // this.$store.dispatch('fetchThings')
  }
})
</script>