import Cookies from 'js-cookie';
import {Constant} from '../common/constant'

const TOKEN_NAME = Constant.TOKEN_NAME;
const APP_USR = Constant.APP_USR;

export default {
  user: Cookies.get(APP_USR) ? JSON.parse(Cookies.get(APP_USR)) : null,
  token: Cookies.get(TOKEN_NAME) ? JSON.parse(Cookies.get(TOKEN_NAME)) : null,
}
