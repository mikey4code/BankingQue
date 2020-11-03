<template>
  <panel title="View Report">
    <v-data-table
    :headers="headers"
    :items="account"
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
          text: 'Account#',
          value: 'accnumber'
        },
        {
          text: 'Recipient',
          value: 'recipn'
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
          text: 'Amount',
          value: 'amount'
        }
      ],
      account: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    const accountId = this.$store.state.route.params.accountId
    this.account = (await AccountService.showacc(accountId)).data
  }
}
</script>

<style>

</style>
