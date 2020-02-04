<template>
  <div class="app">
    <template v-if="this.$route.name != 'Login'">
      <AppHeader fixed v-if="this.$store.state.user == null" class="header-custom">
        <div class="container">
          <div class="nav-left">
            <button @click="activePushedMenu = !activePushedMenu" display="lg" type="button" class="navbar-toggler">
                <!--<span class="navbar-toggler-icon"></span>-->
              <img src="/static/img/icons/menu.ico" class="iconsCustom"/>
              </button>

            <b-link class="nav-link home-icon" to="/">
                <!--<span>-->
                  <!--<i class="fa fa-home fa-2x" ></i>-->
                <!--</span>-->
              <img src="/static/img/icons/home.ico" class="iconsCustom"/>
            </b-link>
          </div>
        </div>
      </AppHeader>

       <!-- đăng nhập xong sẽ dùng đoạn code bên dưới -->
      <AppHeader fixed v-if="this.$store.state.user"  class="header-custom">
        <div class="container">
          <div class="nav-left">
            <button @click="activePushedMenu = !activePushedMenu" display="lg" type="button" class="navbar-toggler"
                    v-if="this.$store.state.user.role == roleAdmin || this.$store.state.user.role == roleSpAdmin || this.$store.state.user.role == roleCus">
              <!--<span class="navbar-toggler-icon"></span>-->
              <img src="/static/img/icons/menu.ico" class="iconsCustom"/>
            </button>
            <b-link class="nav-link home-icon" to="/">
              <!--<span>-->
                <!--<i class="fa fa-home fa-2x" ></i>-->
              <!--</span>-->
              <img src="/static/img/icons/home.ico" class="iconsCustom"/>
            </b-link>
          </div>

        <b-navbar-nav>
          <!-- hiện cho template customer -->
           <HeaderDropdownGift v-if="this.$store.state.user.userType == 'customer'"/>
          <li>
            <a href="/notification">
              <span class="white" v-if="this.$store.state.user.userType == 'customer'">
               <span class="fa-stack" :data-count="notifyNumber">
                   <!--<i src="/static/img/icons/bell.png" class="iconsCustom"></i>-->
                   <img src="/static/img/icons/bell.png" class="iconsCustom"/>
               </span>
             </span>
            </a>
          </li>

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
        </div>
      </AppHeader>

      <div class="app-body" >
        <template >
          <AppSidebar fixed :class="{ 'active': activePushedMenu }">
            <SidebarHeader />
            <SidebarForm />
              <template>
                <SidebarNav v-if="!this.$store.state.user" :nav-items="navCusNotLogin" />
                <SidebarNav v-if="this.$store.state.user && this.$store.state.user.role == roleCus" :nav-items="navCus" />
                <SidebarNav v-if="this.$store.state.user && this.$store.state.user.role == roleAdmin" :nav-items="navAdmin" />
                <SidebarNav  v-if="this.$store.state.user && this.$store.state.user.role == roleSpAdmin"  :nav-items="navSpAdmin"/>
              </template>
            <SidebarFooter />
            <SidebarMinimizer />
          </AppSidebar>
        </template>

        <main class="main">
          <router-view />
        </main>

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
import navCusNotLogin from '@/navCusNotLogin'
import navCus from '@/navCus'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav } from '@coreui/vue'
import HeaderDropdownCusAcc from '@/components/common/HeaderDropdownCusAcc'
import HeaderDropdownStaffAcc from '@/components/common/HeaderDropdownStaffAcc'
import HeaderDropdownGift from '@/components/common/HeaderDropdownGift'
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
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    HeaderDropdownCusAcc,
    HeaderDropdownStaffAcc,
    HeaderDropdownGift
  },
  data () {
    return {
      language: 'en',
      navCus: navCus.items,
      navCusNotLogin: navCusNotLogin.items,
      navSpAdmin: navSpAdmin.items,
      navAdmin: navAdmin.items,
      fullName: '',
      size: 40,
      roleCus: Constant.ROLE_CUS,
      roleAdmin: Constant.ROLE_ADMIN,
      roleSpAdmin: Constant.ROLE_SP_ADMIN,
      notifyNumber: 0,
      activePushedMenu: false
    }
  },
  watch: {
    '$route' (newVal, oldVal) {
      this.activePushedMenu = false
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
  .nav-left {
    display: flex;
    align-content: center;
    .home-icon {
      padding: .5rem .5rem .5rem .2rem;
    }
  }
  .app-body .sidebar.active {
    margin-left: 0;
  }
  .header-custom {
    background-color: #444444 !important;
  }
  .iconsCustom {
    width: 40px;
    height: 40px;
  }
  .inline-center {
    display: flex;
    align-items: center;
  }
  .default-btn-bg {
    background-color: #444444 !important;
  }
</style>
