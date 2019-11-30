<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h4 class="mt-2">Setting</h4>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right px-4" @click="save()">
                Lưu
              </b-button>
            </b-col>
          </b-row>
          <hr>
          <b-form @submit.prevent="save">
            <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Số điểm sẽ hết hạn sau</label><span class="error-sybol"></span>
                </b-col>
                <b-col md="6">
                  <input
                  id="pasword"
                  type="text"
                  class="form-control"
                  v-model="data.value">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorExpireDay">
                    Vui lòng nhập số ngày
                  </b-form-invalid-feedback>
                </b-col>
                <b-col md="3" class="mt-2">
                  <label> Ngày </label>
                </b-col>
              </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/setting'
export default {
  data () {
    return {
      data: {
        "id" : null,
        "expired_point" : null,
        "value": null
      },
      click: false,
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
    save () {
      this.click = true
      let result = this.checkValidate()
      if(result) { 
        adminAPI.saveSystemConfig(this.data).then(res => {
          if(res != null && res.data != null){
            let message = ""
            if (res.data.status == 200) {
              // show popup success
              this.$bvModal.msgBoxOk("Cập nhật thành công", {
                title: "Cập Nhật Cài Đặt",
                centered: true, 
                size: 'sm',
                headerClass: 'bg-success',
              })
            }
          }
        }).catch(err => {
          console.log(err)
          let message = "Lỗi hệ thống"
          this.$bvModal.msgBoxOk(message, {
            title: "Cập Nhật Cài Đặt",
            centered: true, 
            size: 'sm',
            headerClass: 'bg-danger',
          })
        })
      }
    },
    getSystemConfig () {
      adminAPI.getSystemConfig().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.data = Mapper.mapSysCfgModelToDto(res.data.data)
        }
      })
    }
  }
}
</script>
