<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form>
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Đăng thông báo</h4>
                </b-col>
              </b-row>
              <hr/>
              <div class="form-group">
                <label>Tỉnh/ Thành Phố</label><span class="error-sybol"></span>
                <b-form-select
                  id="city_id"
                  :options="optionsCity"
                  v-model="noti.cityId"
                  type="text"
                  class="form-control"
                ></b-form-select>
                <b-form-invalid-feedback  class="invalid-feedback" :state="!errorCity">
                  Vui lòng chọn thành phố
                </b-form-invalid-feedback>
              </div>

              <div class="form-group">
                <label>Tiêu đề:</label><span class="error-sybol"></span>
                <input
                  id="title"
                  v-model="noti.title"
                  type="text"
                  class="form-control"
                  maxlength="255">
                <b-form-invalid-feedback  class="invalid-feedback" :state="!errorTitle">
                  Vui lòng nhập tiêu đề
                </b-form-invalid-feedback>
              </div>

              <div class="form-group">
                <label>Nội dung:</label><span class="error-sybol"></span>
                <b-form-textarea
                  id="content"
                  placeholder="Nội dung thông báo"
                  v-model="noti.content"
                  rows="3"
                ></b-form-textarea>
                <b-form-invalid-feedback  class="invalid-feedback" :state="!errorContent">
                  Vui lòng nhập Nội dung
                </b-form-invalid-feedback>
              </div>

              <b-row class="text-center mt-3">
                <b-col>
                  <b-button variant="primary" class="px-4" @click="save">
                    Đăng
                  </b-button>
                </b-col>
              </b-row>

            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import MasterApi from '@/api/master'
import MasterMapper from '@/mapper/master'
import Cookies from 'js-cookie'
import {Constant} from '@/common/constant'
import adminAPI from '@/api/admin'


export default {
  data () {
    return {
      optionsCity: [],
      noti: {
        cityId: null,
        title: null,
        content: null
      },
      click: false,
    }
  },
  mounted () {
    this.getOptionCity()
  },
  computed: {
    errorCity () {
      return this.checkInfo(this.noti.cityId)
    },
    errorTitle () {
      return this.checkInfo(this.noti.title)
    },
    errorContent () {
      return this.checkInfo(this.noti.content)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorCity || this.errorTitle || this.errorContent)
    },

    /**
   * Make toast with title
   */
  makeToast(variant = null, title="Success!!!", content="Thao tác thành công!!!") {
    this.$bvToast.toast(content, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 5000
    })
  },

    /**
     * Get city options
     */
    getOptionCity() {
      MasterApi.getCityOptions().then(res => {
        this.optionsCity = MasterMapper.mapCityModelToDto(res.data.data)

        // Set default city
        let userInfo = Cookies.get(Constant.APP_USR)
        let cityId = ""
        if(userInfo) {
          let userTemp = JSON.parse(userInfo)
          cityId = userTemp.cityId
          this.noti.cityId = cityId
        }
      })
    },

    /**
     * Save
     */
    save() {
      this.click = true
      let result = this.checkValidate()
      if(result) {
        adminAPI.saveNotification(this.noti).then(res => {
          if(res != null && res.data != null){
            this.makeToast('success', 'Đăng thông báo thành công!!!', 'Thông báo của bạn sẽ được gửi tới tất cả khách hàng trong thành phố trên')
          }else{
            this.makeToast('danger', 'Đăng thông báo thất bại!!!', 'Có gì đó không đúng, bạn thử lại nhé')
          }
        }).catch(err => {
          let message = ""
          if(err.response.data.status == 500) {
            message = "Lỗi hệ thống, chúng tôi rất tiếc về sự cố này, bạn thử lại sau vài phút nhé"
          } else {
            message = err.response.data.mess
          }
          this.makeToast('danger', 'Đăng thông báo thất bại!!!', message)
        })
      }
    }
  }
}
</script>
