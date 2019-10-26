<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body class="pb-2">
                <b-button 
                  variant="primary"
                  class="pull-right px-4"
                  @click="goToStaffLogin()"
                >
                Staff
                </b-button>
                <b-form @submit.prevent="logIn">
                  <h2>
                    Đăng Nhập
                  </h2>
                  <div class="form-group">
                    <label>Số Điện Thoại</label>
                    <input
                      id="phone"
                      v-model="inputs.phone"
                      type="text"
                      class="form-control"
                      placeholder="Nhập số điện thoại">
                  </div>
                  <div class="form-group">
                    <label>Mật Khẩu</label>
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
                      <a href="#/register" class="pull-right pt-2"> &nbsp; Đăng Ký Tài Khoản</a>
                      <a href="#/changepass" class="pull-right pt-2">Quên Mật Khẩu &nbsp; / </a>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
              <b-card-footer class="py-2">
              <b-row class="text-center">
                  <b-col>
                    <b-button
                      class="mt-2"
                      @focus="onShowQRCode = true"
                      @blur="onShowQRCode = false">
                      Quét QR code
                    </b-button>
                    <qrcode-stream v-if="onShowQRCode" @decode="onDecode" class="showQACode" />
                    <p class="">(Bạn có thể gọi món hoặc gửi yêu cầu tới nhân viên nhà hàng thông qua quét QR code mà không cần tài khoản)
                    </p>
                  </b-col>
                </b-row>
            </b-card-footer>
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
