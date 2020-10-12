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
          to="/transaction">
          Transaction
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/viewtrans">
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
        <v-btn
          v-if="isUserLoggedIn"
          dark
          class="cyan"
          @click="AddTran">
          Add a trans
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import TransactionService from '@/services/TransactionService'
export default {

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    async AddTran () {
      try {
        this.bookmark = (await TransactionService.post({
          AccountId: this.account.id
        })).data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
