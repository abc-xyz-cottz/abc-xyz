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
                  <h3>Đăng Ký</h3>
                  <div class="form-group">
                    <label>Tên</label><span class="error-sybol"></span>
                    <input
                      id="name"
                      v-model="inputs.name"
                      type="text"
                      class="form-control">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>

                  <div class="form-group">
                    <label>Số Điện Thoại</label><span class="error-sybol"></span>
                    <input
                      id="phone"
                      v-model="inputs.phone"
                      type="text"
                      class="form-control">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPhone">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>

                  <div class="form-group">
                    <label>Giới Tính</label><span class="error-sybol"></span>
                    <b-form-select :options="options" v-model="inputs.gender" class="mb-3"></b-form-select>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorGender">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>

                  <div class="form-group">
                    <label>Ngày Tháng Năm Sinh</label><span class="error-sybol"></span>
                     <div class='input-group date'>
                    <date-picker v-model="inputs.birthday" :config="optionsDate">
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                    </date-picker>
                     </div>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorBirthday">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Tỉnh/ Thành Phố</label><span class="error-sybol"></span>
                    <b-form-select
                      id="city"
                      :options="optionsCity"
                      v-model="inputs.city"
                      type="text"
                      class="form-control"></b-form-select>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorCity">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Quận/ Huyện</label><span class="error-sybol"></span>
                    <b-form-select
                      id="district"
                      :options="optionsDistrict"
                      v-model="inputs.district"
                      type="text"
                      class="form-control"></b-form-select>
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorDistrict">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Mật Khẩu</label><span class="error-sybol"></span>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPassword">
                      {{ lang_en.commons.requiredField }}
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <label>Nhắc Lại Mật Khẩu</label><span class="error-sybol"></span>
                    <input
                      id="confirm-password"
                      v-model="inputs.confirmPassword"
                      type="password"
                      class="form-control">
                    <b-form-invalid-feedback  class="invalid-feedback" :state="!errorConfirmPassword">
                      {{ lang_en.commons.requiredField }}
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
import lang_en from "@/lang/lang_en.json";
import 'bootstrap/dist/css/bootstrap.css';
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
export default {
  name: 'Register',
  data () {
    return {
      inputs: {
        username: null,
        phone: null,
        gender: null,
        birthday: null,
        city: null,
        district: null,
        password: null,
        confirmPassword: null
      },
      options: [
        {value: 'nam', text: 'Nam'},
        {value: 'nu', text: 'Nữ'}
      ],
      optionsCity: [
        {value: 'HCM', text: 'Hồ Chí Minh'},
        {value: 'HN', text: 'Hà Nội'}
      ],
      optionsDistrict: [
        {value: '1', text: 'Quận 1'},
        {value: '2', text: 'Quận 3'}
      ],
      repeat_password: '',
      lang_en: lang_en,
      click: false,
      optionsDate: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
        viewMode: 'years'
      }
    }
  },
  components: {
    datePicker
  },
  computed: {
    errorName: function () {
      return this.checkInfo(this.inputs.name)
    },
    errorPhone: function () {
      return this.checkInfo(this.inputs.phone)
    },
    errorGender: function () {
      return this.checkInfo(this.inputs.gender)
    },
    errorBirthday: function () {
      return this.checkInfo(this.inputs.birthday)
    },
    errorCity: function () {
      return this.checkInfo(this.inputs.city)
    },
    errorDistrict: function () {
      return this.checkInfo(this.inputs.district)
    },
    errorPassword: function () {
      return this.checkInfo(this.inputs.password)
    },
    errorConfirmPassword: function () {
      return this.checkInfo(this.inputs.confirmPassword)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },

    checkValidate () {
      return !(this.errorName || this.errorPhone || this.errorGender || this.errorBirthday
        || this.errorCity || this.errorDistrict || this.errorPassword || this.errorConfirmPassword)
    },

    checkPassword () {
      return (this.inputs.password == this.inputs.confirmPassword)
    },
    update () {
      this.click = true
      let result = this.checkValidate()
      if(result) {
        result = this.checkPassword()
        if(result) {
          this.$router.push('/active')
        }
        else {
          console.log('password not match')
        }
      }
    },
  }
}
</script>
