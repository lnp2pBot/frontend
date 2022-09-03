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
      <a :href="'http://t.me/jhonsu777'" target="_blank" rel="noopener noreferrer">
        <v-chip
          style="cursor:pointer"
          class="ma-2"
          color="indigo"
          text-color="white"
          v-for="solver in community.solvers"
          :key="solver.username"
        >
          @{{ solver.username }}
        </v-chip>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['community']
})
</script>