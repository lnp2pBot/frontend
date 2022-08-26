<template>
  <v-hover v-slot="{ hover }">
    <v-card
      v-ripple
      class="d-flex ma-1 flex-column justify-space-between"
      min-height="200"
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
      @click="handleClick"
    >
      <v-card-title class="subtitle-2 d-flex justify-center">
        <u>
          {{ community.name}}
        </u>
      </v-card-title>
      <v-card-text>
        <p>
          <strong>Orders:</strong> {{ getOrderCount }} <br>
        </p>
      </v-card-text>
      <currencies class="ml-4" :currencies="community.currencies"/>
      <v-card-text>
          <strong>Channel:</strong>
          <a :href="groupChannel" target="_blank" rel="noopener noreferrer" class="caption">
            {{ community.group }}
          </a>
        </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Community } from '../store/communities'
export default Vue.extend({
  props: {
    community: Object as PropType<Community>
  },
  computed: {
    groupChannel(): string {
      // @ts-ignore
      return `https://t.me/${this.community.group}`
    },
    getOrderCount() {
      return this.$store.getters['orders/getOrderCount'](this.community._id)
    },
  },
  methods: {
    handleClick() {
      // @ts-ignore
      this.$router.push(`/community/${this.community._id}`)
    },
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