import session from './session'
import { RootAPI } from './index'

export default {
  /**
   * Customer login
   */
  customerLogin(req) {
    return session.post(RootAPI + 'customer/login', req)
  },

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
  },

  /**
   * Customer send order
   */
  sendOrder (listOrder) {
    return session.post(RootAPI + 'customer/send-order', listOrder)
  },

  /**
   * Customer send request
   */
  sendRequest (request) {
    return session.post(RootAPI + 'customer/send-request', request)
  },

  /**
   * Get list menu
   */
  getMenu(storeId) {
    return session.get(RootAPI + 'menu/customer/' + storeId)
  },

  /**
   * get point list of customer
   */
  getPointList () {
    return session.get(RootAPI + 'customer/point')
  },

  /**
   * get point detail list of customer
   */
  getPointDetailList (store_id) {
    return session.get(RootAPI + 'customer/point-detail/' + store_id)
  },

  /**
   * get available promo customer
   */
  getAvailablePromo () {
    return session.get(RootAPI + 'customer/pmt/owned')
  },

  /**
   * get expired promo customer
   */
  getExpiredPromo () {
    return session.get(RootAPI + 'customer/pmt/expired')
  },

  /**
   * get used promo customer
   */
  getUsedPromo () {
    return session.get(RootAPI + 'customer/pmt/used')
  },

  /**
   * Load notification
   */
  getNotification(params) {
    return session.post(RootAPI + 'customer/notification', params)
  },

  /**
   * Count notification is not read
   */
  countNotificationNotRead() {
    return session.get(RootAPI + 'customer/count-noti')
  },

  /**
   * Update notification is read
   */
  updateNotificationIsRead() {
    return session.get(RootAPI + 'customer/update-noti-is-read')
  },

  /**
   * Update info customer
   */
  updateInfo(req) {
    return session.post(RootAPI + 'customer/update-info', req)
  },
  
  /** 
   * Get store by city
   */
  getStoreByCity(cityId) {
    return session.get(RootAPI + 'store/get-by-city/' + cityId)
  }
}
