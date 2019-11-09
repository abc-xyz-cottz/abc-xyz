/* eslint-disable */
import session from './session'
import { RootAPI } from './index'

export default {
  logIn (req) {
    return session.post(RootAPI + 'staff/login', req)
  },

  register (req) {
    return session.post(RootAPI + 'customer/register', req)
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
    return session.post(RootAPI + 'staff/update-pass', req)
  },

  /**
   * Confirm code to update password
   */
  activePass (req) {
    return session.post(RootAPI + 'staff/active-pass', req)
  },

  /**
   * Confirm code to active account
   */
  activeAccount (req) {
    return session.post(RootAPI + 'customer/active', req)
  }
};
