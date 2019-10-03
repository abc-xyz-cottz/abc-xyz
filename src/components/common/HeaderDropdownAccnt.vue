<template>
  <AppHeaderDropdown
    right
    no-caret
  >
    <template slot="header">
      <span>
        <i class="fa fa-user fa-3x" />
      </span>
    </template>
    <template slot="dropdown">
      <b-dropdown-item href="/#/infoUser">
        <i class="fa fa-user" /> Profile
        
      </b-dropdown-item>
      <b-dropdown-item href="/#/changePassword">
        <i class="fa fa-wrench" /> Change Password
      </b-dropdown-item>
      <b-dropdown-item @click.prevent="logOut"><i class="fa fa-lock" /> Logout</b-dropdown-item>
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
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
