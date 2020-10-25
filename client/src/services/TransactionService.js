
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('transactionreport')
  },
  post (transaction) {
    return Api().post('transaction', transaction)
  }
}
