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
                  md="4"
                >
                  <v-select
                    v-model="transaction.accnumber"
                    class="purple-input"
                    :items="account"
                    :rules="[required]"
                    label="Account Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="transaction.trantype"
                    class="purple-input"
                    :items="items"
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
                    v-model="transaction.firstn"
                    class="purple-input"
                    readonly
                    label="First Name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transaction.lastn"
                    class="purple-input"
                    readonly
                    label="Last Name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transaction.phone"
                    class="purple-input"
                    readonly
                    label="Phone Number"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transaction.amount"
                    class="purple-input"
                    :rules="ammountRules"
                    label="Amount"
                    prefix="$"
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
  import TransactionService from '@/services/TransactionService'
  import TransacHisService from '@/services/TransacHisService'
  import AccountService from '@/services/AccountService'
  import WaitingService from '@/services/WaitingService'
  export default {
    data () {
      return {
        items: ['Deposit', 'Withdrawl'],
        account: [],
        temp: {},
        transaction: {
          trantype: null,
          firstn: null,
          lastn: null,
          phone: null,
          amount: null,
          accnumber: null,
        },
        accountdata: {},
        transactiondata: {},
        error: null,
        valid: true,
        ammountRules: [
          v => !!v || 'Amount is required',
          v => (/^\$?[0-9]+(\.[0-9][0-9])?$/).test(v) || 'Amount must be in dollars',
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
      'transaction.accnumber': {
        handler: async function (after, before) {
          console.log('changed', after, before)
          const selaccnumber = after
          console.log(selaccnumber)
          console.log('before change', this.transaction)
          this.transaction = (await AccountService.autofill({ accnumber: selaccnumber })).data
          console.log('return', this.transaction)
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
          console.log('what we have ', this.transaction)
          // Get account data
          this.accountdata = (await AccountService.show({ accnumber: this.transaction.accnumber })).data

          console.log('whats beeing post', this.transaction)
          this.temp = {
            trantype: this.transaction.trantype,
            firstn: this.transaction.firstn,
            lastn: this.transaction.lastn,
            phone: this.transaction.phone,
            amount: this.transaction.amount,
            accnumber: this.transaction.accnumber,
            AccountId: this.accountdata.id,
          }
          console.log('what temp is ', this.temp)
          await TransactionService.post(this.temp)
        } catch (error) {
          this.error = error.response.data.error
        }
        try {
          // This get the transaction
          this.transactiondata = (await TransactionService.show()).data
          console.log('this tran data', this.transactiondata)
          // post to waiting queue
          this.temp.UserId = this.$store.state.user.id
          const waiting = (await WaitingService.post(this.temp)).data
          console.log('waiting', waiting)
          // create transaction history
          const tran = (await TransacHisService.post({
            UserId: this.$store.state.user.id,
            AccountId: this.accountdata.id,
            TransactionId: this.transactiondata.id,
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
