<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{on, attrs}">
      <v-list-item
        three-line
        link
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-space-between">
            {{ fiatAmount }} {{ order.fiat_code }}
            <v-chip
              style="cursor: pointer"
              outlined
              :color="order.type === 'sell' ? 'red' : 'green'"
              small
            >
              {{ order.type.toUpperCase() }}
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>{{ summary }}</v-list-item-subtitle>
          <v-list-item-subtitle class="d-flex justify-space-between">
            <div> {{ payment }} </div>
            <div>{{ rating }}</div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>
        {{ order.type === 'sell' ? 'Sell' : 'Buy '}} Order
      </v-card-title>
      <v-card-subtitle>{{ fiatAmount }} {{ order.fiat_code }}</v-card-subtitle>
      <div class="text-body1 ml-6 font-weight-bold">Description</div>
      <v-card-text>
        {{ order.description }}
      </v-card-text>
      <div class="text-body1 ml-6 font-weight-bold">Payment Method</div>
      <v-card-text>
        {{ order.payment_method }}
      </v-card-text>
      <v-divider class="mx-6 my-2"></v-divider>
      <creation-date
            :creationDate="order.created_at"
          />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="green darken-1"
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['order'],
  data() {
    const [
      tradeOut,
      tradeIn,
      payment,
      succesfulOperations,
      code,
      price,
      rating
    ] = this.order.description.split('\n')

    return {
      dialog: false,
      tradeIn,
      tradeOut,
      succesfulOperations,
      rating,
      payment
    }
  },
  computed: {
    fiatAmount() {
      if (this.order.fiat_amount) return this.order.fiat_amount
      return `${this.order.min_amount} - ${this.order.max_amount}`
    },
    summary() {
      return `${this.tradeOut} ${this.tradeIn}`
    }
   }
}
</script>