
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('transferreport')
  },
  post (transfer) {
    return Api().post('transfer', transfer)
  },
}
