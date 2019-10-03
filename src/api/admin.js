import session from './session'
import { RootAPI } from './index'

export default {
    /**
   * Search role
   */
  searchRole (params) {
    return session.post(RootAPI + 'role/search/'+ params)
  },
}