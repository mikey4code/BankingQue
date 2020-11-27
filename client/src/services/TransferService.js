
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('transferreport')
  },
  show () {
    return Api().get('recenttransfer')
  },
  showtransfer (param) {
    return Api().get('showtransfer', {
      params: { param },
    })
  },
  post (transfer) {
    return Api().post('transfer', transfer)
  },
  maketransfer (param) {
    return Api().put('maketransfer', {
      params: param,
    })
  },
}
