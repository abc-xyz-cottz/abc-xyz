<template>
  <div class="container">
    <b-card-group>
      <b-card no-body>
        <b-card-body>
          <b-form>
            <b-row>
              <b-col cols="8">
                <h4>Thông Tin Cá Nhân</h4>
              </b-col>
              <b-col cols="4">
                <b-button v-if="onEdit" variant="primary" class="px-4 float-right" @click="save">
                  Save
                </b-button>
                <b-button v-else variant="primary" class="px-4 float-right" @click="edit">
                  Edit
                </b-button>
              </b-col>
            </b-row>
            <div class="form-group">
              <label>Tên</label>
              <input
                id="name"
                v-model="inputs.name"
                type="text"
                autocomplete="new-password"
                class="form-control"
                maxlength="100"
                :disabled="!onEdit">
                <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                  Vui lòng nhập tên
                </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <label>Số Điện Thoại</label>
              <input
                id="phone"
                v-model="inputs.phone"
                type="text"
                autocomplete="new-password"
                class="form-control"
                maxlength="15"
                @keypress="validateCode"
                :disabled="!onEdit">
                <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPhone">
                  Vui lòng nhập số điện thoại
                </b-form-invalid-feedback>
            </div>

            <div class="form-group">
              <label>Giới Tính</label>
              <b-form-select :disabled="!onEdit" :options="options" class="mb-3" v-model="inputs.gender"></b-form-select>
              <b-form-invalid-feedback class="invalid-feedback" :state="!errorGender">
                Vui lòng chọn giới tính
              </b-form-invalid-feedback>
            </div>

            <div class="form-group">
              <label>Ngày Tháng Năm Sinh</label>
              <input
                id="birthday"
                v-model="inputs.birthday"
                type="text"
                autocomplete="new-password"
                class="form-control"
                :disabled="!onEdit">
              <b-form-invalid-feedback class="invalid-feedback" :state="!errorBirthday">
                Vui lòng nhập ngày sinh
              </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <label>Tỉnh/ Thành Phố</label>
              <b-form-select 
                  :options="optionsCity"
                  id="city_id"
                  type="text" 
                  autocomplete="new-password"
                  class="form-control"
                  maxlength="100"
                  v-model="inputs.city_id"
                  v-on:change="changeCity($event.target)"
                  :disabled="!onEdit">
                </b-form-select>
                <b-form-invalid-feedback class="invalid-feedback" :state="!errorCity">
                  Vui lòng nhập tỉnh/thành phố
                </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <label>Quận/ Huyện</label>
              <b-form-select 
                :options="optionsDistrict"
                id="district"
                type="text" 
                autocomplete="new-password"
                class="form-control"
                maxlength="100"
                v-model="inputs.district_id"
                :disabled="!onEdit">
              </b-form-select>
              <b-form-invalid-feedback  class="invalid-feedback" :state="!errorDistrict">
                Vui lòng nhập quận
              </b-form-invalid-feedback>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import AuthenticationAPI from '@/api/authentication'
import CustomerAPI from '@/api/customer'
import Mapper from '@/mapper/customer'
import MasterApi from '@/api/master'
import MasterMapper from '@/mapper/master'
import commonFunc from '@/common/commonFunc'
export default {
  name: 'Register',
  data () {
    return {
      inputs: {
        name: '',
        phone: '',
        gender: '',
        birthday: '',
        city_id: '',
        district_id: '',
      },
      options: [
        {value: '1', text: 'Nam'},
        {value: '2', text: 'Nữ'}
      ],
      optionsCity: [],
      optionsDistrict: [],
      click: false,
      onEdit: false,
    }
  },
  computed: {
    errorName: function () {
      return this.checkInfo(this.inputs.name)
    },
    errorCity: function () {
      return this.checkInfo(this.inputs.city_id)
    },
    errorDistrict: function () {
      return this.checkInfo(this.inputs.district_id)
    },
    errorPhone: function () {
      return this.checkInfo(this.inputs.phone)
    },
    errorGender: function () {
      return this.checkInfo(this.inputs.gender)
    },
    errorBirthday: function () {
      return this.checkInfo(this.inputs.gender)
    }
  },
  mounted () {
    this.getCustomerInfo()
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorCiti || this.errorDistrict || this.errorAddress || this.errorMonth)
    },
    getCustomerInfo () {
      let cusId = this.$store.state.user.id
      CustomerAPI.getCustomerInfo(cusId).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          this.inputs = Mapper.mapCustomerDetailToDto(res.data.data)
          this.getOptionCity()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * Get city options
     */
    getOptionCity() {
      MasterApi.getCityOptions().then(res => {
        this.optionsCity = MasterMapper.mapCityModelToDto(res.data.data)
        this.changeCity()
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
    },
    validateCode (event) {
      // not number
      if(!commonFunc.isNumber(event)) {
        event.preventDefault()
      }
    },
    edit() {
      this.onEdit = true
    },
    save() {

    }
  }
}
</script>
