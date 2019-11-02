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
                    Đăng Nhập
                  </h2>
                  <div class="form-group">
                    <label>Số Điện Thoại</label><span class="error-sybol"></span>
                    <input
                      id="phone"
                      v-model="inputs.phone"
                      type="text"
                      class="form-control"
                      placeholder="Nhập số điện thoại">
                  </div>
                  <div class="form-group">
                    <label>Mật Khẩu</label><span class="error-sybol"></span>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control"
                      placeholder="Nhập mật khẩu">
                  </div>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2 align-self-center">
                      <b-button
                        variant="primary"
                        class="px-4"
                        @click.prevent="logIn">
                        {{ onLogin ? 'Đăng Nhập...' : 'Đăng Nhập' }}
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
export default {
  name: 'Login',
  data () {
    return {
      inputs: {
        phone: '',
        password: ''
      },
      code: '',
      onLogin: false,
      selected: '',
      onShowQRCode: false,
    }
  },
  components: {
    QrcodeStream
  },
  methods: {
    goToStaffLogin () {
      this.$router.push('/staff-login')
    },
    onDecode (result) {
      this.code = result
    }
  //   logIn () {
  //     this.onLogin = true
  //     setTimeout(() => {
  //       AuthenticationAPI.logIn(this.inputs).then(res => {
  //         this.$store.commit('updateToken', res.data.data);
  //         this.onLogin = false
  //         AuthenticationAPI.getUserInfo().then(res => {
  //           const usr = Mapper.mapUserModelToDto(res.data.data);
  //           this.$store.commit('updateUser', usr);
  //           if (this.$store.state.user.roleCode == "STAFF") {
  //             this.$router.push({ name: 'Welcome' })
  //           }
  //           if (this.$store.state.user.roleCode == "ADMIN") {
  //             this.$router.push({ name: 'Home' })
  //           }
  //         })
  //       }).catch(err => {
  //         console.log(err);
  //         this.onLogin = false
  //       })
  //     }, 500)
  //   },
  }
}
</script>
