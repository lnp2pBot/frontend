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
            <div>
              {{ fiatAmount }} {{ order.fiat_code }}
              <v-badge class="mx-2 my-0 py-0"
                offset-y="5"
                :color="getPriceMarginColor(order)"
                :content="(order.price_margin > 0 ? '+': '') + order.price_margin +'%'"
              >

              </v-badge>
            </div>
            <v-chip
              style="cursor: pointer"
              outlined
              :color="order.type === 'sell' ? 'red' : 'green'"
              small
            >
              {{ $t(order.type.toUpperCase()) }}
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
        {{ order.type === 'sell' ? $t('sellOrder') : $t('buyOrder') }}
      </v-card-title>
      <v-card-subtitle>{{ fiatAmount }} {{ order.fiat_code }}</v-card-subtitle>
      <div class="text-body1 ml-6 font-weight-bold">ID</div>
      <v-card-text>
        {{ order._id }}
      </v-card-text>
      <div class="text-body1 ml-6 font-weight-bold">{{ $t('description') }}</div>
      <v-card-text>
        <div>{{ summary }}</div>
        <div>{{ payment }}</div>
      </v-card-text>
      <div class="text-body1 ml-6 font-weight-bold">{{ $t('paymentMethod') }}</div>
      <v-card-text>
        {{ order.payment_method }}
      </v-card-text>
      <div class="text-body1 ml-6 font-weight-bold">{{ $t('history') }}</div>
      <v-card-text>
        <div>{{ succesfulOperations }}</div>
        <div>{{ rating }}</div>
      </v-card-text>
      <div class="text-body1 ml-6 font-weight-bold" v-if="hasCommunity"> {{ $t('community')}} </div>
      <v-card-text v-if="hasCommunity">
        <a :href="`https://t.me/${communityGroup}`" target="_blank noopener noreferrer">
          {{ communityName }}
        </a>
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
          {{ $t('close') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="green"
          @click="takeOrderClicked"
        >
          {{ order.type === 'sell' ? $t('toBuy') : $t('toSell') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Community, OrderChannel } from '~/store/communities'
import { Order, OrderType } from '~/store/orders'

// Color scale used to classify orders by attractiveness
const Colors = {
  STRONG_GREEN: '#57DC0B',
  LIGHT_GREEN: '#A0DC07',
  AMBER: '#D8C108',
  ORANGE: '#FC5E0A',
  STRONG_RED: '#FC0A0A'
}
export default Vue.extend({
  props: ['order'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    getPriceMarginColor(order: Order) {
      if (order.type === OrderType.BUY) {
        if (order.price_margin > 2) {
          return Colors.STRONG_GREEN
        } else if (order.price_margin > 1) {
          return Colors.LIGHT_GREEN
        } else if (order.price_margin > 0) {
          return Colors.AMBER
        } else if (order.price_margin > -1) {
          return Colors.ORANGE
        } else {
          return Colors.STRONG_RED
        }
      } else if (order.type === OrderType.SELL) {
        if (order.price_margin > 2) {
          return Colors.STRONG_RED
        } else if (order.price_margin > 1) {
          return Colors.ORANGE
        } else if (order.price_margin > 0) {
          return Colors.AMBER
        } else if (order.price_margin > -1) {
          return Colors.LIGHT_GREEN
        } else {
          return Colors.STRONG_GREEN
        }
      }
    },
    takeOrderClicked(e: any) {
      let url = ''
      // @ts-ignore
      const { community_id, type, tg_channel_message1 } = this.order
      if (!community_id) {
        url = `https://t.me/p2plightning/${tg_channel_message1}`
      } else {
        // @ts-ignore
        const community: Community = this.getCommunityById(community_id)
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
      // @ts-ignore
      if (this.order.fiat_amount) return this.order.fiat_amount
      // @ts-ignore
      return `${this.order.min_amount} - ${this.order.max_amount}`
    },
    summary() {
      // @ts-ignore
      return `${this.tradeOut} ${this.tradeIn}`
    },
    payment() {
      // @ts-ignore
      const lines = this.order.description.split('\n')
      const [ _, __, payment ] = lines
      return payment
    },
    tradeOut() {
      // @ts-ignore
      const lines = this.order.description.split('\n')
      const [ tradeOut ] = lines
      return tradeOut
    },
    tradeIn() {
      // @ts-ignore
      const lines = this.order.description.split('\n')
      const [ _, tradeIn ] = lines
      return tradeIn
    },
    succesfulOperations() {
      // @ts-ignore
      const lines = this.order.description.split('\n')
      return lines[3]
    },
    rating() {
      // @ts-ignore
      const lines = this.order.description.split('\n')
      return lines[lines.length - 2]
    },
    hasCommunity() {
      // @ts-ignore
      const community = this.getCommunityById(this.order.community_id)
      return community !== undefined
    },
    communityName() {
      // @ts-ignore
      const community = this.getCommunityById(this.order.community_id)
      return community.name
    },
    communityGroup() {
      // @ts-ignore
      const community = this.getCommunityById(this.order.community_id)
      return community.group.split('@')[1]
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