import Vue from 'vue'
import Dashboard from '@/components/Dashboard'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import BalanceSummary from '@/components/BalanceSummary'
import NewAccount from '@/components/NewAccount'
import Transaction from '@/components/Transaction'
import Transfer from '@/components/Transfer'
import BankDashboard from '@/components/bank/BankDashboard'
import BankSummary from '@/components/bank/BankSummary'
import AccountReport from '@/components/bank/AccountReport'
import TransactionReport from '@/components/bank/TransactionReport'

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
      path: '/accountreport',
      name: 'accountreport',
      component: AccountReport
    },
    {
      path: '/transactionreport',
      name: 'transactionreport',
      component: TransactionReport
    }
  ]
})
