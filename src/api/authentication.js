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
  getUserInfo () {
    return session.get(RootAPI + 'staff/info')
  }
};
