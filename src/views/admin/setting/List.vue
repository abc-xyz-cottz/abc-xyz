<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='12'>
              <b-button variant="primary" class="pull-right px-4" @click="save()" :disabled="saving">
                Lưu
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col md='12'>
              <h4 class="mt-2 text-center">Cài Đặt</h4>
            </b-col>
          </b-row>
          <hr>

          <b-row class="form-row">
              <b-col md="4" class="mt-2 text-right">
                <label> Số điểm sẽ hết hạn sau</label><span class="error-sybol"></span>
              </b-col>
              <b-col md="8" class="text-left">
                <div class="input-group">
                  <input
                  id="pasword"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="data.value"
                  @keypress="validateCode"
                  maxlength="30"><span class="input-group-addon">&nbsp;&nbsp;Ngày</span>
                </div>
                <b-form-invalid-feedback class="invalid-feedback" :state="!errorExpireDay">
                  Vui lòng nhập số ngày
                </b-form-invalid-feedback>
              </b-col>

          </b-row>

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/setting'
import commonFunc from '@/common/commonFunc'


export default {
  data () {
    return {
      data: {
        "id" : null,
        "code" : "expired_point",
        "value": null
      },
      click: false,
      saving: false
    }
  },
  mounted () {
    this.getSystemConfig()
  },
  computed: {
    errorExpireDay: function () {
      return this.checkInfo(this.data.value)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorExpireDay)
    },

    /**
   * Make toast without title
   */
  popToast(variant, content) {
    this.$bvToast.toast(content, {
      toastClass: 'my-toast',
      noCloseButton: true,
      variant: variant,
      autoHideDelay: 5000
    })
  },

    /**
     * Save
     */
    save () {
      this.click = true
      this.saving = true
      let result = this.checkValidate()
      if(result) {
        adminAPI.saveSystemConfig(this.data).then(res => {
          this.saving = false
          if(res != null && res.data != null){
            if (res.data.status == 200) {
              // show popup success
              this.popToast('success', 'Cập nhật cài đặt thành công!!! ')
            }
          }
        }).catch(err => {
          this.saving = false
          let message = "Lỗi hệ thống"
          this.$bvModal.msgBoxOk(message, {
            title: "Cập Nhật Cài Đặt",
            centered: true, 
            size: 'sm',
            headerClass: 'bg-danger',
          })
        })
      } else {
        this.saving = false
      }
    },

    /**
     * Get old
     */
    getSystemConfig () {
      adminAPI.getSystemConfig().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.data = Mapper.mapSysCfgModelToDto(res.data.data)
        }
      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)
      })
    },

    /**
     * Validate code
     * @param event
     */
    validateCode (event) {
      // not number
      if(!commonFunc.isNumber(event)) {
        event.preventDefault()
      }
    }
  }
}
</script>
