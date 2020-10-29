<template>
  <panel title="Credit Report">
    <v-data-table
    :headers="headers"
    :items="credit"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import CreditService from '@/services/CreditService'
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
      credit: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    this.credit = (await CreditService.index()).data
    console.log('first account ', this.credit)
  }
}
</script>

<style>

</style>
