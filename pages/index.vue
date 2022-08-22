<template>
  <div>
    <template>
      <v-tabs v-model="tab" class="d-flex justify-center" fixed-tabs>
        <v-tab>Communities</v-tab>
        <v-tab>Orders</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <communities/>
        </v-tab-item>
        <v-tab-item></v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'main',
  data() {
    return {
      tab: null
    }
  }
}
</script>
