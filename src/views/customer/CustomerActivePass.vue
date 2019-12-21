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
                  Kích Hoạt Mật khẩu Mới
                  </h1>
                  <div class="form-group">
                    <label>Code</label><span class="error-sybol"></span>
                    <input
                      id="code"
                      type="text"
                      autocomplete="new-password"
                      class="form-control"
                      placeholder="Nhập số code"
                      v-model="inputs.code"
                      @keypress="validateCode"
                      maxlength="4">
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
import AuthenticationAPI from '@/api/authentication'
import lang_vn from "@/lang/lang_vn.json"
import commonFunc from '@/common/commonFunc'
export default {
  name: 'ActiveAccount',
  data () {
    return {
      inputs: {
        phone_number: null,
        code: null
      },
      click: false,
      onConfirm: null,
      lang_vn : lang_vn
    }
  },
  computed: {
    errorCode: function () {
      return this.checkInfo(this.inputs.code)
    }
  },
  mounted () {
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
        // get id account
        this.inputs.phone_number = this.$route.params.phone_number
        this.onConfirm = true
        setTimeout(() => {
          AuthenticationAPI.CustomerActivePass(this.inputs).then(res => {
            if (res != null && res.data != null) {
              console.log(res)
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                message = "Cập nhật mới thành công"
                this.$bvModal.msgBoxOk(message, {
                  title: "Thành công!!!",
                  centered: true,
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  if(res) {
                    this.$router.push('/customer-login')
                  }
                })
              }
            }
          }).catch(err => {
            let message = ""
            if(err.response.data.status == 500) {
              message = "Lỗi hệ thống, chúng tôi rất tiếc về sự cố này, bạn thử lại sau vài phút nhé"
            } else {
              message = err.response.data.mess
            }
            this.$bvModal.msgBoxOk(message, {
              title: "Thất bại",
              centered: true,
              size: 'sm',
              headerClass: 'bg-danger',
            })
          })
          this.onConfirm = false
        }, 500)
      }
    },
    validateCode (event) {
      // not number
      if(!commonFunc.isNumber(event)) {
        event.preventDefault()
      }
    }
  }
}
</script>
