import Vue from 'vue'
import Router from 'vue-router'

import CustomerLogin from '@/views/authentication/CustomerLogin'
import StaffLogin from '@/views/authentication/StaffLogin'
import Page404 from '@/views/Page404'
import Page500 from '@/views/Page500'
import Register from '@/views/authentication/Register'
import Active from '@/views/authentication/ActiveAccount'
import ChangePass from '@/views/authentication/ChangePass'
import ActivePassword from '@/views/authentication/ActivePassword'
import HomeStaff from '@/views/staff/Home'
import CustomerHome from '@/views/customer/Home'
import Order from '@/views/customer/Order'
import Require from '@/views/customer/Require'
import Menu from '@/views/admin/menu/List'
import MenuAdd from '@/views/admin/menu/Index'
import Staff from '@/views/admin/staff/List'
import StaffAdd from '@/views/admin/staff/Index'
import Promo from '@/views/admin/promo/List'
import PromoAdd from '@/views/admin/promo/Index'
import Setting from '@/views/admin/setting/List'
import Reward from '@/views/customer/Reward'
import Point from '@/views/customer/Point'
import PromoCus from '@/views/customer/Promo'
import PromoDetail from '@/views/customer/PromoDetail'
import Store from '@/views/supperAdmin/store/List'
import StoreAdd from '@/views/supperAdmin/store/Index'
import StoreAdmin from '@/views/supperAdmin/storeAdmin/List'
import StoreAdminAdd from '@/views/supperAdmin/storeAdmin/Index'
import InfoUser from '@/components/author/InfoUser'
import Welcome from '@/views/customer/Welcome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/customer-login',
      name: 'CustomerLogin',
      component: CustomerLogin
    },
    {
      path: '/staff-login',
      name: 'StaffLogin',
      component: StaffLogin
    },
    { path: '/404', name: 'Page404', component: Page404 },
    { path: '/500', name: 'Page500', component: Page500 },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/active',
      name: 'Active',
      component: Active
    },
    {
      path: '/changepass',
      name: 'ChangePass',
      component: ChangePass
    },
    {
      path: '/activepass',
      name: 'ActivePassword',
      component: ActivePassword
    },
    {
      path: '/staff',
      name: 'HomeStaff',
      component: HomeStaff
    },
    {
      path: '/infoUser',
      name: 'InfoUser',
      component: InfoUser
    },
    {
      path: '/',
      name: 'CustomerHome',
      component: CustomerHome
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/require',
      name: 'Require',
      component: Require
    },
    {
      path: '/point',
      name: 'Point',
      component: Point
    },
    {
      path: '/promo',
      name: 'PromoCus',
      component: PromoCus
    },
    {
      path: '/menu/list',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/menu/index',
      name: 'MenuAdd',
      component: MenuAdd
    },
    {
      path: '/staff/list',
      name: 'Staff',
      component: Staff
    },
    {
      path: '/staff/index',
      name: 'StaffAdd',
      component: StaffAdd
    },
    {
      path: '/promo/list',
      name: 'Promo',
      component: Promo
    },
    {
      path: '/promo-detail/:Tab/:Pid',
      name: 'PromoDetail',
      component: PromoDetail
    },
    {
      path: '/promo/index',
      name: 'PromoAdd',
      component: PromoAdd
    },
    {
      path: '/setting/list',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/customer/reward',
      name: 'Reward',
      component: Reward
    },
    {
      path: '/store/list',
      name: 'Store',
      component: Store
    },
    {
      path: '/store/index',
      name: 'StoreAdd',
      component: StoreAdd
    },
    {
      path: '/supper/store/list',
      name: 'StoreAdmin',
      component: StoreAdmin
    },
    {
      path: '/supper/store/index',
      name: 'StoreAdminAdd',
      component: StoreAdminAdd
    }
  ]
})

