<template>
  <div>
    <div class="text-h5 d-flex justify-center">{{ $t('creator') }}</div>
    <div
      v-if="!creator && !error"
      class="d-flex justify-center ma-3"
    >
      <v-progress-circular
        indeterminate
        :size="20"
        color="amber"
      >
      </v-progress-circular>
    </div>
    <div v-else-if="error" class="d-flex justify-center flex-column align-center">
      <v-icon
        large
        color="red"
      >
        mdi-alert-octagon
      </v-icon>
      <div class="text-caption text--disabled">{{ $t('creatorError') }}</div>
    </div>
    <div v-else class="d-flex justify-center">
      <v-chip
        style="cursor:pointer"
        class="ma-2"
        color="orange"
        text-color="white"
      >
        <a :href="solverLink(creator.username)" target="_blank" rel="noopener noreferrer">
            @{{ creator.username }}
        </a>
      </v-chip>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
export default Vue.extend({
  props: ['creator', 'error'],
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
