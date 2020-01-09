<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col
          md="6"
          sm="8">
          <b-card
            no-body
            class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit.prevent="update">
                  <h3 class="text-center">Đăng Ký</h3>
                  <div class="form-group">
                    <label>Tên</label><span class="error-sybol"></span>
                    <input
                      id="name"
                      v-model="inputs.name"
                      type="text"
                      class="form-control"
                      maxlength="100">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                      Vui long nhập tên
                    </b-form-invalid-feedback>
                  </div>

                  <div class="form-group">
                    <label>Số Điện Thoại</label><span class="error-sybol"></span>
                    <input
                      id="phone_number"
                      v-model="inputs.phone_number"
                      type="text"
                      class="form-control"
                      maxlength="15">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPhone">
                      Vui lòng nhập số điện thoại
                    </b-form-invalid-feedback>
                  </div>

                  <div class="form-group">
                    <label>Giới Tính</label><span class="error-sybol"></span>
                    <b-form-select :options="optionsGender" v-model="inputs.gender" class="mb-3"></b-form-select>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorGender">
                      Vui lòng chọn giới tính
                    </b-form-invalid-feedback>
                  </div>

                  <div class="form-group">
                    <label>Ngày Tháng Năm Sinh</label><span class="error-sybol"></span>
                    <date-picker input-class="input-date" style="width:100%" class="form-control" v-model="inputs.birthday" :format="customFormatter" :disabledDates="disabledDates">
                    </date-picker>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorBirthday">
                      Vui lòng nhập ngày sinh
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Tỉnh/ Thành Phố</label><span class="error-sybol"></span>
                    <b-form-select
                      id="city_id"
                      :options="optionsCity"
                      v-model="inputs.city_id"
                      type="text"
                      class="form-control"
                      v-on:change="changeCity($event.target)"
                    ></b-form-select>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorCity">
                      Vui lòng chọn thành phố
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Quận/ Huyện</label><span class="error-sybol"></span>
                    <b-form-select
                      id="district_id"
                      :options="optionsDistrict"
                      v-model="inputs.district_id"
                      type="text"
                      class="form-control"
                      :disabled="!inputs.city_id"
                    ></b-form-select>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorDistrict">
                      Vui lòng nhập quận
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Mật Khẩu</label><span class="error-sybol"></span>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control"
                      autocomplete="new-password"
                      maxlength="255">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPassword">
                      Vui lòng nhập mật khẩu
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorLengthPassword">
                      Mật khẩu phải ít nhất 6 kí tự
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Nhắc Lại Mật Khẩu</label><span class="error-sybol"></span>
                    <input
                      id="confirm-password"
                      v-model="confirmPassword"
                      type="password"
                      class="form-control"
                      maxlength="255">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorConfirmPassword">
                      Vui lòng nhập lại mật khẩu
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorLengthConfirmPassword">
                      Mật khẩu phải ít nhất 6 kí tự
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback class="invalid-feedback" :state="!errorMatch">
                      Mật khẩu không khớp
                    </b-form-invalid-feedback>
                  </div>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <button class="btn btn-primary px-4">
                        Đăng Ký
                      </button>
                    </b-col>
                  </b-row>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AuthenticationAPI from '@/api/authentication'
import 'bootstrap/dist/css/bootstrap.css'
import datePicker from 'vuejs-datepicker'
import moment from 'moment'
import MasterApi from '@/api/master'
import MasterMapper from '@/mapper/master'


export default {
  name: 'Register',
  components: {
    datePicker
  },
  data () {
    return {
      inputs: {
        name: null,
        phone_number: null,
        gender: null,
        birthday: null,
        city_id: null,
        district_id: null,
        password: null
      },
      optionsGender: [
        {value: '1', text: 'Nam'},
        {value: '2', text: 'Nữ'},
        {value: '3', text: 'Khác'}
      ],
      optionsCity: [
      ],
      optionsDistrict: [
      ],
      repeat_password: '',
      click: false,
      confirmPassword: null,
      errorMatch: null,
      optionsDate: {
        format: 'MM/DD/YYYY',
        useCurrent: false,
        // viewMode: 'years'
      },
      disabledDates: {
        from: new Date(Date.now())
      }
    }
  },
  mounted () {
    this.getOptionCity()
  },
  computed: {
    errorName () {
      return this.checkInfo(this.inputs.name)
    },
    errorPhone () {
      return this.checkInfo(this.inputs.phone_number)
    },
    errorGender () {
      return this.checkInfo(this.inputs.gender)
    },
    errorBirthday () {
      return this.checkInfo(this.inputs.birthday)
    },
    errorCity () {
      return this.checkInfo(this.inputs.city_id)
    },
    errorDistrict () {
      return this.checkInfo(this.inputs.district_id)
    },
    errorPassword () {
      return this.checkInfo(this.inputs.password)
    },
    errorConfirmPassword () {
      return this.checkInfo(this.confirmPassword)
    },
    errorLengthPassword () {
      if(!this.inputs.password || this.errorPassword)
        return false
      return (this.inputs.password.length < 6) 
    },
    errorLengthConfirmPassword () {
      if(!this.confirmPassword || this.errorConfirmPassword)
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
    customFormatter(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    checkConfirmPass () {
      return this.errorConfirmPassword || (this.inputs.password == this.confirmPassword)
    },
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorPhone || this.errorGender || this.errorBirthday
        || this.errorCity || this.errorDistrict || this.errorPassword || this.errorConfirmPassword
        || this.errorMatch || this.errorLengthPassword || this.errorLengthConfirmPassword)
    },

    /**
     * Register
     */
    update () {
      this.click = true
      let result = this.checkValidate()
      if(result) {
        this.errorMatch = !this.checkConfirmPass()
        if(!this.errorMatch) {
          this.onRegister = true
          setTimeout(() => {
            AuthenticationAPI.register(this.inputs).then(res => {
              if(res && res.data && res.data.data) {
                let id = res.data.data
                this.$router.push({ name: 'ActiveAccount', params: 
                  { id: id, phone_number: this.inputs.phone_number, password: this.inputs.password }})
              }
            }).catch(err => {
              console.log(err)
              let message = ""
              if(err.response.data.status == 422) {
                message = err.response.data.mess
              } else {
                message = "Lỗi hệ thống"
              }
              this.$bvModal.msgBoxOk(message, {
                title: "Đăng kí không thành công",
                centered: true, 
                size: 'sm',
                headerClass: 'bg-danger',
              })
            })
            this.onConfirm = false
          }, 500)
        }
      }
    },

    /**
     * Get city options
     */
    getOptionCity() {
      MasterApi.getCityOptions().then(res => {
        this.optionsCity = MasterMapper.mapCityModelToDto(res.data.data)
      })
    },

    /**
     * Get district by city
     */
    changeCity() {
      let cityId = this.inputs.city_id
      if(cityId != "" && cityId != undefined) {
        MasterApi.getDistrictOptions(cityId).then(res => {
          this.optionsDistrict = MasterMapper.mapCityModelToDto(res.data.data)
        })
      } else {
        this.inputs.district_id = ""
      }

    }

  }
}
</script>
