/* eslint-disable vue/order-in-components */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Import VueBoostrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

// Import print component
import Print from 'vue-print-nb'
Vue.use(Print);

// Global components
// import LazyImage from '@/components/common/LazyImage'
// Vue.component('lazy-img', LazyImage)

// Import Global Filters
import '@/filters'

// Multilanguages
// import i18n from '@/lang'
import VueI18n from 'vue-i18n';
import vnMessage from '@/lang/lang_vn.json';
import enMessage from '@/lang/lang_en.json';
Vue.use(VueI18n);

// 
import * as svgicon from 'vue-svgicon'
import './icons.js'

Vue.use(svgicon, {
  tagName: 'icon'
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // if (!store.state.token && to.path !== '/login') {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath }
  //   })
  // } else {
    next()
  // }
});

const messages = {
  vn: vnMessage,
  en: enMessage,
}
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages,
  fallbackLocale: 'en',
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n, // Multilanguages
  template: '<App/>',
  components: { App }
});
