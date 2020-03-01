import axios from 'axios'
import Cookies from 'js-cookie'
import {Constant} from '../common/constant'

const TOKEN_NAME = Constant.TOKEN_NAME;
const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
  timeout: 5000
});

let token = Cookies.get(TOKEN_NAME);
if (token) {
  token = JSON.parse(token);
  session.defaults.headers['token'] = `${token.access_token}`
}

export default session;
