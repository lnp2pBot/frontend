<template>
  <div class="d-flex justify-center align-center flex-column">
    <div class="d-flex justify-center text-overline font-weight-bold">{{ $t('timeLeft') }}</div>
    <v-progress-circular
      v-if="hasTimeLeft"
      :rotate="-90"
      :size="21"
      :width="10"
      :value="timeLeftValue"
      color="primary"
    >
    </v-progress-circular>
    <div v-if="hasTimeLeft" class="text-caption">
      {{timeLeftHours}}h {{timeLeftMinutes}}m {{timeLeftSeconds}}s
    </div>
    <div v-if="!hasTimeLeft" class="text-caption">{{ $t('orderExpired') }}</div>
    <div v-if="!hasTimeLeft" class="text-caption">😔</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { DateTime, Duration, Interval, DurationLikeObject } from 'luxon'

const ORDER_DURATION_HOURS = 23
const ORDER_DURATION_MINUTES = ORDER_DURATION_HOURS * 60

export default Vue.extend({
  props: {
    creationDate: {
      type: String
    }
  },
  created() {
    // @ts-ignore
    if (this.timer === null) {
      // @ts-ignore
      this.timer = setInterval(() => {
        this.secondsRemaining = this.timeLeft('seconds')
      }, 1e3)
    }
  },
  data() {
    return {
      // @ts-ignore
      secondsRemaining: this.timeLeft('seconds'),
      timer: null
    }
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    timeLeft(unit: keyof DurationLikeObject) {
      // @ts-ignore
      const creation = DateTime.fromISO(
        this.creationDate.split('.')[0], { zone: 'utc' }
      )
      const now = DateTime.now()
      const expiration = creation.plus(
        Duration.fromObject({
          hours: ORDER_DURATION_HOURS
        })
      )
      const interval = Interval.fromDateTimes(now, expiration)
      if (!interval.isValid) return ''
      const timeLeft = interval.toDuration(unit)
      return timeLeft.as(unit).toFixed(0)
    },
  },
  computed: {
    hasTimeLeft() {
      // @ts-ignore
      return this.secondsRemaining > 0
    },
    timeLeftValue() {
      // @ts-ignore
      const timeLeftMin = this.secondsRemaining / 60
      const ratio = timeLeftMin / ORDER_DURATION_MINUTES
      return ratio * 100
    },
    timeLeftHours() {
      // @ts-ignore
      return this.timeLeft('hours')
    },
    timeLeftMinutes() {
      // @ts-ignore
      const minutes = (this.secondsRemaining / 60) % 60
      const duration = Duration.fromObject({minutes})
      return duration.toFormat('mm')
    },
    timeLeftSeconds() {
      // @ts-ignore
      const seconds = this.secondsRemaining % 60
      const duration = Duration.fromObject({seconds})
      return duration.toFormat('ss')
    }
  }
})
</script>