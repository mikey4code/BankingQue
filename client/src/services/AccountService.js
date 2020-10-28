
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('accountreport')
  },
  show (param) {
    console.log('passsedc ', param)
    return Api().get('showaccount', {
      params: param
    })
  },
  post (newaccount) {
    return Api().post('newaccount', newaccount)
  }
}
