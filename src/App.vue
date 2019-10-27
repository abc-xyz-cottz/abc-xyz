<template>
  <div class="app">
    <template v-if="this.$route.name != 'Login'">

      <!-- <AppHeader fixed>
        <div class="container">
          <a href="#/staff-login" class="pull-left white">Nhân Viên</a>
          <b-navbar-nav class="ml-auto">
            <a href="#/login" class="pull-right white">Đăng Nhập &nbsp; /</a>
            <a href="#/register" class="pull-right white"> &nbsp; Đăng Ký Tài Khoản</a>
          </b-navbar-nav>
        </div>
      </AppHeader> -->
      <!-- đăng nhập xong sẽ dùng đoạn code bên dưới -->
      <AppHeader fixed>
        <b-link class="navbar-brand">
          RS
        </b-link>
        <b-navbar-nav class="ml-auto">
          <HeaderDropdownGift />
          <span class="white">
            <i class="fa fa-bell fa-2x"></i>
          </span>
          <HeaderDropdownAccnt />
        </b-navbar-nav>
      </AppHeader>

      <div class="app-body">
        <template v-if="this.$route.name == 'Admin'">
          <AppSidebar fixed>
            <SidebarHeader />
            <SidebarForm />
              <template>
                <SidebarNav :nav-items="navAdmin" />
              </template>
            <SidebarFooter />
            <SidebarMinimizer />
          </AppSidebar>
        </template>
        <template v-if="this.$route.name == 'SuperAdmin'">
          <AppSidebar fixed>
            <SidebarHeader />
            <SidebarForm />
              <template>
                <SidebarNav :nav-items="nav" />
              </template>
            <SidebarFooter />
            <SidebarMinimizer />
          </AppSidebar>
        </template>
        <main class="main">
          <router-view />
        </main>
        <AppAside fixed>
          <!--aside-->
          <DefaultAside />
        </AppAside>
      </div>
    </template>
    <template v-if="this.$route.name == 'Login'">
      <main class="main">
        <router-view />
      </main>
    </template>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import nav from '@/navigations'
import navAdmin from '@/navAdmin'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import HeaderDropdownAccnt from '@/components/common/HeaderDropdownAccnt'
import HeaderDropdownGift from '@/components/common/HeaderDropdownGift'
import DefaultAside from '@/components/common/DefaultAside'
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'App',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    HeaderDropdownAccnt,
    HeaderDropdownGift,
    DefaultAside,
    QrcodeVue
  },
  data () {
    return {
      language: 'en',
      nav: nav.items,
      navAdmin: navAdmin.items,
      fullName: '',
      value: 'https://www.facebook.com/tanarmy77',
      size: 40
    }
  },
  mounted (){
    // alert(this.$route.name)
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    }
  },
  created () {
    // this.fetchLanguageFromCookie()
  },
  methods: {
    // fetchLanguageFromCookie () {
    //   var language = Cookies.get('language')
    //   if (language) {
    //     this.language = language
    //     this.$i18n.locale = language
    //   }
    // }
  }
}
</script>

<style lang="scss">
// CoreUI Icons Set
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome';
  @import '~bootstrap-vue/dist/bootstrap-vue';
  @import 'assets/scss/style';
  @import 'assets/scss/rsw';
</style>
