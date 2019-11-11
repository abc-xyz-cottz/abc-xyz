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
                  <b-form-invalid-feedback  class="invalid-feedback" :state="errorFlag">
                      {{errorMess}}
                  </b-form-invalid-feedback>
                  <div class="form-group">
                    <label>Số Điện Thoại</label><span class="error-sybol"></span>
                    <input
                      id="phone"
                      v-model="inputs.phone_number"
                      type="text"
                      class="form-control"
                      placeholder="Nhập số điện thoại" phoneNumberCheck
                      @keyup="intergerOnly($event.target)"
                      v-on:change="checkPhoneNumberFormat($event.target)">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="phoneNumberCheckFlag">
                      Số điện thoại không đúng
                    </b-form-invalid-feedback>
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
                      class="mb-2">
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
                      class="mb-2">
                      <a href="/staff-forgetpass" class="pull-left mt-2">Quên Mật Khẩu</a>
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
import StaffMapper from '@/mapper/staff'
import Staff from '@/api/staff'
import {Constant} from '@/common/constant'
import commonFunc from '@/common/commonFunc'
import lang_en from "@/lang/lang_en.json"


export default {
  name: 'Login',
  data () {
    return {
      inputs: {
        phone_number: '',
        password: ''
      },
      code: '',
      onLogin: false,
      selected: '',
      phoneNumberCheckFlag: true,
      errorFlag: true,
      errorMess: ""
    }
  },
  methods: {
    /**
     *  Login
     */
     logIn () {
       if(this.phoneNumberCheckFlag) {
         this.onLogin = true
          //setTimeout(() => {
         Staff.logIn(this.inputs).then(res => {

            // Store token
            this.$store.commit('updateToken', res.data.data.token)

            // Store staff info
             const usr = StaffMapper.mapStaffModelToDto(res.data.data.staff_info)
             this.$store.commit('updateUser', usr);

              let role = res.data.data.staff_info.fields.role_name
              if(role == Constant.ROLE_STAFF) {
                this.$router.push("/home-staff")
              }
              if(role == Constant.ROLE_ADMIN) {
                this.$router.push("/home-admin")
              }
              if(role == Constant.ROLE_SP_ADMIN) {
                this.$router.push("/home-sp-admin")
              }

         }).catch(err => {
           let message = ""
            if(err.response.data.status == 500) {
              message = lang_en.commons.systemError
            } else {
              message = err.response.data.mess
            }
            this.errorFlag = false
            this.errorMess = message
            this.onLogin = false
         })
       //}, 5000)
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
