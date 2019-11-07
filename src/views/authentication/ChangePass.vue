<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body>
                <b-form method="put" @submit.prevent="update">
                  <h1 class="text-center">
                    Đổi Mật Khẩu
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
                  </div>
                  <div class="form-group">
                    <label>
                      Nhắc lại mật khẩu mới
                    </label><span class="error-sybol"></span>
                    <input id="confirmPassword"
                      type="password" 
                      class="form-control"
                      v-model="confirmPass">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorConfirmPassword">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <button class="btn btn-primary px-4">
                        {{ onUpdate ? "Cập Nhật Mật Khẩu..." : "Cập Nhật Mật Khẩu" }}
                      </button>
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
      confirmPass : null,
      click: false,
      lang_en: lang_en,
      onUpdate: null
    }
  },
  computed: {
    errorPhone: function () {
      return this.checkInfo(this.inputs.phone_number)
    },
    errorNewPassword: function () {
      return this.checkInfo(this.inputs.new_pass)
    },
    errorConfirmPassword: function () {
      return this.checkInfo(this.confirmPass)
    },
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorPhone || this.errorNewPassword || this.errorConfirmPassword)
    },
    update () {
      this.click = true
      let result = this.checkValidate()
      if(result) {
        this.onUpdate = true
        setTimeout(() => {
          console.log(this.$store.state)
          AuthenticationAPI.staffUpdatePass(this.inputs).then(res => {
            if(res && res.data && res.data.data) {
              console.lod(res.data.data)
              this.onLogin = false
            }
          }).catch(err => {
            console.log(err);
            this.onLogin = false
          })
        }, 500)
        // this.$router.push('/activepass')
      }
    }
  }
}
</script>