<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body>
                <b-form @submit.prevent="logIn">
                  <h1 class="text-center">
                    RS
                  </h1>
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
                  <div class="form-group d-inline-flex">
                    <label class="mr-3">Bạn Là</label>
                    <b-form-radio v-model="selected" name="radios" value="B" class="mr-3">
                      Khách Hàng
                    </b-form-radio>
                    <b-form-radio v-model="selected" name="radios" value="B" class="mr-3">
                      Nhân Viên
                    </b-form-radio>
                  </div>
                  <b-row>
                    <b-col
                      cols="12"
                      class="text-center mb-2">
                      <b-button
                        variant="primary"
                        class="px-4"
                        @click.prevent="logIn">
                        {{ onLogin ? 'Đăng Nhập...' : 'Đăng Nhập' }}
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
                <b-row>
                  <b-col>
                    <a href="#" class="pull-left">Đăng Ký Tài Khoản</a>
                    <a href="#" class="pull-right">Quên Mật Khẩu</a>
                  </b-col>
                </b-row>
              </b-card-body>
              <b-card-footer class="p-4">
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
  // components: {
  //   QrcodeStream
  // },
  // methods: {
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
  //   onDecode (result) {
  //     this.code = result
  //   }
  // }
}
</script>
