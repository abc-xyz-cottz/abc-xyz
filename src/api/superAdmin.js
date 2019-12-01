import session from './session'
import { RootAPI } from './index'

export default {
  /**
   * Get Store List
   */
  getStoreList (req) {
    return session.post(RootAPI + 'store/search/?limit=10&offset=0', req)
  },

  /**
   * Delete store
   */
  deleteStore(storeId) {
    return session.get(RootAPI + 'store/delete/' + storeId)
  },

  /**
   * Get store detail
   */
  getStoreDetail(storeId) {
    return session.get(RootAPI + 'store/' + storeId)
  },

  /**
   * Edit store
   */
  editStore(req) {
    return session.post(RootAPI + 'store/update', req)
  },

  /**
   * Add store
   */
  addStore(req) {
    return session.post(RootAPI + 'store/add', req)
  },

  /**
   * Delete admin store
   */
  deleteAdminStore(storeId) {
    return session.get(RootAPI + 'admin-store/delete/' + storeId)
  },

  /**
   * search admin store
   */
  searchAdminStore(req) {
    return session.post(RootAPI + 'admin-store/search/?limit=10&offset=0', req)
  },

    /**
   * Get admin store detail
   */
  getAdminStoreDetail(adminStoreId) {
    return session.get(RootAPI + 'admin-store/' + adminStoreId)
  },

  /**
   * Edit admin store
   */
  editAdminStore(req) {
    return session.post(RootAPI + 'admin-store/update', req)
  },

  /**
   * Add admin store
   */
  addAdminStore(req) {
    return session.post(RootAPI + 'admin-store/add', req)
  },
}
