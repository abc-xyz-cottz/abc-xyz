<template>
  <div class="app">
    <template>
      <AppHeader fixed>
        <SidebarToggler
          class="d-lg-none"
          display="md"
          mobile
        />
        <SidebarToggler
          class="d-md-down-none"
          display="lg"
          :default-open="true"
        />
        <b-link class="navbar-brand">
          RS
        </b-link>
        <b-navbar-nav class="ml-auto">
          <HeaderDropdownAccnt />
        </b-navbar-nav>
      </AppHeader>
      <div class="app-body">
        <AppSidebar fixed>
          <SidebarHeader />
          <SidebarForm />
          <!-- <template v-if="this.$store.state.user.roleCode == 'STAFF'"> -->
          <template>
            <!-- <SidebarNav :nav-items="nav" /> -->
          </template>
          <!-- <template v-if="this.$store.state.user.roleCode == 'ADMIN'"> -->
          <template>
            <SidebarNav :nav-items="navAdmin" />
          </template>
          <SidebarFooter />
          <SidebarMinimizer />
        </AppSidebar>
        <main class="main">
          <router-view />
        </main>
        <AppAside fixed>
          <!--aside-->
          <DefaultAside />
        </AppAside>
      </div>
      <!-- <TheFooter> -->
        <!--footer-->
        <!-- <div>
          <span class="ml-1"> RS </span> -->
        <!-- </div>
        <div class="ml-auto">
          UI 12/10
        </div> -->
      <!-- </TheFooter> -->
    </template>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import nav from '@/navigations'
import navAdmin from '@/navAdmin'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import HeaderDropdownAccnt from '@/components/common/HeaderDropdownAccnt'
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
