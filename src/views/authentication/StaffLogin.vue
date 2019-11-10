<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body>
                <b-form @submit.prevent="logIn">
                  <h1 class="text-center">
                    RS
                  </h1>
                  <div class="form-group">
                    <label>Số Điện Thoại</label><span class="error-sybol"></span>
                    <input
                      id="phone"
                      v-model="inputs.phone_number"
                      type="text"
                      class="form-control"
                      placeholder="Nhập số điện thoại">
                  </div>
                  <div class="form-group">
                    <label>Mật Khẩu</label><span class="error-sybol"></span>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control"
                      placeholder="Nhập mật khẩu">
                  </div>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2">
                      <b-button
                        variant="primary"
                        class="px-4"
                        @click.prevent="logIn">
                        {{ onLogin ? 'Đăng Nhập...' : 'Đăng Nhập' }}
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      cols="12"
                      class="mb-2">
                      <a href="/forgetpass" class="pull-left mt-2">Quên Mật Khẩu</a>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import StaffMapper from '@/mapper/staff'
import Staff from '@/api/staff'

export default {
  name: 'Login',
  data () {
    return {
      inputs: {
        phone_number: '',
        password: ''
      },
      code: '',
      onLogin: false,
      selected: '',
    }
  },
  methods: {
     logIn () {
       this.onLogin = true
       //setTimeout(() => {
         Staff.logIn(this.inputs).then(res => {

            // Store token
            this.$store.commit('updateToken', res.data.data.token)

            // Store staff info
             const usr = StaffMapper.mapStaffModelToDto(res.data.data.staff_info)
             this.$store.commit('updateUser', usr);

              let role = res.data.data.staff_info.fields.role_name
              if(role == "STAFF") {
                this.$router.push("/home-staff")
              }
              if(role == "ADMIN") {
                this.$router.push("/home-admin")
              }
              if(role == "SUPPER_ADMIN") {
                this.$router.push("/home-sp-admin")
              }

         }).catch(err => {
           console.log(err);
           this.onLogin = false
         })
       //}, 5000)
     },
     onDecode (result) {
       this.code = result
     }
  }
}
</script>
