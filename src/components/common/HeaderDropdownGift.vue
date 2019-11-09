<template>
  <AppHeaderDropdown
    right
    no-caret
  >
    <template slot="header">
      <span class="white mr-3">
        <i class="fa fa-gift fa-2x"/>
      </span>
    </template>
    <template slot="dropdown">
      <b-dropdown-item href="/point"> Điểm
      </b-dropdown-item>
      <b-dropdown-item href="/promo"> Khuyến Mãi
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import Cookies from 'js-cookie'
var jwtDecode = require('jwt-decode')
export default {
  name: 'DefaultHeaderDropdownGift',
  components: {
    AppHeaderDropdown
  },
  data: function() {
    return{

    }
  },
  methods: {
  }
}
</script>
