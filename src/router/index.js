import Vue from 'vue'
import Router from 'vue-router'

// Authenticate group
import CustomerLogin from '@/views/authentication/CustomerLogin'
import StaffLogin from '@/views/authentication/StaffLogin'
import Register from '@/views/authentication/Register'
import ActiveAccount from '@/views/authentication/ActiveAccount'
import CustomerChangePass from '@/views/authentication/CustomerChangePass'
import StaffChangePass from '@/views/authentication/StaffChangePass'
import StaffActivePass from '@/views/authentication/StaffActivePass'
import StaffForgetPass from '@/views/authentication/StaffForgetPass'
import CustomerForgetPass from '@/views/authentication/CustomerForgetPass'
import CustomerActivePass from '@/views/authentication/CustomerActivePass'

// Customer group
import InfoUser from '@/components/author/InfoUser'
import Welcome from '@/views/customer/Welcome'
import Reward from '@/views/customer/Reward'
import Point from '@/views/customer/Point'
import PromoCus from '@/views/customer/Promo'
import PromoDetail from '@/views/customer/PromoDetail'
import CustomerHome from '@/views/customer/Home'
import Order from '@/views/customer/Order'
import Require from '@/views/customer/Require'

// Staff group
import HomeStaff from '@/views/staff/Home'

// Admin group
import HomeAdmin from '@/views/admin/HomeAdmin'
import Topping from '@/views/admin/topping/List'
import ToppingAdd from '@/views/admin/topping/Index'
import Menu from '@/views/admin/menu/List'
import MenuAdd from '@/views/admin/menu/Index'
import Staff from '@/views/admin/staff/List'
import StaffAdd from '@/views/admin/staff/Index'
import Promo from '@/views/admin/promo/List'
import PromoAdd from '@/views/admin/promo/Index'
import Table from '@/views/admin/table/List'
import TableAdd from '@/views/admin/table/Index'
import Setting from '@/views/admin/setting/List'
import PrintQrCode from '@/views/admin/qrCode/PrintQrCode'

// Super admin group
import HomeSPAdmin from '@/views/supperAdmin/HomeSPAdmin'
import Store from '@/views/supperAdmin/store/List'
import StoreAdd from '@/views/supperAdmin/store/Index'
import StoreAdmin from '@/views/supperAdmin/storeAdmin/List'
import StoreAdminAdd from '@/views/supperAdmin/storeAdmin/Index'

// Error group
import Page404 from '@/views/Page404'
import Page500 from '@/views/Page500'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [

    // Authenticate group
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
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activeaccount',
      name: 'ActiveAccount',
      component: ActiveAccount
    },
    {
      path: '/cus-changepass',
      name: 'CustomerChangePass',
      component: CustomerChangePass
    },
    {
      path: '/staff-changepass',
      name: 'StaffChangePass',
      component: StaffChangePass
    },
    {
      path: '/cus-forgetpass',
      name: 'CustomerForgetPass',
      component: CustomerForgetPass
    },
    {
      path: '/cus-active-pass',
      name: 'CustomerActivePass',
      component: CustomerActivePass
    },
    {
      path: '/staff-forgetpass',
      name: 'StaffForgetPass',
      component: StaffForgetPass
    },
    {
      path: '/staff-activepass',
      name: 'StaffActivePass',
      component: StaffActivePass
    },

    // Customer group
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
      path: '/store/:sid/table/:tid',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/menu',
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
      path: '/customer/reward',
      name: 'Reward',
      component: Reward
    },

    // Staff group
    {
      path: '/home-staff',
      name: 'HomeStaff',
      component: HomeStaff
    },

    // Admin group
    {
      path: '/home-admin',
      name: 'HomeAdmin',
      component: HomeAdmin
    },
    {
      path: '/topping/list',
      name: 'Topping',
      component: Topping
    },
    {
      path: '/topping/index',
      name: 'ToppingAdd',
      component: ToppingAdd
    },
    {
      path: '/menu/list',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/menu/add',
      name: 'MenuAdd',
      component: MenuAdd
    },
    {
      path: '/menu/edit/:id',
      name: 'MenuEdit',
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
      path: '/staff/index/:id',
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
      path: '/table/list',
      name: 'Table',
      component: Table
    },
    {
      path: '/table/index',
      name: 'TableAdd',
      component: TableAdd
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/print-qr-code',
      name: 'PrintQrCode',
      component: PrintQrCode
    },

    // Super admin group
    {
      path: '/home-sp-admin',
      name: 'HomeSPAdmin',
      component: HomeSPAdmin
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
      path: '/admin-store/list',
      name: 'StoreAdmin',
      component: StoreAdmin
    },
    {
      path: '/admin-store/index',
      name: 'StoreAdminAdd',
      component: StoreAdminAdd
    },

    // Error group

    { path: '/404', name: 'Page404', component: Page404 },
    { path: '/500', name: 'Page500', component: Page500 },
  ]
})

