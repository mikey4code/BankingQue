<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

    <base-material-card
      color="success"
      dark
      icon="mdi-clipboard-plus"
      title="Account Info"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th class="text-right">
              Salary
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">
              $36,738
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">
              $23,789
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td class="text-right">
              $56,142
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">
              $63,542
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td class="text-right">
              $78,615
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
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
      const accountId = this.$store.state.route.params.accountId
      this.account = (await AccountService.showacc(accountId)).data
      console.log('account id fron', this.account.accnumber)

      // Show transaction of account by account Number
      this.transaction = (await TransactionService.showtran(this.account.accnumber)).data
      console.log(this.transaction)

      // Show transfer of account by account Number
      this.transfer = (await TransferService.showtransfer(this.account.accnumber)).data
      console.log('this', this.transfer)

      // Show transfer of account by account Number
      this.credit = (await CreditService.showcredit(this.account.accnumber)).data
      console.log(this.debit)

      // Show transfer of account by account Number
      this.debit = (await DebitService.showdebit(this.account.accnumber)).data
      console.log(this.credit)
    },
  }
</script>

<style>

</style>
