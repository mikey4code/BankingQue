<template>
  <v-layout>
    <v-flex offset-md2 blue>
      <panel title="Debit">
        <form name="tab-tracker-form"
              autocomplete="off">
          <v-text-field label="Transaction Type"
              required
              :rules="[required]"
              v-model="debit.trantype"></v-text-field>
          <v-text-field label="First Name"
              required
              :rules="[required]"
              v-model="debit.firstn"></v-text-field>
            <v-text-field label="Last Name"
              required
              :rules="[required]"
              v-model="debit.lastn"></v-text-field>
            <v-text-field label="Phone Number"
              required
              :rules="[required]"
              v-model="debit.phone"></v-text-field>
            <v-text-field label="Address"
              required
              :rules="[required]"
              v-model="debit.address"></v-text-field>
            <v-text-field label="License Number"
              required
              :rules="[required]"
              v-model="debit.license"></v-text-field>
            <v-text-field label="Account Number"
              required
              :rules="[required]"
              v-model="debit.accnumber"></v-text-field>
        </form>
        <br>
         <div class="danger-alert" v-if="error">
            {{error}}
        </div>
        <br>
        <v-btn dark
          class="cyan"
          @click="create">
          CREATE DEBIT
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import DebitService from '@/services/DebitService'
// import NewAccountService from '@/services/NewAccountService'
export default {
  data () {
    return {
      debit: {
        trantype: null,
        firstn: null,
        lastn: null,
        address: null,
        phone: null,
        license: null,
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
        .keys(this.debit)
        .every(key => !!this.debit[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await DebitService.post(this.debit)
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
