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
            <div class="payment text-truncate"> {{ payment }} </div>
            <div class="rating"> {{ rating }} </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title class="font-weight-bold">
        {{ order.type === 'sell' ? 'Sell' : 'Buy '}} Order
      </v-card-title>
      <v-card-subtitle>{{ fiatAmount }} {{ order.fiat_code }}</v-card-subtitle>
      <div class="text-body1 ml-6 font-weight-bold">Description</div>
      <v-card-text>
        <div>{{ summary }}</div>
        <div>{{ payment }}</div>
      </v-card-text>
      <div class="text-body1 ml-6 font-weight-bold">Payment Method</div>
      <v-card-text>
        {{ order.payment_method }}
      </v-card-text>
      <div class="text-body1 ml-6 font-weight-bold">History</div>
      <v-card-text>
        <div>{{ succesfulOperations }}</div>
        <div>{{ rating }}</div>
      </v-card-text>
      <v-divider class="mx-6 my-2"></v-divider>
      <creation-date
            :creationDate="order.created_at"
          />
      <v-card-actions>
        <v-btn
          text
          color="red darken-1"
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="green"
          @click="takeOrderClicked"
        >
          {{ order.type === 'sell' ? 'BUY' : 'SELL' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Community, OrderChannel } from '~/store/communities'
export default Vue.extend({
  props: ['order'],
  data() {
    const lines = this.order.description.split('\n')
    const [
      tradeOut,
      tradeIn,
      payment,
      succesfulOperations
    ] = lines
    let rating = lines[lines.length - 2]
    if (rating.indexOf('⭐') === -1) rating = ''
    return {
      dialog: false,
      tradeIn,
      tradeOut,
      succesfulOperations,
      rating,
      payment
    }
  },
  methods: {
    takeOrderClicked(e: any) {
      const { community_id, type, tg_channel_message1 } = this.order
      // @ts-ignore
      const community: Community = this.getCommunityById(community_id)
      let url = ''
      if (community.order_channels.length === 1) {
        const channel = community.order_channels[0]
        // @ts-ignore
        url = this.groupLink(channel.name, tg_channel_message1)
      } else {
        const channel = community.order_channels.find((c: OrderChannel) => {
          return type === c.type
        })
        // @ts-ignore
        url = this.groupLink(channel.name, tg_channel_message1)
      }
      window.open(url, '_blank noopener noreferrer')
    },
    groupLink(name: string, message: string) {
      if (!name) return ''
      return `https://t.me/${name.split('@')[1]}/${message}`
    }
  },
  computed: {
    fiatAmount() {
      if (this.order.fiat_amount) return this.order.fiat_amount
      return `${this.order.min_amount} - ${this.order.max_amount}`
    },
    summary() {
      // @ts-ignore
      return `${this.tradeOut} ${this.tradeIn}`
    },
    ...mapGetters('communities', ['getCommunityById'])
  }
})
</script>
<style scoped>
  .payment {
    max-width: 80%;
  }
  .rating {
    min-width: 9em;
    text-align: right;
  }
</style>