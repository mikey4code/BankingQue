<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

    <base-material-card
      color="success"
      dark
      icon="mdi-clipboard-plus"
      title="Transaction Report"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="transaction"
        :items-per-page="5"
        class="elevation-1"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import TransactionService from '@/services/TransactionService'
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
            text: 'Phone #',
            value: 'phone',
          },
          {
            text: 'Amount',
            value: 'amount',
          },
        ],
        transaction: [],
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
      ]),
    },
    async mounted () {
      this.transaction = (await TransactionService.index()).data
      console.log('first account ', this.transaction)
    },
  }
</script>

<style>

</style>
