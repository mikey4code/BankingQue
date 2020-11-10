
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('transactionreport')
  },
  show () {
    return Api().get('showtransaction')
  },
  showtran (param) {
    console.log(param)
    return Api().get('showtran', {
      params: { param },
    })
  },
  post (transaction) {
    return Api().post('transaction', transaction)
  },
}
