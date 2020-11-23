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
                  md="6"
                >
                  <v-select
                    v-model="debit.accnumber"
                    class="purple-input"
                    :items="account"
                    :rules="[required]"
                    label="Account Number"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="debit.trantype"
                    class="purple-input"
                    :rules="[required]"
                    :items="items"
                    label="Transaction Type"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="debit.firstn"
                    class="purple-input"
                    :rules="nameRules"
                    label="First Name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="debit.lastn"
                    class="purple-input"
                    label="Last Name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="debit.address"
                    class="purple-input"
                    label="Address"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="debit.phone"
                    class="purple-input"
                    label="Phone Number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="debit.license"
                    class="purple-input"
                    :rules="licenseRules"
                    label="License Number"
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
                    Submit
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
  import DebitService from '@/services/DebitService'
  import AccountService from '@/services/AccountService'
  import TransacHisService from '@/services/TransacHisService'
  export default {
    data () {
      return {
        items: ['Debit Card'],
        account: [],
        debit: {
          trantype: null,
          firstn: null,
          lastn: null,
          address: null,
          phone: null,
          license: null,
          accnumber: null,
        },
        accountdata: {},
        debitdata: {},
        error: null,
        valid: true,
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        numberRules: [
          v => !!v || 'Phone number is required',
          v => (v && v.length === 10) || 'Phone number must be equal to 10 digits',
        ],
        licenseRules: [
          v => !!v || 'License number is required',
          v => (v && v.length === 9) || 'License number must be equal to 9 digits',
        ],
        required: (values) => !!values || 'Required.',
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
      ]),
    },
    watch: {
      'debit.accnumber': {
        handler: async function (after, before) {
          console.log('changed', after, before)
          const selaccnumber = after
          console.log(selaccnumber)
          console.log(this.debit)
          this.debit = (await AccountService.autofill({ accnumber: selaccnumber })).data
          console.log('return', this.debit)
        },
      },
    },
    async mounted () {
      try {
        this.useracc = (await AccountService.useracc({
          UserId: this.$store.state.user.id,
        })).data

        for (var i = 0; i < this.useracc.length; i++) {
          this.account.push(this.useracc[i].accnumber)
        }
      } catch (err) {
        console.log(err)
      }
    },
    methods: {
      validate () {
        if (!this.$refs.form.validate()) {
          this.$refs.form.validate()
        } else {
          this.create()
        }
      },
      async create () {
        try {
          this.accountdata = (await AccountService.show({ accnumber: this.debit.accnumber })).data
          await DebitService.post(this.debit)
        } catch (error) {
          this.error = error.response.data.error
        }
        try {
          // This get the transaction
          this.debitdata = (await DebitService.show()).data
          // create transaction history
          const tran = (await TransacHisService.post({
            UserId: this.$store.state.user.id,
            AccountId: this.accountdata.id,
            DebitId: this.debitdata.id,
          })).data
          this.$router.push({
            name: 'Dashboard',
          })
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
