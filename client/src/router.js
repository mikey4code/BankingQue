import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'New Account',
          path: '/newaccount',
          component: () => import('@/views/dashboard/pages/NewAccount'),
        },
        {
          name: 'Transaction',
          path: '/transaction',
          component: () => import('@/views/dashboard/pages/Transaction'),
        },
        {
          name: 'Transafer',
          path: '/transfer',
          component: () => import('@/views/dashboard/pages/Transfer'),
        },
        {
          name: 'Credit',
          path: '/credit',
          component: () => import('@/views/dashboard/pages/Credit'),
        },
        {
          name: 'Debit',
          path: '/debit',
          component: () => import('@/views/dashboard/pages/Debit'),
        },
        {
          name: 'Login',
          path: '/login',
          component: () => import('@/views/dashboard/pages/Login'),
        },
      ],
    },
    {
      path: '/bank',
      component: () => import('@/views/dashboard/BankIndex'),
      children: [
        // Dashboard
        {
          name: 'BankDashboard',
          path: '/bank',
          component: () => import('@/views/dashboard/BankDashboard'),
        },
        // Tables
        {
          name: 'Account Report',
          path: '/bank/accountreport',
          component: () => import('@/views/dashboard/tables/AccountReport'),
        },
        {
          name: 'Transaction Report',
          path: '/bank/transactionreport',
          component: () => import('@/views/dashboard/tables/TransactionReport'),
        },
        {
          name: 'Transfer Report',
          path: '/bank/transferreport',
          component: () => import('@/views/dashboard/tables/TransferReport'),
        },
        {
          name: 'Credit Report',
          path: '/bank/creditreport',
          component: () => import('@/views/dashboard/tables/CreditReport'),
        },
        {
          name: 'Debit Report',
          path: '/bank/debitreport',
          component: () => import('@/views/dashboard/tables/DebitReport'),
        },
        {
          name: 'Bank Report',
          path: '/bank/Bankreport',
          component: () => import('@/views/dashboard/tables/BankReport'),
        },
      ],
    },
  ],
})
