<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Dashboard">
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="Transaction">
          Transaction
        </v-btn>
        <v-btn
          dark
          class="cyan"
          @click="Transfer">
          Transfer
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/newaccount">
          New Account
        </v-btn>
        <v-btn
          dark
          class="cyan"
          @click="BalanceSummary">
          Balance Summary
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
// import BalanceSummaryService from '@/services/BalanceSummaryService'
export default {
}
</script>

<style scoped>
</style>
