
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('creditreport')
  },
  showcredit (param) {
    return Api().get('showcredit', {
      params: { param },
    })
  },
  post (credit) {
    return Api().post('credit', credit)
  },
}
