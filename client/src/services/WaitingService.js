
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('waitingqueue')
  },
  post (waiting) {
    return Api().post('waitingqueue', waiting)
  },
  removeq () {
    return Api().delete('removequeue')
  },
  sendtext () {
    return Api().post('sendtext')
  },
  exitqueue (param) {
    console.log('send to ser', param)
    return Api().delete('exitqueue', {
      params: param,
    })
  },
}
