<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Login
            </div>
          </template>

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container class="py-0">
              <v-row>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="email"
                    class="purple-input"
                    :required="emailRules"
                    label="Email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="password"
                    class="purple-input"
                    label="Password"
                    :required="passRules"
                    type="password"
                  />
                </v-col>
                <br>
                <div
                  class="danger-alert"
                  v-html="error"
                />
                <br>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-0"
                    @click="validate"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data () {
      return {
        email: '',
        password: '',
        error: null,
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passRules: [
          v => !!v || 'Password is required',
          v => (v && v.length <= 8) || 'Password must be less than 8 characters ',
        ],
      }
    },
    methods: {
      validate () {
        if (!this.$refs.form.validate()) {
          this.$refs.form.validate()
        } else {
          this.login()
        }
      },
      async login () {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password,
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          if (response.data.user.email === 'root@gmail.com') {
            this.$router.push({ name: 'BankDashboard' })
          } else {
            this.$router.push({ name: 'Dashboard' })
          }
        } catch (error) {
          this.error = error.response.data.error
        }
      },
    },
  }
</script>

<style scoped>
</style>
