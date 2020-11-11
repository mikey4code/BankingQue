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
    <v-col
      cols="12"
      class="text-right"
    >
      <v-btn
        color="success"
        class="mr-0"
        @click="download"
      >
        Download
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import TransactionService from '@/services/TransactionService'
  import { ExportToCsv } from 'export-to-csv'
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
        options: {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: true,
          title: 'My Awesome CSV',
          useTextFile: false,
          useBom: true,
          headers: ['Column 1', 'Column 2'],
        },
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
    methods: {
      async download () {
        const csvExporter = new ExportToCsv(this.options)
        csvExporter.generateCsv(this.transaction)
      },
    },
  }
</script>

<style>

</style>
