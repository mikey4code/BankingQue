
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('debitreport')
  },
  showdebit (param) {
    return Api().get('showdebit', {
      params: { param },
    })
  },
  post (debit) {
    return Api().post('debit', debit)
  },
}
