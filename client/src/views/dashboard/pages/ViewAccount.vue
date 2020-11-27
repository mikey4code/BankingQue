<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-alert
      v-if="error"
      type="error"
    >
      <span><h2> ERROR - {{ error }} </h2></span>
    </v-alert>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Account Detail
            </div>

            <div class="subtitle-1 font-weight-light">
              Report
            </div>
          </template>
          <v-card
            class="mx-auto"
            max-width="300"
            tile
          >
            <v-list disabled>
              <v-list-item-group
                color="primary"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-uppercase">
                      <p class="font-weight-black">
                        Account Type: {{ account.trantype }}
                      </p>
                      <p class="font-weight-black">
                        First Name: {{ account.firstn }}
                      </p>
                      <p class="font-weight-black">
                        Last Name: {{ account.lastn }}
                      </p>
                      <p class="font-weight-black">
                        Account Number: {{ account.accnumber }}
                      </p>
                      <p class="font-weight-black">
                        Address: {{ account.address }}
                      </p>
                      <p class="font-weight-black">
                        {{ account.city }} , {{ account.state }} {{ account.zip }}
                      </p>
                      <p class="font-weight-black">
                        DOB: {{ account.dob }}
                      </p>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Transaction detail
            </div>

            <div class="subtitle-1 font-weight-light">
              Report
            </div>
          </template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Transaction type
                  </th>
                  <th class="text-left">
                    First Name
                  </th>
                  <th class="text-left">
                    Last Name
                  </th>
                  <th class="text-left">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in transaction"
                  :key="item.name"
                >
                  <td class="text-uppercase">
                    {{ item.trantype }} </td>
                  <td class="text-uppercase">
                    {{ item.firstn }}</td>
                  <td class="text-uppercase">
                    {{ item.lastn }}</td>
                  <td class="text-uppercase">
                    {{ item.amount }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Credit details
            </div>

            <div class="subtitle-1 font-weight-light">
              Report
            </div>
          </template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Transaction type
                  </th>
                  <th class="text-left">
                    First Name
                  </th>
                  <th class="text-left">
                    Last Name
                  </th>
                  <th class="text-left">
                    Limit
                  </th>
                  <th class="text-left">
                    Income
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in credit"
                  :key="item.name"
                >
                  <td class="text-uppercase">
                    {{ item.trantype }}</td>
                  <td class="text-uppercase">
                    {{ item.firstn }}</td>
                  <td class="text-uppercase">
                    {{ item.lastn }}</td>
                  <td class="text-uppercase">
                    {{ item.limit }}</td>
                  <td class="text-uppercase">
                    {{ item.income }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Debit
            </div>

            <div class="subtitle-1 font-weight-light">
              Report
            </div>
          </template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Transaction type
                  </th>
                  <th class="text-left">
                    First Name
                  </th>
                  <th class="text-left">
                    Last Name
                  </th>
                  <th class="text-left">
                    License
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in debit"
                  :key="item.name"
                >
                  <td class="text-uppercase">
                    {{ item.trantype }}</td>
                  <td class="text-uppercase">
                    {{ item.firstn }}</td>
                  <td class="text-uppercase">
                    {{ item.lastn }}</td>
                  <td class="text-uppercase">
                    {{ item.license }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Transfer
            </div>

            <div class="subtitle-1 font-weight-light">
              Report
            </div>
          </template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Transaction type
                  </th>
                  <th class="text-left">
                    First Name
                  </th>
                  <th class="text-left">
                    Last Name
                  </th>
                  <th class="text-left">
                    Recipent Number
                  </th>
                  <th class="text-left">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in transfer"
                  :key="item.name"
                >
                  <td class="text-uppercase">
                    {{ item.trantype }}</td>
                  <td class="text-uppercase">
                    {{ item.firstn }}</td>
                  <td class="text-uppercase">
                    {{ item.lastn }}</td>
                  <td class="text-uppercase">
                    {{ item.recipn }}</td>
                  <td class="text-uppercase">
                    {{ item.amount }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import AccountService from '@/services/AccountService'
  import TransactionService from '@/services/TransactionService'
  import TransferService from '@/services/TransferService'
  import CreditService from '@/services/CreditService'
  import DebitService from '@/services/DebitService'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Transaction Type',
            value: 'trantype',
          },
          {
            text: 'Account#',
            value: 'accnumber',
          },
          {
            text: 'First Name',
            value: 'firstn',
          },
          {
            text: 'Last Name',
            value: 'lastn',
          },
          {
            text: 'Limit',
            value: 'limit',
          },
          {
            text: 'Income',
            value: 'income',
          },
        ],
        error: null,
        account: [],
        transaction: [],
        transfer: [],
        credit: [],
        debit: [],
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
      ]),
    },
    async mounted () {
      try {
        console.log(this.$store.state.user.id)
        const accountId = this.$store.state.route.params.accountId
        this.account = (await AccountService.showacc(accountId)).data
        console.log('account id fron', this.account)

        // Show transaction of account by account Number
        this.transaction = (await TransactionService.showtran(this.account.accnumber)).data
        console.log('get transaction', this.transaction)

        // Show transfer of account by account Number
        this.transfer = (await TransferService.showtransfer(this.account.accnumber)).data
        console.log('this tranfer', this.transfer)

        // Show transfer of account by account Number
        this.credit = (await CreditService.showcredit(this.account.accnumber)).data
        console.log(this.credit)

        // Show transfer of account by account Number
        this.debit = (await DebitService.showdebit(this.account.accnumber)).data
        console.log(this.debit)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
  }
</script>

<style>

</style>
