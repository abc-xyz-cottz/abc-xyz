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
                  <h2 class="text-center">
                    Logo: CusRes
                  </h2>
                  <b-form-invalid-feedback  class="invalid-feedback" :state="errorFlag">
                      {{errorMess}}
                  </b-form-invalid-feedback>
                  <div class="form-group">
                    <label>Số điện thoại</label><span class="error-sybol"></span>
                    <input
                      id="phone"
                      v-model="inputs.phone_number"
                      type="text"
                      autocomplete="new-password"
                      class="form-control"
                      maxlength="15"
                      @keyup="intergerOnly($event.target)"
                      v-on:change="checkPhoneNumberFormat($event.target)">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPhone">
                      Vui lòng nhập số điện thoại
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="phoneNumberCheckFlag">
                      Số điện thoại không đúng
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Mật khẩu</label><span class="error-sybol"></span>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPassword">
                      Vui lòng nhập mật khẩu
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
                        {{ onLogin ? "Đăng Nhập..." : "Đăng Nhập" }}
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2 align-self-center">
                      <a href="/register" class="pull-left pt-2">Đăng Ký Tài Khoản</a>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2 align-self-center">
                      <a href="/cus-forget-password" class="pull-left pt-2">Quên Mật Khẩu</a>
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
import CustomerApi from '@/api/customer'
import CustomerMapper from '@/mapper/customer'
import commonFunc from '@/common/commonFunc'


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
      click: false,
      phoneNumberCheckFlag: true,
      errorFlag: true,
      errorMess: ""
    }
  },
  components: {
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
      return !(this.errorPhone || this.errorPassword || !this.phoneNumberCheckFlag)
    },

    /**
     * Login
     */
    logIn () {
      this.click = true
      let result = this.checkValidate()
      if(result) {
        this.onLogin = true
        setTimeout(() => {
          CustomerApi.customerLogin(this.inputs).then(res => {
            if(res && res.data && res.data.data) {
              // Store token
              this.$store.commit('updateToken', res.data.data.token)
              this.onLogin = false

              // Store user info
              const usr = CustomerMapper.mapCustomerModelToDto(res.data.data.customer_info)
              this.$store.commit('updateUser', usr)

              // Go to home page
              this.$router.push("/")
            }

          }).catch(err => {
            let message = ""
            if(err.response.data.status == 500) {
              message = "Lỗi hệ thống"
            } else {
              message = err.response.data.mess
            }
            this.errorFlag = false
            this.errorMess = message

          })
          this.onLogin = false
        }, 500)
      }
    },

    /**
     * Check phone number
     */
    checkPhoneNumberFormat(item) {
      let valueInput = item.value
      if (valueInput != null && valueInput != "") {
        if (commonFunc.phoneNumberCheck(valueInput)) {
          this.phoneNumberCheckFlag = true
        } else {
          this.phoneNumberCheckFlag = false
        }
      } else {
        this.phoneNumberCheckFlag = true
      }
    },

    /**
     * Only input integer
     */
     intergerOnly(item) {
      let valueInput = item.value
      let result = commonFunc.intergerOnly(valueInput)
      item.value = result

      if(valueInput.length == 10) {
        if (commonFunc.phoneNumberCheck(valueInput)) {
          this.phoneNumberCheckFlag = true
        } else {
          this.phoneNumberCheckFlag = false
        }
      }
    },
  }
}
</script>
