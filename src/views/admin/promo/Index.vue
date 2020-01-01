<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">

            <b-row>
              <b-col cols="6">
                <b-button variant="secondary" class="pull-left px-4" @click="back">
                  Quay lại
                </b-button>
              </b-col>
              <b-col cols="6">
                <button class="btn btn-primary pull-right  px-4" @click="save" :disabled="saving">
                    Lưu
                </button>
              </b-col>
            </b-row>

              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Promotion</h4>
                </b-col>
              </b-row>
              <hr/>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Tên </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="name"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="promo.name"
                  maxlength="100">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                    Vui lòng nhập tên
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Giá </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="price"
                  type="text"
                  maxlength="100"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="promo.cost"
                  @keypress="validateCode">
                  <b-form-invalid-feedback class="invalid-feedback" :state="!errorCost">
                    Vui lòng nhập giá
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Hết Hạn Sau </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="6">
                  <input
                  id="expiredDate"
                  type="text"
                  maxlength="100"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="promo.expired_on"
                  @keypress="validateCode">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorExpiredOn">
                    Vui lòng nhập ngày hết hạn
                  </b-form-invalid-feedback>
                </b-col>
                <b-col md="3"><label class="mt-1">Ngày</label></b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Số Lượng </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="number"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  maxlength="100"
                  v-model="promo.quantity"
                  @keypress="validateCode">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorQuantity">
                    Vui lòng nhập số lượng
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/promotion'
import commonFunc from '@/common/commonFunc'
export default {
  data () {
    return {
      promo: {
        "name": null,
        "cost": null,
        "expired_on": null,
        "quantity": null
      },
      click: false,
      saving: false
    }
  },
  mounted() {
    this.getPromoDetail()
  },
  computed: {
    errorName: function () {
      return this.checkInfo(this.promo.name)
    },
    errorCost: function () {
      return this.checkInfo(this.promo.cost)
    },
    errorExpiredOn: function () {
      return this.checkInfo(this.promo.expired_on)
    },
    errorQuantity: function () {
      return this.checkInfo(this.promo.quantity)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorCost || this.errorExpiredOn || this.errorQuantity)
    },

    /**
     * Get detail
     */
    getPromoDetail() {
      let promoId = this.$route.params.id
      if(promoId){
        adminAPI.getPromoDetail(promoId).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            this.promo = Mapper.mapPromoDetailModelToDto(res.data.data)
            this.promo.expired_on = commonFunc.calculateDate(this.promo.expired_on)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },

    /**
     * Save promotion
     */
    save () {
      this.click = true
      this.saving = true
      let result = this.checkValidate()
      if(result) { 
        let promoId = this.$route.params.id
        if(promoId){
          // Edit
          let promo = this.promo
          promo.id = promoId
          adminAPI.editPromo(promo).then(res => {
            this.saving = false
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Cập nhật thành công", {
                  title: "Cập Nhật Promotion",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/promo/list")
                })
              }
            }
          }).catch(err => {
            this.saving = false
            console.log(err)
            // Show notify edit fail: TODO
            let message = ""
            if(err.response.data.status == 422) {
              message = err.response.data.mess
            } else {
              message = "Lỗi hệ thống"
            }
            this.$bvModal.msgBoxOk(message, {
              title: "Cập Nhật Promotion",
              centered: true, 
              size: 'sm',
              headerClass: 'bg-danger',
            })
          })
        } else {
          // Add
          adminAPI.addPromo(this.promo).then(res => {
            this.saving = false
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Thêm thành công", {
                  title: "Thêm Promotion",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/promo/list")
                })
              }
            }
          }).catch(err => {
            this.saving = false
            console.log(err)
            let message = ""
              if(err.response.data.status == 422) {
                message = err.response.data.mess
              } else {
                message = "Lỗi hệ thống"
              }
              this.$bvModal.msgBoxOk(message, {
                title: "Thêm Promotion",
                centered: true, 
                size: 'sm',
                headerClass: 'bg-danger',
              })
          })
        }
      } else {
        this.saving = false
      }
    },

    /**
     * Validate code
     */
    validateCode (event) {
      // not number
      if(!commonFunc.isNumber(event)) {
        event.preventDefault()
      }
    },

    /**
     * Back to list
     */
    back() {
      // Go to list
      this.$router.push("/promo/list")
    }
  }
}
</script>
