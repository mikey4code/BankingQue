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
      title="Table on Dark Background"
      class="px-5 py-10"
    >
      <v-data-table
        :headers="headers"
        :items="accounts"
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
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import AccountService from '@/services/AccountService'
  export default {
    data () {
      return {
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
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
      ]),
    },
    async mounted () {
      this.accounts = (await AccountService.index()).data
      console.log('first account ', this.accounts)
    },
    methods: {
      navigateTo (route) {
        console.log('route ', route)
        this.$router.push(route)
      },
    },
  }
</script>

<style>
</style>
