import Vue from 'vue'
import Hello from '@/components/Hello'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
// import Songs from '@/components/Songs/Index'
// import CreateSong from '@/components/CreateSong'
// import EditSong from '@/components/EditSong'
// import ViewSong from '@/components/ViewSong/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
    }
  ]
})
