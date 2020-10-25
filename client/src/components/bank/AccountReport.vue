<template>
  <panel title="Accounts">
    <v-data-table
    :headers="headers"
    :items="accounts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import AccountService from '@/services/AccountService'
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
      accounts: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    this.accounts = (await AccountService.index()).data
    console.log('first account ', this.accounts)
  }
}
</script>

<style>

</style>
