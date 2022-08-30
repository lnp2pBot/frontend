<template>
  <div v-if="creationDate">
    <div class="d-flex justify-center text-overline font-weight-bold">Creation Date</div>
    <div class="d-flex justify-center text-caption">
      {{ formattedCreationDate }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'
export default Vue.extend({
  props: {
    creationDate: {
      type: String
    }
  },
  computed: {
    formattedCreationDate() {
      const date = DateTime.fromISO(this.creationDate.split('.')[0])
      return date.toLocaleString()
    }
  }
})
</script>