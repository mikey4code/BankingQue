<template>
  <v-layout>
    <v-flex offset-md2 blue>
      <panel title="New Account">
        <form name="tab-tracker-form"
              autocomplete="off">
          <v-text-field label="Transaction Type"
              required
              :rules="[required]"
              v-model="account.trantype"></v-text-field>
          <br>
          <v-text-field label="First Name"
              required
              :rules="[required]"
              v-model="account.firstn"></v-text-field>
            <v-text-field label="Last Name"
              required
              :rules="[required]"
              v-model="account.lastn"></v-text-field>
            <v-text-field label="Address"
              required
              :rules="[required]"
              v-model="account.address"></v-text-field>
            <v-text-field label="Phone Number"
              required
              :rules="[required]"
              v-model="account.phone"></v-text-field>
            <v-text-field label="Date Of Birth"
              required
              :rules="[required]"
              v-model="account.dob"></v-text-field>
        </form>
        <br>
         <div class="danger-alert" v-if="error">
            {{error}}
        </div>
        <br>
        <v-btn dark
          class="cyan"
          @click="create">
          CREATE ACCOUNT
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import TransacHisService from '@/services/TransacHisService'
import AccountService from '@/services/AccountService'
export default {
  data () {
    return {
      account: {
        trantype: null,
        firstn: null,
        lastn: null,
        address: null,
        phone: null,
        dob: null
      },
      accountdata: {},
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
        .keys(this.account)
        .every(key => !!this.account[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        this.account.amount = 0
        this.account.UserId = this.$store.state.user.id
        this.account.accnumber = 56325
        console.log('created account ', this.account)
        const check = (await AccountService.post(this.account)).data
        console.log(check)
        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
      try {
        this.accountdata = (await AccountService.show({
          accnumber: this.account.accnumber})).data
        console.log('result ', this.accountdata.id)
        const tran = (await TransacHisService.post({
          UserId: this.$store.state.user.id,
          AccountId: this.accountdata.id
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
