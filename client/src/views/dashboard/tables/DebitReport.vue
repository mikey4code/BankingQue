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
      title="Debit Card Report"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="debit"
        :items-per-page="5"
        class="elevation-1"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
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
            text: 'Phone #',
            value: 'phone',
          },
        ],
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
      this.debit = (await DebitService.index()).data
      console.log('first account ', this.debit)
    },
  }
</script>

<style>

</style>
