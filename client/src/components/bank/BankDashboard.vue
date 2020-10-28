<template>
  <v-layout column>
    <v-flex>
      <panel title="Dashboard">
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          to="/transactionreport">
          Transaction Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/viewtrans">
          Transfer Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/accountreport">
          Account Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/banksummary">
          Bank Summary
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
