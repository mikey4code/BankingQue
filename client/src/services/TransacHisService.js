
import Api from '@/services/Api'

export default {
  index (transac) {
    console.log('get tran', transac)
    return Api().get('viewtrans', {
      params: transac
    })
  },
  post (transac) {
    return Api().post('viewtrans', transac)
  }
}
