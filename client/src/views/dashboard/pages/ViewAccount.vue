<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-alert
      v-if="error"
      type="error"
    >
      <span><h2> ERROR - {{ error }} </h2></span>
    </v-alert>
    <base-material-card
      color="success"
      dark
      icon="mdi-clipboard-plus"
      title="Account info"
      class="px-5 py-3"
    >
      {{ account.id }}
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import AccountService from '@/services/AccountService'
  import TransactionService from '@/services/TransactionService'
  import TransferService from '@/services/TransferService'
  import CreditService from '@/services/CreditService'
  import DebitService from '@/services/DebitService'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Transaction Type',
            value: 'trantype',
          },
          {
            text: 'Account#',
            value: 'accnumber',
          },
          {
            text: 'First Name',
            value: 'firstn',
          },
          {
            text: 'Last Name',
            value: 'lastn',
          },
          {
            text: 'Limit',
            value: 'limit',
          },
          {
            text: 'Income',
            value: 'income',
          },
        ],
        error: null,
        account: [],
        transaction: [],
        transfer: [],
        credit: [],
        debit: [],
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
      ]),
    },
    async mounted () {
      try {
        console.log(this.$store.state.user.id)
        const accountId = this.$store.state.route.params.accountId
        this.account = (await AccountService.showacc(accountId)).data
        console.log('account id fron', this.account.accnumber)

        // Show transaction of account by account Number
        this.transaction = (await TransactionService.showtran(this.account.accnumber))
        console.log(this.transaction)

        // Show transfer of account by account Number
        this.transfer = (await TransferService.showtransfer(this.account.accnumber))
        console.log('this', this.transfer)

        // Show transfer of account by account Number
        this.credit = (await CreditService.showcredit(this.account.accnumber))
        console.log(this.debit)

        // Show transfer of account by account Number
        this.debit = (await DebitService.showdebit(this.account.accnumber))
        console.log(this.credit)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
  }
</script>

<style>

</style>
