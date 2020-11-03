<template>
  <v-layout column>
    <v-flex>
      <panel title="Dashboard">
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          to="/transactionreport">
          Transaction Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/transferreport">
          Transfer Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/accountreport">
          Account Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/debitreport">
          Debit Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/creditreport">
          Credit Report
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/banksummary">
          Bank Summary
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
// import TransacHisService from '@/services/TransacHisService'
export default {

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
