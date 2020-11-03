<template>
  <panel title="Waiting Queue">
    <v-data-table
    :headers="headers"
    :items="waiting"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  <v-btn
    dark
    class="cyan"
    @click="remove">
    Next Customer
  </v-btn>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import WaitingService from '@/services/WaitingService'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Transaction Type',
          value: 'trantype'
        },
        {
          text: 'Account#',
          value: 'accnumber'
        },
        {
          text: 'First Name',
          value: 'firstn'
        },
        {
          text: 'Last Name',
          value: 'lastn'
        },
        {
          text: 'Create At',
          value: 'createdAt'
        }
      ],
      waiting: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    this.waiting = (await WaitingService.index()).data
  },
  methods: {
    async remove () {
      try {
        await WaitingService.removeq()
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>

</style>
