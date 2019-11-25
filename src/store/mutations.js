import Cookies from 'js-cookie';
import session from '../api/session';
import {Constant} from '../common/constant'

const TOKEN_NAME = Constant.TOKEN_NAME;
const APP_USR = Constant.APP_USR
const STORE_ID = Constant.STORE_ID
const TABLE_ID = Constant.TABLE_ID

export default {
  updateUser(state, user) {
    Cookies.set(APP_USR, user, { expires: 365 });
    state.user = user;
  },

  updateToken(state, data) {
    const token = data
    Cookies.set(TOKEN_NAME, token, { expires: 365 });
    session.defaults.headers['token'] = `${token}`
    state.token = token;
  },

  updateStore(state, store) {
    Cookies.set(STORE_ID, store, { expires: 365 })
    state.store = store;
  },

  updateTable(state, table) {
    Cookies.set(TABLE_ID, table, { expires: 365 })
    state.table = table;
  },

  removeToken(state) {
    // Removes token
    Cookies.remove(TOKEN_NAME);
    state.token = null;
    // Removes user
    Cookies.remove(APP_USR);
    state.user = null;
  }
}
