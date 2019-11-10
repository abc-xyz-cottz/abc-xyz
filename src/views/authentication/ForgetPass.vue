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
                    Quên Mật Khẩu
                  </h1>
                  <div class="form-group">
                    <label>
                      Số Điện Thoại
                    </label><span class="error-sybol"></span>
                    <input id="phone"  
                      type="text" 
                      class="form-control"
                      v-model="inputs.phone_number">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPhone">
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
                      v-model="inputs.new_pass">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorNewPassword">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorLengthPassword">
                      {{ lang_en.commons.minLengthAccount }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>
                      Nhắc lại mật khẩu mới
                    </label><span class="error-sybol"></span>
                    <input id="confirmPassword"
                      type="password" 
                      class="form-control"
                      v-model="confirmPassword">
                    <b-form-invalid-feedback class="invalid-feedback" :state="!errorconfirmPassword">
                      {{ lang_en.commons.requiredField}}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorLengthconfirmPassword">
                      {{ lang_en.commons.minLengthAccount }}
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
export default {
  data () {
    return {  
      inputs: {
        phone_number: null,
        new_pass: null,
      },
      confirmPassword : null,
      click: false,
      lang_en: lang_en,
      onUpdate: null,
      errorMatch: null,
    }
  },
  computed: {
    errorPhone () {
      return this.checkInfo(this.inputs.phone_number)
    },
    errorNewPassword () {
      return this.checkInfo(this.inputs.new_pass)
    },
    errorconfirmPassword () {
      return this.checkInfo(this.confirmPassword)
    },
    errorLengthPassword () {
      if(!this.inputs.new_pass || this.errorNewPassword)
        return false
      return (this.inputs.new_pass.length < 6) 
    },
    errorLengthconfirmPassword () {
      if(!this.confirmPassword || this.errorconfirmPassword)
        return false
      return (this.confirmPassword.length < 6) 
    }
  },
  watch: {
    confirmPassword () {
      this.errorMatch = false
    }
  },
  methods: {
    checkconfirmPassword () {
      return this.errorconfirmPassword || (this.inputs.new_pass == this.confirmPassword)
    },
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorPhone || this.errorNewPassword || this.errorconfirmPassword || this.errorMatch
            || this.errorLengthPassword)
    },
    update () {
      this.click = true
      let result = this.checkValidate()
      this.errorMatch = !this.checkconfirmPassword()
      if(result && !this.errorMatch) {
        this.onUpdate = true
        setTimeout(() => {
        //   AuthenticationAPI.staffUpdatePass(this.inputs).then(res => {
        //     if(res && res.data && res.data.status == 200) {
        //       // Redirect to login
        //       this.$router.push('/login')
        //     }
        //   }).catch(err => {
        //     let message = ""
        //     if(err.response.data.status == 422) {
        //       message = err.response.data.mess
        //     } else {
        //       message = lang_en.commons.systemError
        //     }
        //     this.$bvModal.msgBoxOk(message, {
        //       title: lang_en.commons.updateFailed,
        //       centered: true, 
        //       size: 'sm',
        //     })
        //   })
          this.onUpdate = false
        }, 500)
      }
    }
  }
}
</script>
