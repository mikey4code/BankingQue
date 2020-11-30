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
        <base-material-card color="primary">
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
                    v-model="credit.accnumber"
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
                    v-model="credit.trantype"
                    class="purple-input"
                    :items="items"
                    label="Transaction Type"
                    :rules="[required]"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="credit.firstn"
                    class="purple-input"
                    readonly
                    label="First Name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="credit.lastn"
                    class="purple-input"
                    readonly
                    label="Last Name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="credit.address"
                    class="purple-input"
                    readonly
                    :rules="[required]"
                    label="Adress"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="credit.city"
                    class="purple-input"
                    readonly
                    label="City"
                    :rules="[required]"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="credit.state"
                    class="purple-input"
                    readonly
                    label="State"
                    :rules="[required]"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="2"
                >
                  <v-text-field
                    v-model="credit.zip"
                    class="purple-input"
                    readonly
                    label="Zip"
                    :rules="[required]"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="credit.phone"
                    class="purple-input"
                    readonly
                    label="Phone Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="credit.license"
                    class="purple-input"
                    :rules="licenseRules"
                    label="License Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="credit.income"
                    class="purple-input"
                    :items="options"
                    :rules="[required]"
                    label="Income"
                    required
                  />
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
  import CreditService from '@/services/CreditService'
  import TransacHisService from '@/services/TransacHisService'
  import AccountService from '@/services/AccountService'
  export default {
    data () {
      return {
        items: ['Credit Card'],
        options: ['25000 and less', '25000 and more', 'Between 50000 and 75000', 'Between 75000 and 100000', '100000 or more'],
        account: [],
        temp: {},
        credit: {
          trantype: null,
          firstn: null,
          lastn: null,
          address: null,
          city: null,
          state: null,
          zip: null,
          phone: null,
          license: null,
          income: null,
          accnumber: null,
        },
        accountdata: {},
        creditdata: {},
        error: null,
        valid: true,
        licenseRules: [
          v => !!v || 'License number is required',
          v => (v && v.length === 9) || 'License number must be equal to 9 digits',
          v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 999999999) || 'Invaild License Number',
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
      'credit.accnumber': {
        handler: async function (after, before) {
          console.log('changed', after, before)
          const selaccnumber = after
          console.log(selaccnumber)
          console.log(this.credit)
          this.credit = (await AccountService.autofill({ accnumber: selaccnumber })).data
          console.log('return', this.credit)
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
          if (this.credit.income === '25000 and less') {
            this.credit.limit = 12500
          }
          if (this.credit.income === '25000 and more') {
            this.credit.limit = 15000
          }
          if (this.credit.income === 'Between 50000 and 75000') {
            this.credit.limit = 25000
          }
          if (this.credit.income === 'Between 75000 and 100000') {
            this.credit.limit = 37500
          }
          if (this.credit.income === '100000 or more') {
            this.credit.limit = 50000
          }
          this.temp = {
            trantype: this.credit.trantype,
            firstn: this.credit.firstn,
            lastn: this.credit.lastn,
            address: this.credit.address,
            city: this.credit.city,
            state: this.credit.state,
            zip: this.credit.zip,
            phone: this.credit.phone,
            license: this.credit.license,
            income: this.credit.income,
            accnumber: this.credit.accnumber,
            limit: this.credit.limit,
          }
          console.log('credit to post', this.temp)
          await CreditService.post(this.temp)
        } catch (error) {
          this.error = error.response.data.error
        }
        try {
          // This get the transaction
          this.creditdata = (await CreditService.show()).data
          // create transaction history
          const tran = (await TransacHisService.post({
            UserId: this.$store.state.user.id,
            AccountId: this.accountdata.id,
            CreditId: this.creditdata.id,
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
