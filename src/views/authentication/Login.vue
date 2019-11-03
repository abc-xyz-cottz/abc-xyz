<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body class="pb-2">
                <b-form @submit.prevent="logIn">
                  <h2>
                    {{ $t(login.title) }}
                  </h2>
                  <div class="form-group">
                    <label>{{ $t(login.label.phone) }}</label><span class="error-sybol"></span>
                    <input
                      id="phone"
                      v-model="inputs.phone_number"
                      type="text"
                      class="form-control">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPhone">
                      {{ login.commons.requiredPhone }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>{{ $t(login.label.password) }}</label><span class="error-sybol"></span>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPassword">
                      {{ login.commons.requiredPassword }}
                    </b-form-invalid-feedback>
                  </div>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2 align-self-center text-center">
                      <b-button
                        variant="primary"
                        class="px-4 "
                        @click.prevent="logIn">
                        {{ onLogin ? $t(login.commons.onLogging) : $t(login.commons.onLogin) }}
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2 align-self-center">
                      <a href="#/register" class="pull-left pt-2">Đăng Ký Tài Khoản</a>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2 align-self-center">
                      <a href="#/changepass" class="pull-left pt-2">Quên Mật Khẩu</a>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AuthenticationAPI from '@/api/authentication'
import Mapper from '@/common/mapper'
import { QrcodeStream } from 'vue-qrcode-reader'
import lang_vn from "@/lang/lang_vn.json";
export default {
  name: 'Login',
  data () {
    return {
      inputs: {
        phone_number: null,
        password: null
      },
      code: '',
      onLogin: false,
      selected: '',
      onShowQRCode: false,
      login: lang_vn.login,
      click: false,
    }
  },
  components: {
    QrcodeStream
  },
  computed: {
    errorPhone: function () {
      return this.checkInfo(this.inputs.phone_number)
    },
    errorPassword: function () {
      return this.checkInfo(this.inputs.password)
    },
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },

    checkValidate () {
      return !(this.errorPhone || this.errorPassword)
    },

    goToStaffLogin () {
      this.$router.push('/staff-login')
    },

    onDecode (result) {
      this.code = result
    },

    logIn () {
      this.click = true
      let result = this.checkValidate()
      if(result) {
        this.onLogin = true
        setTimeout(() => {
          AuthenticationAPI.logIn(this.inputs).then(res => {
            this.$store.commit('updateToken', res.data.data);
            this.onLogin = false
            AuthenticationAPI.getUserInfo().then(res => {
              const usr = Mapper.mapUserModelToDto(res.data.data);
              this.$store.commit('updateUser', usr);
              if (this.$store.state.user.roleCode == "STAFF") {
                this.$router.push({ name: 'Welcome' })
              }
              if (this.$store.state.user.roleCode == "ADMIN") {
                this.$router.push({ name: 'Home' })
              }
            })
          }).catch(err => {
            console.log(err);
            this.onLogin = false
          })
        }, 500)
      }
    },
  }
}
</script>
