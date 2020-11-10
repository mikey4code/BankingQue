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
        <template slot-scope="props">
          <td>{{ props.amount }}</td>
          <td class="text-right">
            {{ items.amount }}
          </td>
          <td class="text-right">
            {{ props.item.first }}
          </td>
          <td class="text-right">
            {{ props.item.lastn }}
          </td>
          <td class="text-right">
            {{ props.item.address }}
          </td>
          <td class="text-right">
            {{ props.item.phone }}
          </td><td class="text-right">
            {{ props.item.dob }}
          </td><td class="text-right">
            {{ props.item.amount }}
          </td>
          <td class="justify-center layout px-0">
            <v-btn
              class="ma-1"
              color="success"
              @click="navigateTo({name: 'account', params:{
                accountId: account.id
              }})"
            >
              View
            </v-btn>
          </td>
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
            value: 'name',
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
