
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('accountreport')
  },
  post (newaccount) {
    return Api().post('newaccount', newaccount)
  }
}
