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
    return session.post(RootAPI + 'menu/update', params)
  }
}
