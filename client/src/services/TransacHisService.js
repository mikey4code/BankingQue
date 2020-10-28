
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('viewtrans')
  },
  post (transac) {
    console.log('param ', transac)
    return Api().post('viewtrans', transac)
  }
}
