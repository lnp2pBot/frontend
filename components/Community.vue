<template>
  <v-hover v-slot="{ hover }">
    <v-card
      v-ripple
      class="d-flex ma-1 flex-column justify-space-between"
      min-height="200"
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-title class="subtitle-2 d-flex justify-center">
        <u>
          {{ community.name}}
        </u>
      </v-card-title>
      <v-card-text>
      <p>
        <strong>Fee:</strong> {{ community.fee }} <br>
        <strong>Earnings:</strong> {{ community.earnings }} <br>
        <strong>Currencies:</strong> {{ community.currencies.join(', ')}} <br>
      </p>
        <strong>Dispute channel:</strong>
        <a :href="disputeChannel" target="_blank" rel="noopener noreferrer" class="caption">
          {{ community.dispute_channel }}
        </a>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['community'],
  computed: {
    disputeChannel(): string {
      return `https://t.me/${this.community.dispute_channel}`
    }
  }
})
</script>
<style scoped>
.v-card {
  transition: opacity .8s ease-in-out;
  cursor: pointer;
}

.v-card:not(.on-hover) {
  background-color: rgb(240, 240, 240);
}
.on-hover {
  background-color: white;
}
.v-card__title {
  padding: 0.5em;
}
</style>