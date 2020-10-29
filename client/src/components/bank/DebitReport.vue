<template>
  <panel title="Transaction Report">
    <v-data-table
    :headers="headers"
    :items="debit"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import DebitService from '@/services/DebitService'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Transaction Type',
          value: 'trantype'
        },
        {
          text: 'Account#',
          value: 'accnumber'
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
      debit: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    this.debit = (await DebitService.index()).data
    console.log('first account ', this.debit)
  }
}
</script>

<style>

</style>
