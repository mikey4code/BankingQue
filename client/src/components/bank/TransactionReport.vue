<template>
  <panel title="Accounts">
    <v-data-table
    :headers="headers"
    :items="transaction"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import TransactionService from '@/services/TransactionService'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Transaction Type',
          value: 'trantype'
        },
        {
          text: 'First Name',
          value: 'firstn'
        },
        {
          text: 'Last Name',
          value: 'lastn'
        },
        {
          text: 'Phone #',
          value: 'phone'
        },
        {
          text: 'Amount',
          value: 'amount'
        }
      ],
      transaction: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    this.transaction = (await TransactionService.index()).data
    console.log('first account ', this.transaction)
  }
}
</script>

<style>

</style>
