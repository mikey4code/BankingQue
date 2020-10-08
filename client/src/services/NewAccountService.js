
import Api from '@/services/Api'

export default {
  post (newaccount) {
    return Api().post('newaccount', newaccount)
  }
}
