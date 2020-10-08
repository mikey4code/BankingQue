<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
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
import NewAccountService from '@/services/NewAccountService'
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
        error: null,
        required: (values) => !!values || 'Required.'
  
    }
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
        await NewAccountService.post(this.account)
        // this.$store.dispatch('setToken', response.data.token)
        // this.$store.dispatch('setUser', response.data.user)
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
