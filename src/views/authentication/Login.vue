<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card
              no-body
              class="p-4">
              <b-card-body>
                <b-form @submit.prevent="logIn">
                  <h1 class="text-center">
                    F&B
                  </h1>
                  <p class="text-center">
                    Sign In to your account
                  </p>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      id="username"
                      v-model="inputs.username"
                      type="text"
                      class="form-control"
                      placeholder="input username ...">
                  </div>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      id="password"
                      v-model="inputs.password"
                      type="password"
                      class="form-control"
                      placeholder="input password ...">
                  </div>
                  <b-row>
                    <b-col
                      cols="12"
                      class="text-center mt-3">
                      <b-button
                        variant="primary"
                        class="px-4"
                        @click.prevent="logIn">
                        {{ onLogin ? 'Login...' : 'Login' }}
                      </b-button>
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
import AuthenticationAPI from '@/api/authentication'
import Mapper from '@/common/mapper'
export default {
  name: 'Login',
  data () {
    return {
      inputs: {
        username: '',
        password: ''
      },
      onLogin: false
    }
  },
  methods: {
    logIn () {
      this.onLogin = true
      setTimeout(() => {
        AuthenticationAPI.logIn(this.inputs).then(res => {
          this.$store.commit('updateToken', res.data.data);
          this.onLogin = false
          AuthenticationAPI.getUserInfo().then(res => {
            const usr = Mapper.mapUserModelToDto(res.data.data);
            this.$store.commit('updateUser', usr);
            if (this.$store.state.user.roleCode == "STAFF") {
              this.$router.push({ name: 'Welcome' })
            }
            if (this.$store.state.user.roleCode == "ADMIN") {
              this.$router.push({ name: 'Home' })
            }
          })
        }).catch(err => {
          console.log(err);
          this.onLogin = false
        })
      }, 500)
    }
  }
}
</script>
