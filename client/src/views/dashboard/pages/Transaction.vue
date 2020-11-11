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

          <v-form>
            <v-container class="py-0">
              <v-row>
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
                  md="4"
                >
                  <v-text-field
                    v-model="transaction.firstn"
                    class="purple-input"
                    :rules="nameRules"
                    label="First Name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="transaction.lastn"
                    class="purple-input"
                    :rules="nameRules"
                    label="Last Name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transaction.phone"
                    class="purple-input"
                    :rules="numberRules"
                    label="Phone Number"
                    required
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
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="transaction.accnumber"
                    class="purple-input"
                    :rules="[required]"
                    label="Account Number"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @create="create"
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
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        numberRules: [
          v => !!v || 'Phone number is required',
          v => (v && v.length === 10) || 'Phone number must be equal to 10 digits',
        ],
        ammountRules: [
          v => !!v || 'Amount is required',
          v => /^\$?[0-9]+(\.[0-9][0-9])?$/.test(v) || 'Amount must be in dollars',
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
      async create () {
        this.error = null
        const areAllFieldsFilledIn = Object
          .keys(this.transaction)
          .every(key => !!this.transaction[key])
        if (!areAllFieldsFilledIn) {
          this.error = 'Please fill in all the required fields.'
          return
        }
        try {
          this.transaction.UserId = this.$store.state.user.id
          this.accountdata = (await AccountService.show({ accnumber: this.transaction.accnumber })).data
          this.transaction.AccountId = this.accountdata.id
          await TransactionService.post(this.transaction)
          this.$router.push({
            name: 'dashboard',
          })
        } catch (error) {
          this.error = error.response.data.error
        }
        try {
          console.log('whats thisnumber ', this.transaction.accnumber)
          // get the account ID using the accnumber
          console.log('result ', this.accountdata)
          // This get the transaction
          this.transactiondata = (await TransactionService.show()).data
          console.log('this tran', this.transactiondata)
          // post to waiting queue
          const waiting = (await WaitingService.post(this.transaction)).data
          console.log('waiting', waiting)
          const tran = (await TransacHisService.post({
            UserId: this.$store.state.user.id,
            AccountId: this.accountdata.id,
            TransactionId: this.transactiondata.id,
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
