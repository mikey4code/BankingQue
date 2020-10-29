
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('debitreport')
  },
  post (debit) {
    return Api().post('debit', debit)
  }
}
