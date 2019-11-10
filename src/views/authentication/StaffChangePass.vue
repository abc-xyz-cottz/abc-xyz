<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body>
                <b-form method="put">
                  <h1 class="text-center">
                    Đổi Mật Khẩu
                  </h1>
                  <div class="form-group">
                    <label>
                      Mật Khẩu Hiện Tại
                    </label><span class="error-sybol"></span>
                    <input id="oldPassword"  
                      type="password" 
                      class="form-control"
                      v-model="inputs.old_password">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorOldPassword">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>
                      Mật Khẩu Mới
                    </label><span class="error-sybol"></span>
                    <input id="newPassword"
                      type="password" 
                      class="form-control"
                      v-model="inputs.new_password">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorNewPassword">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>
                      Nhắc lại mật khẩu mới
                    </label><span class="error-sybol"></span>
                    <input id="confirmPassword"
                      type="password" 
                      class="form-control"
                      v-model="confirmPass">
                    <b-form-invalid-feedback class="invalid-feedback" :state="!errorConfirmPassword">
                      {{ lang_en.commons.requiredField}}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback class="invalid-feedback" :state="!errorMatch">
                      {{ lang_en.changePassword.passNotMatch }}
                    </b-form-invalid-feedback>
                  </div>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <b-button
                        @click="update" 
                        :disabled="onUpdate"
                        :variant="onUpdate ? '' : 'primary'" >
                        {{ onUpdate ? "Cập Nhật Mật Khẩu..." : "Cập Nhật Mật Khẩu" }}
                      </b-button>
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
import lang_en from "@/lang/lang_en.json"
import AuthenticationAPI from '@/api/authentication'
import {Constant} from '@/common/constant'

export default {
  data () {
    return {  
      inputs: {
        new_password: null,
        old_password: null,
      },
      confirmPass : null,
      click: false,
      lang_en: lang_en,
      onUpdate: null,
      errorMatch: null,
    }
  },
  computed: {
    errorNewPassword () {
      return this.checkInfo(this.inputs.new_password)
    },
    errorConfirmPassword () {
      return this.checkInfo(this.confirmPass)
    },
    errorOldPassword () {
      return this.checkInfo(this.inputs.old_password)
    }
  },
  watch: {
    confirmPass () {
      this.errorMatch = false
    }
  },
  methods: {
    checkConfirmPass () {
      return this.errorConfirmPassword || (this.inputs.new_password == this.confirmPass)
    },
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorNewPassword || this.errorConfirmPassword || this.errorMatch)
    },
    update () {
      this.click = true
      let result = this.checkValidate()
      this.errorMatch = !this.checkConfirmPass()
      if(result && !this.errorMatch) {
        this.onUpdate = true
        setTimeout(() => {
          AuthenticationAPI.staffChangePass(this.inputs).then(res => {
            if(res && res.data && res.data.status == 200) {
              // Check role to go to home page
              let role = this.$store.state.user.role
              if(role == Constant.ROLE_STAFF) {
                this.$router.push('/home-staff')
              }
              if(role == Constant.ROLE_ADMIN) {
                this.$router.push('/home-admin')
              }
              if(role == Constant.ROLE_SP_ADMIN) {
                this.$router.push('/home-sp-admin')
              }
            }
          }).catch(err => {
            let message = ""
            if(err.response.data.status == 422) {
              message = err.response.data.mess
            } else {
              message = lang_en.commons.systemError
            }
            this.$bvModal.msgBoxOk(message, {
              title: lang_en.commons.updateFailed,
              centered: true, 
              size: 'sm',
            })
          })
          this.onUpdate = false
        }, 500)
      }
    }
  }
}
</script>
