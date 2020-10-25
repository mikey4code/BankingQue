<template>
  <v-layout>
    <v-flex offset-md2 blue>
      <panel title="New Account">
        <form name="tab-tracker-form"
              autocomplete="off">
          <v-text-field label="First Name"
              required
              :rules="[required]"
              v-model="transfer.firstn"></v-text-field>
            <v-text-field label="Last Name"
              required
              :rules="[required]"
              v-model="transfer.lastn"></v-text-field>
            <v-text-field label="Account Number"
              required
              :rules="[required]"
              v-model="transfer.accountn"></v-text-field>
            <v-text-field label="Recipicant Account Number"
              required
              :rules="[required]"
              v-model="transfer.repcipn"></v-text-field>
            <v-text-field label="Amount"
              required
              :rules="[required]"
              v-model="transfer.amount"></v-text-field>
        </form>
        <br>
         <div class="danger-alert" v-if="error">
            {{error}}
        </div>
        <br>
        <v-btn dark
          class="cyan"
          @click="create">
          CREATE TRANSFER
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import TransactionService from '@/services/TransactionService'
// import NewAccountService from '@/services/NewAccountService'
export default {
  data () {
    return {
      transfer: {
        firstn: null,
        lastn: null,
        accountn: null,
        repcipn: null,
        amount: null
      },
      error: null,
      required: (values) => !!values || 'Required.'
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.transaction)
        .every(key => !!this.transaction[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await TransactionService.post(this.transaction)
        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
