<template>
  <v-layout>
    <v-flex offset-md2 blue>
      <panel title="Transaction">
        <form name="tab-tracker-form"
              autocomplete="off">
          <v-text-field label="Transaction Type"
              required
              :rules="[required]"
              v-model="transaction.trantype"></v-text-field>
          <br>
          <v-text-field label="Account Number"
              required
              :rules="[required]"
              v-model="transaction.accnumber"></v-text-field>
          <v-text-field label="First Name"
              required
              :rules="[required]"
              v-model="transaction.firstn"></v-text-field>
            <v-text-field label="Last Name"
              required
              :rules="[required]"
              v-model="transaction.lastn"></v-text-field>
            <v-text-field label="Phone Number"
              required
              :rules="[required]"
              v-model="transaction.phone"></v-text-field>
            <v-text-field label="Amount"
              required
              :rules="[required]"
              v-model="transaction.amount"></v-text-field>
        </form>
        <br>
         <div class="danger-alert" v-if="error">
            {{error}}
        </div>
        <br>
        <v-btn dark
          class="cyan"
          @click="create">
          CREATE TRANSACTION
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import TransactionService from '@/services/TransactionService'
import TransacHisService from '@/services/TransacHisService'
import AccountService from '@/services/AccountService'
export default {
  data () {
    return {
      transaction: {
        trantype: null,
        firstn: null,
        lastn: null,
        phone: null,
        amount: null,
        accnumber: null
      },
      accountdata: {},
      transactiondata: {},
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
        this.transaction.UserId = this.$store.state.user.id
        this.accountdata = (await AccountService.show({
          accnumber: this.transaction.accnumber})).data
        this.transaction.AccountId = this.accountdata.id
        await TransactionService.post(this.transaction)
        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
      try {
        console.log('whats thisnumber ', this.transaction.accnumber)
        // get the account ID using the accnumber
        console.log('result ', this.accountdata)
        // This get the transaction
        this.transactiondata = (await TransactionService.show()).data
        console.log('this tran', this.transactiondata)
        const tran = (await TransacHisService.post({
          UserId: this.$store.state.user.id,
          AccountId: this.accountdata.id,
          TransactionId: this.transactiondata.id
        })).data
        console.log('here', tran)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
