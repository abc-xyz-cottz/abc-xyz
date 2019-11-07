/* eslint-disable */
import session from './session'
import { RootAPI } from './index'

export default {
  logIn (req) {
    return session.post(RootAPI + 'staff/login', req)
  },

  // getUserInfo () {
  //   return session.post(RootAPI + 'staff/info')
  // }

  /**
   * Gets current logged in user info
   */
  getUserInfo (param) {
    return session.get(RootAPI + 'staff/' + param)
  },

  /**
   * Staff update password
   */
  staffUpdatePass (req) {
    return session.get(RootAPI + 'staff/update-pass', req)
  },

  /**
   * Confirm code to update password
   */
  activePass (req) {
    return session.get(RootAPI + 'staff/active-pass', req)
  }
};
