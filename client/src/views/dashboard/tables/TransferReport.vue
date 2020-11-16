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
      title="Transfer Report"
      class="px-5 py-3"
    >
      <v-card-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transfer"
        :items-per-page="5"
        :search="search"
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
  import TransferService from '@/services/TransferService'
  import { ExportToCsv } from 'export-to-csv'
  export default {
    data () {
      return {
        search: '',
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
        error: null,
        options: {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: true,
          title: 'My Awesome CSV',
          useTextFile: false,
          useBom: true,
          headers: ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'],
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
      try {
        this.transfer = (await TransferService.index()).data
        console.log('first account ', this.transfer)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    methods: {
      async download () {
        const csvExporter = new ExportToCsv(this.options)
        csvExporter.generateCsv(this.transfer)
      },
    },
  }
</script>

<style>

</style>
