<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Balance Summary">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import BalanceSummary from '@/services/BalanceSummaryService'
export default {
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await BalanceSummary.index()).data
  }
}
</script>

<style scoped>
</style>
