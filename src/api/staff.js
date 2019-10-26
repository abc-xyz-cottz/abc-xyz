import session from './session'
import { RootAPI } from './index'

export default {
  /**
   * get info of staff
   */
  logIn (data) {
    return session.post(RootAPI + 'staff/login', data)
  }

  // /**
  //  * get info of staff
  //  */
  // getStaffInfo (id, param) {
  //   return session.get(RootAPI + 'staff/' + id, { param })
  // },
  //
  // /**
  //  * update info staff
  //  */
  // updateStaffInfo (req) {
  //   return session.post(RootAPI + 'staff/update-info', req)
  // },
  //
  // /**
  //  * change password for staff
  //  */
  // changePassword (req) {
  //   return session.post(RootAPI + 'auth/staff/change_password', req)
  // },
  //
  // /**
  //  * Search account
  //  */
  // searchAccount (params) {
  //   return session.post(RootAPI + 'staff/search/'+ params)
  // },
  //
  // /**
  //  * Get selected option for search staff screen
  //  */
  // defineOptionsForSearchStaff () {
  //   return session.post(RootAPI + 'staff/get-master-option')
  // }
}
