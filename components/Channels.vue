<template>
  <v-card outlined class="pa-4">
    <v-card-title>Channels</v-card-title>
    <v-card-text>
      <div>Bot</div>
      <div>
        <a :href="groupLink(community.group)" target="_blank" rel="noopener noreferrer">
          {{ community.group }}
        </a>
      </div>
    </v-card-text>
    <v-card-text>
      <div>Orders</div>
      <div v-for="(channel, index) in community.order_channels" :key="index">
        <a :href="groupLink(channel.name)" target="_blank" rel="noopener noreferrer">
          {{ channel.name }}
        </a>
        - ({{ channel.type }})
      </div>
    </v-card-text>
    <v-card-text>
      <div>Dispute</div>
      <div>
        <a :href="groupLink(community.dispute_channel)" target="_blank" rel="noopener noreferrer">
          {{ community.dispute_channel }}
        </a>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['community'],
  methods: {
    groupLink(name: string) {
      if (!name) return ''
      return `https://t.me/${name.split('@')[1]}`
    }
  }
})
</script>