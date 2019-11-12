<template>
  <AppHeaderDropdown
    right
    no-caret
  >
    <template slot="header">
      <span>
        <i class="fa fa-user fa-2x" />
      </span>
    </template>
    <template slot="dropdown">
      <b-dropdown-item @click.prevent="goToChangePass">Đổi Mật Khẩu
      </b-dropdown-item>
      <b-dropdown-item @click.prevent="logOut">Thoát</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import Cookies from 'js-cookie'
var jwtDecode = require('jwt-decode')
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: function() {
    return{

    }
  },
  methods: {
    logOut () {
      this.$store.commit('removeToken');
      // this.$router.push("/")
      window.location.replace("/staff-login")
    },
    goToChangePass () {
      this.$router.push('/staff-changepass')
    }
  }
}
</script>
