<template>
  <panel title="Bank Summary">
    <v-data-table
    :headers="headers"
    :items="transactions"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import TransacHisService from '@/services/TransacHisService'
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
          text: 'Account Number',
          value: 'accnumber'
        },
        {
          text: 'Address',
          value: 'address'
        },
        {
          text: 'Phone #',
          value: 'phone'
        },
        {
          text: 'DOB',
          value: 'dob'
        }
      ],
      transactions: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.transactions = (await TransacHisService.index()).data
      console.log('first account ', this.transactions)
    }
  }
}
</script>

<style>

</style>
