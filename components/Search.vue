<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col xs="12" md="6" xl="4">
        <v-text-field
          @input="onFilterChange"
          class="px-5 mt-5"
          solo
          rounded
          prepend-inner-icon="mdi-magnify"
          :hint="$t('searchHint')"
          :label="$t('searchLabel')"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    onFilterChange: {
      type: Function,
      required: true
    }
  }
})
</script>