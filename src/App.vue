<template>
  <div class="app">
    <template v-if="this.$route.name != 'Login'">

      <AppHeader fixed v-if="this.$store.state.user == null">
        <div class="container">
          <b-link class="navbar-brand" to="/">
            CusRes
          </b-link>
          <a href="/staff-login" class="pull-left white">Nhân Viên</a>
          <b-navbar-nav class="ml-auto">
            <a href="/customer-login" class="pull-right white">Đăng Nhập &nbsp; /</a>
            <a href="/register" class="pull-right white"> &nbsp; Đăng Ký Tài Khoản</a>
          </b-navbar-nav>
        </div>
      </AppHeader>

       <!-- đăng nhập xong sẽ dùng đoạn code bên dưới -->
      <AppHeader fixed v-if="this.$store.state.user">
        <SidebarToggler
          class="d-none"
          :default-open="true"
        />
        <b-link class="navbar-brand" to="/">
          CusRes
        </b-link>

        <b-navbar-nav>
          <!-- hiện cho template customer -->
           <HeaderDropdownGift v-if="this.$store.state.user.userType == 'customer'"/>
             <span class="white" v-if="this.$store.state.user.userType == 'customer'">
               <i class="fa fa-bell fa-2x"></i>
             </span>
           <HeaderDropdownCusAcc v-if="this.$store.state.user.userType == 'customer'"/>
          <!-- end -->

          <!-- hiện cho template staff -->
          <template>
            <span class="white"  v-if="this.$store.state.user.userType == 'staff'">
              {{ this.$store.state.user.userName }}
            </span>
            <HeaderDropdownStaffAcc  v-if="this.$store.state.user.userType == 'staff'"/>
          </template>
          <!-- end -->
        </b-navbar-nav>
      </AppHeader>

      <div class="app-body" >
        <template v-if="this.$store.state.user && this.$store.state.user.role == 'ADMIN'">
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

        <template v-if="this.$store.state.user && this.$store.state.user.role == 'SUPPER_ADMIN'">
          <AppSidebar fixed>
            <SidebarHeader />
            <SidebarForm />
              <template>
                <SidebarNav :nav-items="navSpAdmin" />
              </template>
            <SidebarFooter />
            <SidebarMinimizer />
          </AppSidebar>
        </template>

        <main class="main">
          <router-view />
        </main>
        <!--<AppAside fixed>-->
          <!--&lt;!&ndash;aside&ndash;&gt;-->
          <!--<DefaultAside />-->
        <!--</AppAside>-->
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
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import navSpAdmin from '@/navSpAdmin'
import navAdmin from '@/navAdmin'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import HeaderDropdownCusAcc from '@/components/common/HeaderDropdownCusAcc'
import HeaderDropdownStaffAcc from '@/components/common/HeaderDropdownStaffAcc'
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
    HeaderDropdownCusAcc,
    HeaderDropdownStaffAcc,
    HeaderDropdownGift,
    DefaultAside,
    QrcodeVue,
    AppHeaderDropdown
  },
  data () {
    return {
      language: 'en',
      navSpAdmin: navSpAdmin.items,
      navAdmin: navAdmin.items,
      fullName: '',
      value: 'https://www.facebook.com/tanarmy77',
      size: 40,
    }
  },
  mounted (){
  },
  activated () {
    this.mounted()
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
  },
  methods: {
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
