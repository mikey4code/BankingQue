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
                    v-model="transfer.accnumber"
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
                    v-model="transfer.trantype"
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
                    v-model="transfer.firstn"
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
                    v-model="transfer.lastn"
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
                    v-model="transfer.recipn"
                    class="purple-input"
                    :rules="recipRules"
                    label="Recipient ACCT Number"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="transfer.amount"
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
  import TransferService from '@/services/TransferService'
  import AccountService from '@/services/AccountService'
  import TransacHisService from '@/services/TransacHisService'
  export default {
    data () {
      return {
        items: ['Transfer'],
        account: [],
        temp: {},
        transfer: {
          trantype: null,
          firstn: null,
          lastn: null,
          accnumber: null,
          recipn: null,
          amount: null,
        },
        accountdata: {},
        transferdata: {},
        error: null,
        valid: true,
        ammountRules: [
          v => !!v || 'Amount is required',
          v => /^\$?[0-9]+(\.[0-9][0-9])?$/.test(v) || 'Amount must be in dollars',
        ],
        recipRules: [
          v => !!v || 'Recipient Number Is Required',
          v => (v.length === 8) || 'Invaild Recipient Number',
          v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999999) || 'Invaild Recipient Number',
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
      'transfer.accnumber': {
        handler: async function (after, before) {
          console.log('changed', after, before)
          const selaccnumber = after
          console.log(selaccnumber)
          console.log(this.transfer)
          this.transfer = (await AccountService.autofill({ accnumber: selaccnumber })).data
          console.log('return', this.transfer)
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
          this.accountdata = (await AccountService.show({ accnumber: this.transfer.accnumber })).data
          this.temp = {
            trantype: this.transfer.trantype,
            firstn: this.transfer.firstn,
            lastn: this.transfer.lastn,
            recipn: this.transfer.recipn,
            amount: this.transfer.amount,
            accnumber: this.transfer.accnumber,
          }
          console.log('this.transfer', this.transfer)
          await TransferService.post(this.temp)
          const make = await TransferService.maketransfer({
            accnumber: this.transfer.accnumber,
            recipn: this.transfer.recipn,
            amount: this.transfer.amount,
          })
          console.log('make', make)
        } catch (error) {
          this.error = error.response.data.error
        }
        try {
          // This get the transaction
          this.transferdata = (await TransferService.show()).data
          // create transaction history
          const tran = (await TransacHisService.post({
            UserId: this.$store.state.user.id,
            AccountId: this.accountdata.id,
            TransferId: this.transferdata.id,
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
