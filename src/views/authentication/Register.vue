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
                    <label>Tên</label>
                    <input
                      id="name"
                      v-model="inputs.name"
                      type="text"
                      class="form-control">
                  </div>

                  <div class="form-group">
                    <label>Số Điện Thoại</label>
                    <input
                      id="phone"
                      v-model="inputs.phone"
                      type="text"
                      class="form-control">
                  </div>

                  <div class="form-group">
                    <label>Giới Tính</label>
                    <b-form-select :options="options" class="mb-3"></b-form-select>
                  </div>

                  <div class="form-group">
                    <label>Ngày Tháng Năm Sinh</label>
                    <input
                      id="birthday"
                      v-model="inputs.birthday"
                      type="text"
                      class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Tỉnh/ Thành Phố</label>
                    <b-form-select
                      id="citi"
                      :options="optionsCiti"
                      v-model="inputs.citi"
                      type="text"
                      class="form-control"></b-form-select>
                  </div>
                  <div class="form-group">
                    <label>Quận/ Huyện</label>
                    <b-form-select
                      id="district"
                      :options="optionsDistrict"
                      v-model="inputs.district"
                      type="text"
                      class="form-control"></b-form-select>
                  </div>
                  <div class="form-group">
                    <label>Mật Khẩu</label>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Nhắc Lại Mật Khẩu</label>
                    <input
                      id="confirm-password"
                      v-model="inputs.cònirmPassword"
                      type="password"
                      class="form-control">
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
export default {
  name: 'Register',
  data () {
    return {
      inputs: {
        username: '',
        phone: '',
        gender: '',
        birthday: '',
        citi: '',
        district: '',
        password: '',
        confirmPassword: ''
      },
      options: [
        {value: 'nam', text: 'Nam'},
        {value: 'nu', text: 'Nữ'}
      ],
      optionsCiti: [
        {value: 'nam', text: 'HCM'},
        {value: 'nu', text: 'HN'}
      ],
      optionsDistrict: [
        {value: '1', text: 'Quận 1'},
        {value: '2', text: 'Quận 3'}
      ],
      repeat_password: ''
    }
  },
  methods: {
    update () {
      this.$router.push('/active')
    }
  }
}
</script>
