import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/authentication/Login'
import Page404 from '@/views/Page404'
import Page500 from '@/views/Page500'
import ChangePassword from '@/components/author/ChangePassword'
import InfoUser from '@/components/author/InfoUser'
import Welcome from '@/components/author/Welcome'
import GuestManagement from '@/views/staff/guest/GuestManagement'
import GuestDetail from '@/views/staff/guest/GuestDetail'
import PromotionIndex from '@/views/staff/promotion/PromotionIndex'
import PromotionManagement from '@/views/staff/promotion/PromotionManagement'
import Membership from '@/views/staff/management/Membership'
import Level from '@/views/staff/management/Level'
import Payment from '@/views/staff/management/Payment'
import Home from '@/views/admin/Home'
import AccountManagement from '@/views/admin/account/AccountManagement'
import AccountIndex from '@/views/admin/account/AccountIndex'
import RoleManagement from '@/views/admin/role/RoleManagement'
import RoleIndex from '@/views/admin/role/RoleIndex'
import StoreManagement from '@/views/admin/store/StoreManagement'
import Brand from '@/views/admin/store/Brand'
import StoreIndex from '@/views/admin/store/StoreIndex'
import Location from '@/views/admin/store/Location'
import testForm from '@/components/author/testForm'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '/404', name: 'Page404', component: Page404 },
    { path: '/500', name: 'Page500', component: Page500 },
    {
      path: '/changePassword',
      name: 'Change Password',
      component: ChangePassword
    },
    {
      path: '/infoUser',
      name: 'Information User',
      component: InfoUser
    },
    {
      path: '/guest-management',
      name: 'GuestManagement',
      component: GuestManagement
    },
    {
      path: '/guest-detail/:tab/:Cid',
      name: 'GuestDetail',
      component: GuestDetail
    },
    {
      path: '/promotion-index',
      name: 'PromotionIndex',
      component: PromotionIndex
    },
    {
      path: '/promotion-management',
      name: 'PromotionManagement',
      component: PromotionManagement
    },
    {
      path: '/membership-management',
      name: 'Membership',
      component: Membership
    },
    {
      path: '/level-management',
      name: 'Level',
      component: Level
    },
    {
      path: '/payment-management/:payId',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/account-management',
      name: 'AccountManagement',
      component: AccountManagement
    },
    {
      path: '/account-index',
      name: 'AccountIndex',
      component: AccountIndex
    },
    {
      path: '/role-management',
      name: 'RoleManagement',
      component: RoleManagement
    },
    {
      path: '/role-index',
      name: 'RoleIndex',
      component: RoleIndex
    },
    {
      path: '/store-management',
      name: 'StoreManagement',
      component: StoreManagement
    },
    {
      path: '/brand',
      name: 'Brand',
      component: Brand
    },
    {
      path: '/store-index',
      name: 'StoreIndex',
      component: StoreIndex
    },
    {
      path: '/location',
      name: 'Location',
      component: Location
    },
    {
      path: '/testForm',
      name: 'Test',
      component: testForm
    }
  ]
})

