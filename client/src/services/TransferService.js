
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('transferreport')
  },
  showtransfer (param) {
    return Api().get('showtransfer', {
      params: { param },
    })
  },
  post (transfer) {
    return Api().post('transfer', transfer)
  },
}
