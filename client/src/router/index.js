import Vue from 'vue'
import Dashboard from '@/components/Dashboard'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import BalanceSummary from '@/components/BalanceSummary'
import NewAccount from '@/components/NewAccount'
import Transaction from '@/components/Transaction'
import Debit from '@/components/Debit'
import Credit from '@/components/Credit'
import Transfer from '@/components/Transfer'
import BankDashboard from '@/components/bank/BankDashboard'
import BankSummary from '@/components/bank/BankSummary'
import AccountReport from '@/components/bank/AccountReport'
import TransactionReport from '@/components/bank/TransactionReport'
import TransferReport from '@/components/bank/TransferReport'
import DebitReport from '@/components/bank/DebitReport'
import CreditReport from '@/components/bank/CreditReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/newaccount',
      name: 'newaccount',
      component: NewAccount
    },
    {
      path: '/balancesummary',
      name: 'balancesummary',
      component: BalanceSummary
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transaction
    },
    {
      path: '/bankdashboard',
      name: 'bankdashboard',
      component: BankDashboard
    },
    {
      path: '/banksummary',
      name: 'banksummary',
      component: BankSummary
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    {
      path: '/transferreport',
      name: 'transferreport',
      component: TransferReport
    },
    {
      path: '/accountreport',
      name: 'accountreport',
      component: AccountReport
    },
    {
      path: '/transactionreport',
      name: 'transactionreport',
      component: TransactionReport
    },
    {
      path: '/debitreport',
      name: 'debitreport',
      component: DebitReport
    },
    {
      path: '/creditreport',
      name: 'creditreport',
      component: CreditReport
    },
    {
      path: '/credit',
      name: 'credit',
      component: Credit
    },
    {
      path: '/debit',
      name: 'debit',
      component: Debit
    }
  ]
})
