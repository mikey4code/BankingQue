
import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('viewtrans', {
      params: params
    })
  },
  post (params) {
    return Api().post('viewtrans', {
      params: params
    })
  }
}
