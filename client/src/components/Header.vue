<template>
  <v-toolbar color="cyan" max-height="80">
    <v-toolbar-items>
      <v-btn
        color="secondary"
        elevation="2"
        :to="{
          name: 'dashboard'
        }">
        User Tab
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        dark
        :to="{
          name: 'bankdashboard'
        }">
        Bank Tab
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        dark
        :to="{
          name: 'register'
        }">
        Sign Up
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        dark
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Dashboard'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}.home{
  height: 30px;
}
</style>
