import Vue from 'vue'
import Router from 'vue-router'

// Customer group
import InfoUser from '@/views/customer/InfoUser'
import Welcome from '@/views/customer/Welcome'
import Reward from '@/views/customer/Reward'
import Point from '@/views/customer/Point'
import PromoCus from '@/views/customer/Promo'
import PromoDetail from '@/views/customer/PromoDetail'
import CustomerHome from '@/views/customer/Home'
import Order from '@/views/customer/Order'
import Require from '@/views/customer/Require'
import Notification from '@/views/customer/Notification'
import CustomerLogin from '@/views/customer/CustomerLogin'
import Register from '@/views/customer/Register'
import ActiveAccount from '@/views/customer/ActiveAccount'
import CustomerChangePass from '@/views/customer/CustomerChangePass'
import CustomerForgetPass from '@/views/customer/CustomerForgetPass'
import CustomerActivePass from '@/views/customer/CustomerActivePass'

// Staff group
import HomeStaff from '@/views/staff/Home'
import StaffLogin from '@/views/staff/StaffLogin'
import StaffChangePass from '@/views/staff/StaffChangePass'
import StaffActivePass from '@/views/staff/StaffActivePass'
import StaffForgetPass from '@/views/staff/StaffForgetPass'

// Admin group
import HomeAdmin from '@/views/admin/HomeAdmin'
import Topping from '@/views/admin/topping/List'
import ToppingAdd from '@/views/admin/topping/Index'
import Menu from '@/views/admin/menu/List'
import MenuAdd from '@/views/admin/menu/MenuIndex'
import Staff from '@/views/admin/staff/List'
import StaffAdd from '@/views/admin/staff/Index'
import Promo from '@/views/admin/promo/List'
import PromoAdd from '@/views/admin/promo/Index'
import Table from '@/views/admin/table/List'
import TableAdd from '@/views/admin/table/Index'
import Setting from '@/views/admin/setting/List'
import PrintQrCode from '@/views/admin/qrCode/PrintQrCode'
import ManNotification from '@/views/admin/notification/Index'

// Super admin group
import HomeSPAdmin from '@/views/supperAdmin/HomeSPAdmin'
import Store from '@/views/supperAdmin/store/List'
import StoreAdd from '@/views/supperAdmin/store/Index'
import StoreAdmin from '@/views/supperAdmin/storeAdmin/List'
import StoreAdminAdd from '@/views/supperAdmin/storeAdmin/Index'

// Common
import Page404 from '@/views/common/Page404'
import Page500 from '@/views/common/Page500'
import Contact from '@/views/common/contact'
import AboutUs from '@/views/common/aboutUs'

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
      path: '/active-account',
      name: 'ActiveAccount',
      component: ActiveAccount
    },
    {
      path: '/cus-change-password',
      name: 'CustomerChangePass',
      component: CustomerChangePass
    },
    {
      path: '/staff-change-password',
      name: 'StaffChangePass',
      component: StaffChangePass
    },
    {
      path: '/cus-forget-password',
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
      path: '/user-info',
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
    {
      path: '/notification',
      name: 'Notification',
      component: Notification
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
      path: '/topping/add',
      name: 'ToppingAdd',
      component: ToppingAdd
    },
    {
      path: '/topping/edit/:id',
      name: 'ToppingEdit',
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
      name: 'StaffEdit',
      component: StaffAdd
    },
    {
      path: '/promo/list',
      name: 'Promo',
      component: Promo
    },
    {
      path: '/promo-detail/:Tab/:id',
      name: 'PromoDetail',
      component: PromoDetail
    },
    {
      path: '/promo/index',
      name: 'PromoAdd',
      component: PromoAdd
    },
    {
      path: '/promo/index/:id',
      name: 'PromoEdit',
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
      path: '/table/index/:id',
      name: 'TableEdit',
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
    {
      path: '/man-notification',
      name: 'ManNotification',
      component: ManNotification
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
      path: '/store/index/:id',
      name: 'StoreEdit',
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
    {
      path: '/admin-store/index/:id',
      name: 'StoreAdminEdit',
      component: StoreAdminAdd
    },

    // Common
    { path: '/404', name: 'Page404', component: Page404 },
    { path: '/500', name: 'Page500', component: Page500 },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/about-us', name: 'AboutUs', component: AboutUs },
  ]
})

