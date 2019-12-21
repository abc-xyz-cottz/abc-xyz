<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body>
                <b-form>
                  <h3 class="text-center">
                  Kích Hoạt Mật Khẩu Mới
                  </h3>
                  <div class="form-group">
                    <label>Code</label><span class="error-sybol"></span>
                    <input
                      id="code"
                      type="text"
                      maxlength="4"
                      autocomplete="new-password"
                      class="form-control"
                      v-model="inputs.code"
                      placeholder="Nhập số code">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorCode">
                      Vui lòng nhập code
                    </b-form-invalid-feedback>
                  </div>
                  <b-button 
                    @click="confirm" 
                    :variant="onConfirm ? '' : 'primary'" 
                    class="pull-right"
                    :disabled="onConfirm">
                    {{ onConfirm ? "Xác nhận..." : "Xác nhận" }}
                  </b-button>
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
import lang_vn from "@/lang/lang_vn.json"
import AuthenticationAPI from '@/api/authentication'
export default {
  name: 'ActivePassword',
  data () {
    return {
      inputs: {
         phone_number: null,
         code: null,
      },
      click: false,
      lang_vn: lang_vn,
      onConfirm: null
    }
  },
  computed: {
    errorCode: function () {
      return this.checkInfo(this.inputs.code)
    }
  },
  mounted () {
    console.log(this.$route)
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorCode)
    },
    confirm () {
      this.click = true
      let result = this.checkValidate()
      if(result) {
        // get phone number
        this.inputs.phone_number = this.$store.state.user.phoneNumber
        this.onConfirm = true
        setTimeout(() => {
          AuthenticationAPI.activePass(this.inputs).then(res => {
            if(res && res.data) {
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                message = "Password của bạn đã được cập nhật"
                this.$bvModal.msgBoxOk(message, {
                  title: lang_vn.commons.updateSuccess,
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  if(res) {
                    this.$router.push('/home-staff')
                  }
                })
              }
            }
          }).catch(err => {
            console.log(err)
            let message = ""
            if(err.response.data.status == 422) {
              message = err.response.data.mess
            } else {
              message = lang_vn.commons.systemError
            }
            this.$bvModal.msgBoxOk(message, {
              title: lang_vn.commons.updateFailed,
              centered: true, 
              size: 'sm',
              headerClass: 'bg-danger',
            })
          })
          this.onConfirm = false
        }, 500)
      }
    }
  }
}
</script>
