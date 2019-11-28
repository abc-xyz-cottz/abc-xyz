import session from './session'
import { RootAPI } from './index'

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
    return session.post(RootAPI + 'menu/add', params)
  },

  /**
   * Edit menu
   */
  editMenu (params) {
    return session.post(RootAPI + 'menu/update', params)
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
  searchStaff(req) {
    return session.post(RootAPI + 'staff/search/?limit=10&offset=0', req)
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
}
