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
      title="Debit Card Report"
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
        :items="debit"
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
  import DebitService from '@/services/DebitService'
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
            text: 'First Name',
            value: 'firstn',
          },
          {
            text: 'Last Name',
            value: 'lastn',
          },
          {
            text: 'License #',
            value: 'license',
          },
          {
            text: 'Phone #',
            value: 'phone',
          },
        ],
        debit: [],
        error: null,
        options: {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: true,
          title: 'Debit Report',
          useTextFile: false,
          useBom: true,
          headers: [
            'ID',
            'Transaction Type',
            'First Name',
            'Last Name',
            'Address',
            'City',
            'State',
            'Zip',
            'Phone Number',
            'License Number',
            'Account Number',
            'Created At',
            'Updated At',
          ],
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
        this.debit = (await DebitService.index()).data
        console.log('first account ', this.debit)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    methods: {
      async download () {
        const csvExporter = new ExportToCsv(this.options)
        csvExporter.generateCsv(this.debit)
      },
    },
  }
</script>

<style>

</style>
