import session from './session'
import { RootAPI } from './index'

export default {
  /**
   * get info of staff
   */
  logIn (data) {
    return session.post(RootAPI + 'staff/login', data)
  },

  /**
   * Send promotion info to admin
   */
  sendPromo (data) {
    return session.post(RootAPI + 'staff/send-promo', data)
  }


}
