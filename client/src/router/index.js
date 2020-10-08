import Vue from 'vue'
import Dashboard from '@/components/Dashboard'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import BalanceSummary from '@/components/BalanceSummary'
import NewAccount from '@/components/NewAccount'
// import EditSong from '@/components/EditSong'
// import ViewSong from '@/components/ViewSong/Index'

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
    }
  ]
})
