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
                  md="4"
                >
                  <v-text-field
                    v-model="transfer.firstn"
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
                    v-model="transfer.lastn"
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
                  md="6"
                >
                  <v-text-field
                    v-model="transfer.recipn"
                    class="purple-input"
                    :rules="[required]"
                    label="Recipient"
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
  import TransferService from '@/services/TransferService'
  import AccountService from '@/services/AccountService'
  import TransacHisService from '@/services/TransacHisService'
  export default {
    data () {
      return {
        items: ['Checkings', 'Savings'],
        account: [],
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
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
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
          await TransferService.post(this.transfer)
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
