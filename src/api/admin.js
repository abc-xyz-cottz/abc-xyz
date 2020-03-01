import session from './session'
import { RootAPI } from './index'
import upload from './uploadFile'

export default {
  /**
   * Search menu
   */
  searchMenu (params) {
    return session.post(RootAPI + 'menu/search-by-staff/', params)
  },

  /**
   * Get menu detail
   */
  getMenuDetail(menuId) {
    return session.get(RootAPI + 'menu/' + menuId)
  },

  /**
   * Delete menu
   */
  deleteMenu(menuId) {
    return session.get(RootAPI + 'menu/delete/' + menuId)
  },

  /**
   * Add menu
   */
  addMenu (params) {
    // return session.post(RootAPI + 'menu/add', params)
    return upload.post(RootAPI + 'menu/add', params)
  },

  /**
   * Edit menu
   */
  editMenu (params) {
    // return session.post(RootAPI + 'menu/update', params)
    return upload.post(RootAPI + 'menu/update', params)
  },

  /**
   * Update order status
   */
  updateOrderStatus(params) {
    return session.post(RootAPI + 'staff/update-order-status', params)
  },

  /**
   * Search staff
   */
  searchStaff(req, param) {
    return session.post(RootAPI + 'staff/search/?limit=10&offset=' + param,  req)
  },

  /**
   * Add staff
   */
  addStaff(req) {
    return session.post(RootAPI + 'staff/add', req)
  },

  /**
   * Edit staff
   */
  editStaff(req) {
    return session.post(RootAPI + 'staff/update', req)
  },

  /**
   * Get staff detail
   */
  getStaffDetail(staffId) {
    return session.get(RootAPI + 'staff/' + staffId)
  },

  /**
   * Delete staff
   */
  deleteStaff(staffId) {
    return session.get(RootAPI + 'staff/delete/' + staffId)
  },

  /**
   * Get promotion list
   */
  getPromoList(params) {
    return session.post(RootAPI + 'promotion/staff', params)
  },
  
  /**
   * Delete promtion
   */
  deletePromo(promoId) {
    return session.get(RootAPI + 'promotion/delete/' + promoId)
  },

  /**
   * Get promotion detail
   */
  getPromoDetail(staffId) {
    return session.get(RootAPI + 'promotion/' + staffId + '/staff')
  },

  /**
   * Edit promo
   */
  editPromo(req) {
    return session.post(RootAPI + 'promotion/update', req)
  },

  /**
   * Add promo
   */
  addPromo(req) {
    return session.post(RootAPI + 'promotion/add', req)
  },

  /**
   * Get table list
   */
  getTableListOption() {
    return session.get(RootAPI + 'table/list')
  },

  /**
   * Get table list
   */
  getTableList() {
    return session.get(RootAPI + 'table/')
  },

  /**
   * Get table detail
   */
  getTableDetail(tableId) {
    return session.get(RootAPI + 'table/' + tableId)
  },

  /**
   * Edit table
   */
  editTable(req) {
    return session.post(RootAPI + 'table/update', req)
  },

  /**
   * Add table
   */
  addTable(req) {
    return session.post(RootAPI + 'table/add', req)
  },

  /**
   * Delete table
   */
  deleteTable(tableId) {
    return session.get(RootAPI + 'table/delete/' + tableId)
  },

  /**
   * Get system config
   */
  getSystemConfig() {
    return session.get(RootAPI + 'sys-config/detail')
  },

  /**
   * Save system config
   */
  saveSystemConfig(req) {
    return session.post(RootAPI + 'sys-config/add-update', req)
  },

  /**
   * Load order history
   */
  loadOrderHistory(data) {
    return session.post(RootAPI + 'staff/order-his', data)
  },

  /**
   * Save notification
   */
  saveNotification(noti) {
    return session.post(RootAPI + 'staff/add-notification', noti)
  },

  /**
   * Search topping
   */
  searchTopping() {
    return session.get(RootAPI + 'topping/list')
  },

  /**
   * Add topping
   */
  addTopping(topping) {
    return session.post(RootAPI + 'topping/add', topping)
  },

  /**
   * Get topping detail
   */
  getToppingDetail(toppingId) {
    return session.get(RootAPI + 'topping/' + toppingId)
  },

  /**
   * Update topping
   */
  updateTopping(topping) {
    return session.post(RootAPI + 'topping/update', topping)
  },

  /**
   * Delete topping
   */
  deleteTopping(toppingId) {
    return session.get(RootAPI + 'topping/delete/' + toppingId)
  },

  /**
   * Search order history
   */
  searchOrderHistory(order) {
    return session.post(RootAPI + 'staff/search-order-his', order)
  },

  /**
   * Get list promotion type
   */
  getListPromotionType() {
    return session.get(RootAPI + 'promotion/get-promo-type')
  },
}
