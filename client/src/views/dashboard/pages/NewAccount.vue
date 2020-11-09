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
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
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
                  md="7"
                >
                  <v-text-field
                    v-model="account.trantype"
                    class="purple-input"
                    :rules="[required]"
                    label="Transaction Type"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="account.firstn"
                    class="purple-input"
                    label="First Name"
                    :rules="nameRules"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="account.lastn"
                    class="purple-input"
                    label="Last Name"
                    :rules="nameRules"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="account.address"
                    class="purple-input"
                    label="Address"
                    :rules="[required]"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="account.phone"
                    class="purple-input"
                    label="Number"
                    :rules="[required]"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="account.dob"
                    class="purple-input"
                    label="DOB"
                    :rules="[required]"
                    required
                  />
                </v-col>

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
                    Update Profile
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
  import { mapState } from 'vuex'
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
          dob: null,
        },
        accountdata: {},
        error: null,
        valid: true,
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        required: (values) => !!values || 'Required.',
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
      ]),
    },
    methods: {
      generateNumber: function () {
        return Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000)
      },
      validate () {
        if (!this.$refs.form.validate()) {
          this.$refs.form.validate()
        } else {
          this.create()
        }
      },
      async create () {
        try {
          this.account.amount = 0
          this.account.UserId = this.$store.state.user.id
          this.account.accnumber = this.generateNumber()
          console.log('created account ', this.account)
          const check = (await AccountService.post(this.account)).data
          console.log(check)
          this.$router.push({
            name: 'Dashboard',
          })
        } catch (error) {
          this.error = error.response.data.error
        }
        try {
          this.accountdata = (await AccountService.show({ accnumber: this.account.accnumber })).data
          console.log('result ', this.accountdata.id)
          const tran = (await TransacHisService.post({
            UserId: this.$store.state.user.id,
            AccountId: this.accountdata.id,
          })).data
          console.log('here', tran)
        } catch (err) {
          console.log(err)
        }
      },
    },
  }
</script>

<style scoped>
</style>
