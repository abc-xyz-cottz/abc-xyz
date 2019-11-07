import Cookies from 'js-cookie';
import session from '../api/session';
import {Constant} from '../common/constant'

const TOKEN_NAME = Constant.TOKEN_NAME;
const APP_USR = Constant.APP_USR;

export default {
  updateUser(state, user) {
    Cookies.set(APP_USR, user, { expires: 365 });
    state.user = user;
  },

  updateToken(state, data) {
    console.log(data)
    const token = {access_token: data.access_token, refresh_token: data.refresh_token};
    Cookies.set(TOKEN_NAME, token, { expires: 365 });
    session.defaults.headers['token'] = `${token.access_token}`
    state.token = token;
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
