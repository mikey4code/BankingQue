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
      title="Transfer Report"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="transfer"
        :items-per-page="5"
        class="elevation-1"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import TransferService from '@/services/TransferService'
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
            text: 'Recipient',
            value: 'recipn',
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
            text: 'Amount',
            value: 'amount',
          },
        ],
        transfer: [],
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
      ]),
    },
    async mounted () {
      this.transfer = (await TransferService.index()).data
      console.log('first account ', this.transfer)
    },
  }
</script>

<style>

</style>
