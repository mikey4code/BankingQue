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
        <div
          style="background-color:#67ac5b;"
          class="jumbotron text-center"
        >
          <h1> Banking Queue </h1>
          <p
            margin-top:0
          > Mikey Chow-yen </p>
          <p
            margin-top:0
          > Adil Ali </p>
          <p
            margin-top:0
          > Raj Patel </p>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-4" />
            <div class="col-sm-4">
              <h3>Bank</h3>
              <p>During the pendemic of COVID-19 most of the business were loosing money and need way to encurage the customers to come in and have a comfortable and secure way to do transcations. so we as ateam came up with this program called the banking Queue, this program allows the customers to wait in a vertual line and to be called in when a bank rep/teller is able to help them out when they are free. it allows the customers to wait in the comforts of thir cars while they wait instead of waiting in line , we also added other functionalities like.</p>
              <ul>
                <li>open new accounts&nbsp;</li>
                <li>transfer between accounts</li>
                <li>get new credit/debit card</li>
              </ul>
            </div>
          </div>
        </div>
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
        items: ['Credit'],
        options: ['25000 and less', '25000 and more', 'Between 50000 and 75000', 'Between 75000 and 100000', '100000 or more'],
        account: [],
        credit: {
          trantype: null,
          firstn: null,
          lastn: null,
          address: null,
          phone: null,
          license: null,
          income: null,
          accnumber: null,
        },
        accountdata: {},
        creditdata: {},
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
          this.accountdata = (await AccountService.show({ accnumber: this.credit.accnumber })).data
          await CreditService.post(this.credit)
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
