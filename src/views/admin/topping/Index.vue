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
                  <h4 class="mt-2">Topping</h4>
                </b-col>
              </b-row>
              <hr/>

              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Loại </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="typeOptions"
                  id="status"
                  type="text"
                  maxlength="1"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="topping.type">
                  </b-form-select>
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorType">
                    Đây là mục bắt buộc nhập
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Tên </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="name"
                  type="text"
                  maxlength="100"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="topping.name">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                    Đây là mục bắt buộc nhập
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
                  autocomplete="new-password"
                  class="form-control"
                  v-model="topping.price"
                  @keyup="intergerOnly($event.target)">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPrice">
                    Đây là mục bắt buộc nhập
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="form-row" v-if="this.$route.params.id">
                <b-col md="3" class="mt-2">
                  <label> Trạng Thái </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="options"      
                  id="status"
                  type="text"
                  maxlength="1"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="topping.status">
                  </b-form-select>
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
import Mapper from '@/mapper/topping'
import commonFunc from '@/common/commonFunc'


export default {
  data () {
    return {
      options: [
        {value: 'false', text: 'Đóng'},
        {value: 'true', text: 'Mở'}
      ],
      typeOptions: [
        {value: null, text: ''},
        {value: 'sugar', text: 'Đường'},
        {value: 'ice', text: 'Đá'},
        {value: 'food', text: 'Đồ ăn'},
        {value: 'size', text: 'Kích thước'},
      ],
      topping: {
        "id": null,
        "name": null,
        "type": null,
        "price": null,
        "status": null
      },
      click: false,
      saving: false
    }
  },
  mounted() {
    this.getToppingDetail()
  },
  computed: {
    errorName () {
      return this.checkInfo(this.topping.name)
    },
    errorType () {
      return this.checkInfo(this.topping.type)
    },
    errorPrice () {
      return this.checkInfo(this.topping.price)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorType || this.errorPrice)
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
   * Make toast with title
   */
  makeToast(variant = null, title, content) {
    this.$bvToast.toast(content, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 5000
    })
  },

    /**
     * Get menu detail
     */
    getToppingDetail() {
      let toppingId = this.$route.params.id
      if(toppingId){
        adminAPI.getToppingDetail(toppingId).then(res => {
          this.topping = Mapper.mapToppingDetailModelToDto(res.data.data)
        }).catch(err => {
          // Handle error
          let errorMess = commonFunc.handleStaffError(err)
          this.popToast('danger', errorMess)
        })
      }
    },

    /**
     * Save
     */
    save() {
      this.saving = true
      this.click = true
      let result = this.checkValidate()
      if(result) {
        let toppingId = this.$route.params.id
        if (toppingId) {
          // Edit
          adminAPI.updateTopping(this.topping).then(res => {
            this.saving = false
            if (res != null && res.data != null) {
              this.popToast('success', 'Cập nhật topping thành công!!!')
            } else {
              this.makeToast('danger', 'Cập nhật topping thất bại!!!', 'Có lỗi xảy ra, bạn thử lại sau nhé')
            }
          }).catch(err => {
            this.saving = false
            let message = ""
            if(err.response.data.status == 500) {
              message = "Lỗi hệ thống, chúng tôi rất tiếc về sự cố này, bạn thử lại sau vài phút nhé"
            } else {
              message = err.response.data.mess
            }
            this.makeToast('danger', 'Cập nhật topping thất bại!!!', message)
          })
        } else {
          // Add
          adminAPI.addTopping(this.topping).then(res => {
            this.saving = false
            if (res != null && res.data != null) {
              // Go to list
              this.$router.push('/topping/list')
            } else {
              this.makeToast('danger', 'Thêm topping thất bại!!!', 'Có lỗi xảy ra, bạn thử lại nhé')
            }
          }).catch(err => {
            this.saving = false
            let message = ""
            if(err.response.data.status == 500) {
              message = "Lỗi hệ thống, chúng tôi rất tiếc về sự cố này, bạn thử lại sau vài phút nhé"
            } else {
              message = err.response.data.mess
            }
            this.makeToast('danger', 'Thêm topping thất bại!!!', message)
          })
        }
      } else {
        this.saving = false
      }
    },

    /**
     * Only input integer
     */
     intergerOnly(item) {
      let valueInput = item.value
      let result = commonFunc.intergerOnly(valueInput)
      item.value = result
    },

    /**
     * Back to list
     */
    back() {
      // Go to list
      this.$router.push('/topping/list')
    }
  }
}
</script>
