<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-alert
      v-if="error"
      type="error"
    >
      <span><h2> ERROR - {{ error }} </h2></span>
    </v-alert>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Register
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
                >

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="email"
                      label="Email Address"
                      :rules="emailRules"
                      class="purple-input"
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
                      :rules="passRules"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      hint="Your password passed! Password rules are not meant to be broken!"
                      @click:append="show = !show"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="confirmPassword"
                      class="purple-input"
                      label="Confirm Password"
                      :rules="[confirmPasswordRules,passwordConfirmationRule]"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      hint="Your password match!"
                      @click:append="show1 = !show1"
                    />
                  </v-col>
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="mr-0"
                    @click="validate"
                  >
                    Register
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
        show: false,
        show1: false,
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(v) || 'E-mail must be valid',
        ],
        passRules: [
          v => !!v || 'Password is required',
          v => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).test(v) || 'Min. 8 characters with at least one capital letter, a number and a special character.',
        ],
        confirmPasswordRules: [
          v => !!v || 'Password is required',
        ],
      }
    },
    computed: {
      passwordConfirmationRule () {
        return () => (this.password === this.confirmPassword) || 'Password must match'
      },
    },
    methods: {
      validate () {
        if (!this.$refs.form.validate()) {
          this.$refs.form.validate()
        } else {
          this.register()
        }
      },
      async register () {
        try {
          const response = await AuthenticationService.register({
            email: this.email,
            password: this.password,
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'New Account',
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      },
    },
  }
</script>

<style scoped>
</style>
