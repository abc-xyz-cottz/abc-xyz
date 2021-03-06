import session from './session'
import { RootAPI } from './index'

export default {
  /**
   * get info customer by id
   */
  getCustomerInfo (id) {
    return session.get(RootAPI + 'customer/' + id)
  },

  /**
   * customer list
   */
  getListCustomer (params) {
    return session.get(RootAPI + 'customer/search/?'+ params)
  },

  /**
   * get promotion of customer
   */
  getPromotionList (params) {
    return session.get(RootAPI + 'customer/' + params)
  },

  /**
   * Get selected option level for search guest screen
   */
  getOptionLevel () {
    return session.get(RootAPI + 'membershiptype/list')
  }
}