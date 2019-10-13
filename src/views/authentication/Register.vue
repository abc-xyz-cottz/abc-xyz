<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col
          md="6"
          sm="8"
        >
          <b-card
            no-body
            class="mx-4"
          >
            <b-card-body class="p-4">
              <b-form @submit="doRegister">
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
                  <label>Số Điện Thoại</label>
                  <b-form-select :options="options" class="mb-3"></b-form-select>
                </div>

                <div class="form-group">
                  <label>Ngày Tháng Năm SInh</label>
                  <input
                    id="birthday"
                    v-model="inputs.birthday"
                    type="text"
                    class="form-control">
                </div>
                <div class="form-group">
                  <label>Tỉnh/ Thành Phố</label>
                  <input
                    id="citi"
                    v-model="inputs.citi"
                    type="text"
                    class="form-control">
                </div>
                <div class="form-group">
                  <label>Quận/ Huyện</label>
                  <input
                    id="district"
                    v-model="inputs.district"
                    type="text"
                    class="form-control">
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
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row class="text-center">
                <b-col>
                  <b-button variant="primary" class="px-4">
                    Đăng Ký
                  </b-button>
                </b-col>
              </b-row>
            </b-card-footer>
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
      repeat_password: ''
    }
  },
  computed: {
    usernameState () {
      return this.inputs.username.length > 3 ? true : false
    }
  },
  methods: {
    validateForm () {
      let vm = this
      return new Promise(function(resolve, reject) {
        if (vm.repeat_password !== vm.inputs.password) {
          vm.$bvModal.msgBoxOk('Password is not matched', {
            title: 'Alert',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
          }).then(value => {}).catch(err => {})
          reject(null)
        } else {
          resolve(vm.inputs)
        }
      })
    },
    async doRegister (evt) {
      evt.preventDefault()
      let vm = this
      let validated_data = await this.validateForm()
      if (!validated_data) { return }
      AuthenticationAPI.register(validated_data).then(res => {
        vm.$bvModal.msgBoxOk('Successfully registered user. You can log in now', {
          title: 'Success',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(value => {
          vm.$router.push({ name: 'Login' })
        }).catch(err => {})
      }).catch(err => {
        console.log(err.response);
      })
    }
  }
}
</script>
