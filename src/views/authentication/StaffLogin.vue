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
                    <label>Số Điện Thoại</label>
                    <input
                      id="phone"
                      v-model="inputs.phone"
                      type="text"
                      class="form-control"
                      placeholder="Nhập số điện thoại">
                  </div>
                  <div class="form-group">
                    <label>Mật Khẩu</label>
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
                      <a href="#/changepass" class="pull-right mt-2">Quên Mật Khẩu</a>
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
export default {
  name: 'Login',
  data () {
    return {
      inputs: {
        phone: '',
        password: ''
      },
      code: '',
      onLogin: false,
      selected: '',
    }
  },
  methods: {
  }
}
</script>