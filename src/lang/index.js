import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import Vietnamese from './src/vi'
// import English from './src/en'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    vi: {
      'dashboard': 'bảng điều khiển'
    },
    en: {
      'dashboard': 'dashboard'
    },
    jp: {
      'dashboard': 'ダッシュボード'
    }
  }
})
