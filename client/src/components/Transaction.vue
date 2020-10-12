<template>
   <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Transaction">
        <form name="tab-tracker-form"
              autocomplete="off">
          <v-text-field label="Transaction type"
                        v-model="email"></v-text-field>
          <br>
          <v-text-field label="First Name"
                        type="password"
                        v-model="password"
                        autocomplete="new-password"></v-text-field>
          <br>
          <v-text-field label="Last Name"
                        type="password"
                        v-model="password"
                        autocomplete="new-password"></v-text-field>
                        <br>
          <v-text-field label="Phone Number"
                        type="password"
                        v-model="password"
                        autocomplete="new-password"></v-text-field>
                        <br>
          <v-text-field label="Amount"
                        type="password"
                        v-model="password"
                        autocomplete="new-password"></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn dark
               class="cyan"
               @click="register">
          Submit
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
// import NewAccountService from '@/services/NewAccountService'
export default {
}
</script>

<style scoped>
</style>
