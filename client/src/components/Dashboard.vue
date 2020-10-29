<template>
  <v-layout column>
    <v-flex>
      <panel title="Dashboard">
        <br>
        <div class="danger-alert" v-html="error"/>
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
          to="/transfer">
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
          to="/debit">
          New Debit
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/credit">
          New Credit
        </v-btn>
        <v-btn
          dark
          class="cyan"
          @click="BalanceSummary">
          Balance Summary
        </v-btn>
        <v-btn
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
import TransacHisService from '@/services/TransacHisService'
export default {

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    async AddTran () {
      try {
        console.log(this.$store.state.user.id)
        const tran = (await TransacHisService.post({
          UserId: this.$store.state.user.id
        })).data
        console.log('here', tran)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
