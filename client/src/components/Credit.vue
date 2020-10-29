<template>
  <v-layout>
    <v-flex offset-md2 blue>
      <panel title="Credit">
        <form name="tab-tracker-form"
              autocomplete="off">
          <v-text-field label="Transaction Type"
              required
              :rules="[required]"
              v-model="credit.trantype"></v-text-field>
          <v-text-field label="First Name"
              required
              :rules="[required]"
              v-model="credit.firstn"></v-text-field>
            <v-text-field label="Last Name"
              required
              :rules="[required]"
              v-model="credit.lastn"></v-text-field>
            <v-text-field label="Address"
              required
              :rules="[required]"
              v-model="credit.address"></v-text-field>
            <v-text-field label="Phone"
              required
              :rules="[required]"
              v-model="credit.phone"></v-text-field>
            <v-text-field label="License Number"
              required
              :rules="[required]"
              v-model="credit.license"></v-text-field>
            <v-text-field label="Income"
              required
              :rules="[required]"
              v-model="credit.income"></v-text-field>
            <v-text-field label="Account Number"
              required
              :rules="[required]"
              v-model="credit.accnumber"></v-text-field>
        </form>
        <br>
         <div class="danger-alert" v-if="error">
            {{error}}
        </div>
        <br>
        <v-btn dark
          class="cyan"
          @click="create">
          CREATE CREDIT
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import CreditService from '@/services/CreditService'
// import NewAccountService from '@/services/NewAccountService'
export default {
  data () {
    return {
      credit: {
        trantype: null,
        firstn: null,
        lastn: null,
        address: null,
        phone: null,
        license: null,
        income: null,
        accnumber: null
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
        .keys(this.credit)
        .every(key => !!this.credit[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        this.credit.limit = 2000
        await CreditService.post(this.credit)
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
