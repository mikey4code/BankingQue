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
      title="Table on Dark Background"
      class="px-5 py-10"
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
        :items="accounts"
        :search="search"
        class="elevation-1"
      >
        <template
          v-slot:[`item.actions`]="{ item }"
        >
          <v-btn
            v-model="item.actions"
            class="ma-1"
            color="success"
            @click="navigateTo({name: 'account', params:{
              accountId: item.id
            }})"
          >
            View
          </v-btn>
        </template>
      </v-data-table>
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
  import AccountService from '@/services/AccountService'
  import { ExportToCsv } from 'export-to-csv'
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Transaction Type',
            align: 'left',
            sortable: false,
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
            text: 'Address',
            value: 'address',
          },
          {
            text: 'Phone #',
            value: 'phone',
          },
          {
            text: 'DOB',
            value: 'dob',
          },
          {
            text: 'Amount',
            value: 'amount',
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
          },
        ],
        accounts: [],
        error: null,
        options: {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: true,
          title: 'Account Report',
          useTextFile: false,
          useBom: true,
          headers: ['ID', 'Transaction Type', 'First Name', 'Last Name', 'Address', 'Phone Number', 'DOB', 'Amount', 'Account Numeber'],
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
        this.accounts = (await AccountService.index()).data
        console.log('first account ', this.accounts)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    methods: {
      navigateTo (route) {
        console.log('route ', route)
        this.$router.push(route)
      },
      async download () {
        const csvExporter = new ExportToCsv(this.options)
        csvExporter.generateCsv(this.accounts)
      },
    },
  }
</script>

<style>
</style>
