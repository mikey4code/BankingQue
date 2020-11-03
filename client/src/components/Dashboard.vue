<template>
  <v-layout column>
    <v-flex>
      <panel title="Dashboard">
        <br>
        <div class="danger-alert" v-html="error"/>
        <br>
        <v-btn
          dark
          class="cyan"
          to="/waitingqueue">
          Waiting Queue
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/transaction">
          Transaction
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/transfer">
          Transfer
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/newaccount">
          New Account
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/debit">
          New Debit
        </v-btn>
        <v-btn
          dark
          class="cyan"
          to="/credit">
          New Credit
        </v-btn>
    <div class="text-right">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          class="cyan"
          v-bind="attrs"
          v-on="on"
        >
          Balance Summary
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(account, index) in useracc"
          :key="index"
        >
          <v-list-item-title>{{account.trantype}} - {{account.accnumber}} - {{account.amount}}
          <br>
          <v-btn
          dark
          class="cyan"
          @click="navigateTo({name: 'account',
          params:{
            accountId: account.id
          }})">
          View
        </v-btn></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import AccountService from '@/services/AccountService'
export default {
  data () {
    return {
      useracc: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    navigateTo (route) {
      console.log('route ', route)
      this.$router.push(route)
    }
  },
  async mounted () {
    try {
      console.log(this.$store.state.user.id)
      this.useracc = (await AccountService.useracc({
        UserId: this.$store.state.user.id
      })).data
      console.log('here', this.useracc)
    } catch (err) {
      console.log(err)
    }
  }

}
</script>

<style scoped>
</style>
