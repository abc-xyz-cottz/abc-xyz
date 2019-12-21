<template>
  <div class="app">
    <template v-if="this.$route.name != 'Login'">

      <AppHeader fixed v-if="this.$store.state.user == null">
        <div class="container">
          <b-link class="navbar-brand" to="/">
            <span>
              <i class="fa fa-home fa-2x" />
            </span>
          </b-link>

          <b-navbar-nav>
            <!-- hiện cho template customer -->
             <HeaderDropdownContact class="text-left"/>
             <HeaderDropdownLogin />
            <!-- end -->
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
          <span>
            <i class="fa fa-home fa-2x" />
          </span>
        </b-link>

        <b-navbar-nav>
          <HeaderDropdownContact class="text-left ml-3"/>
          <!-- hiện cho template customer -->
           <HeaderDropdownGift v-if="this.$store.state.user.userType == 'customer'"/>
             <span class="white" v-if="this.$store.state.user.userType == 'customer'">
               <span class="fa-stack" :data-count="notifyNumber">
                 <a href="/notification"><i class="fa fa-bell fa-2x"></i></a>
               </span>
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
        <template v-if="this.$store.state.user && this.$store.state.user.role == roleAdmin">
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

        <template v-if="this.$store.state.user && this.$store.state.user.role == roleSpAdmin">
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
import navSpAdmin from '@/navSpAdmin'
import navAdmin from '@/navAdmin'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav } from '@coreui/vue'
import HeaderDropdownCusAcc from '@/components/common/HeaderDropdownCusAcc'
import HeaderDropdownStaffAcc from '@/components/common/HeaderDropdownStaffAcc'
import HeaderDropdownGift from '@/components/common/HeaderDropdownGift'
import HeaderDropdownContact from '@/components/common/HeaderDropdownContact'
import HeaderDropdownLogin from '@/components/common/HeaderDropdownLogin'
import {Constant} from '@/common/constant'
import Cookies from 'js-cookie'
import { RootAPI } from '@/api/index'
import customerAPI from '@/api/customer'


export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    HeaderDropdownCusAcc,
    HeaderDropdownStaffAcc,
    HeaderDropdownGift,
    HeaderDropdownContact,
    HeaderDropdownLogin
  },
  data () {
    return {
      language: 'en',
      navSpAdmin: navSpAdmin.items,
      navAdmin: navAdmin.items,
      fullName: '',
      size: 40,
      roleAdmin: Constant.ROLE_ADMIN,
      roleSpAdmin: Constant.ROLE_SP_ADMIN,
      notifyNumber: 0
    }
  },
  mounted (){

    let user = Cookies.get(Constant.APP_USR)
    if(user && user.userType == "customer") {

      let numberOfNotify = Cookies.get(Constant.NOTIFY_NUMBER)
      if(!numberOfNotify) {
        this.countNotificationNotRead()
      }
      this.notifyNumber = numberOfNotify

      user = JSON.parse(user)
      let phoneNumber = user.phoneNumber
      let cityId = user.cityId

      let api = RootAPI.replace("http://", "").replace("https://", "").replace("/api/", "")
      var socket = new WebSocket("ws://" + api + "/join-group/cus-" + phoneNumber + "-" + cityId)

      socket.onopen = event => {
          console.log('connected')
          this.connected = true
          socket.send({})
      }

      socket.onmessage = event => {

        var json_data = JSON.parse(event.data)
        console.log(json_data)
        alert(JSON.stringify(json_data))
        let numberOfNotification = json_data.text.numberOfNotification
        Cookies.set(Constant.NOTIFY_NUMBER, numberOfNotification)

        this.notifyNumber = numberOfNotification

      }

      socket.onclose = event => {
        this.connected = false
      }
    }

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
    /**
     * Load notification
     */
      countNotificationNotRead() {

        customerAPI.countNotificationNotRead().then(res => {
          let numberOfNotification = res.data.data
          this.notifyNumber = numberOfNotification
          Cookies.set(Constant.NOTIFY_NUMBER, numberOfNotification)

        }).catch(err => {
          console.log(err)
        })
      }
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

  .fa-stack[data-count]:after{
    position:absolute;
    right:0%;
    top:1%;
    content: attr(data-count);
    font-size:50%;
    padding:.6em;
    border-radius:999px;
    line-height:.75em;
    color: white;
    background:rgba(255,0,0,.85);
    text-align:center;
    min-width:2em;
    font-weight:bold;
  }
</style>
