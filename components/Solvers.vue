<template>
  <div>
    <div class="text-h5 d-flex justify-center">Solvers</div>
    <div
      v-if="!community || !community.solvers || community.solvers.length === 0"
      class="text-subtitle-2 d-flex justify-center text--secondary font-weight-light"
    >
      No solvers ¯\_(ツ)_/¯
    </div>
    <div class="d-flex justify-center">
      <v-chip
      style="cursor:pointer"
      class="ma-2"
      color="indigo"
      text-color="white"
      v-for="solver in community.solvers"
      :key="solver.username"
      >
        <a :href="solverLink(solver.username)" target="_blank" rel="noopener noreferrer">
          @{{ solver.username }}
        </a>
      </v-chip>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['community'],
  methods: {
    solverLink(username: string) {
      if (!username) return ''
      return `https://t.me/${username}`
    }
  }
})
</script>
<style scoped>
  .v-chip a {
    color: white;
  }
  </style>
