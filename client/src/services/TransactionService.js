
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('transactionreport')
  },
  show () {
    return Api().get('showtransaction')
  },
  post (transaction) {
    return Api().post('transaction', transaction)
  }
}
