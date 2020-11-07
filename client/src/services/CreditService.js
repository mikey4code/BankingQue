
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('creditreport')
  },
  post (credit) {
    return Api().post('credit', credit)
  },
}
