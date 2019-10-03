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
                <h1>Register</h1>
                <p class="text-muted">
                  Create your account
                </p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-user" /></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    id="input-live"
                    v-model="inputs.username"
                    :state="usernameState"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    autocomplete="username"
                  />
                  <b-form-invalid-feedback id="input-live-feedback">
                    Enter at least 3 letters
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    id="input-email"
                    v-model="inputs.email"
                    :state="inputs.email.length > 0"
                    required
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    autocomplete="email"
                  />
                  <b-form-invalid-feedback id="input-email-feedback">
                    Required
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-key" /></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="inputs.password"
                    :state="inputs.password.length > 0 && repeat_password.length > 0 && inputs.password === repeat_password"
                    aria-describedby="password-help-block"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                  <b-form-text id="password-help-block">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not
                    contain spaces, special characters, or emoji.
                  </b-form-text>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-key" /></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="repeat_password"
                    :state="inputs.password.length > 0 && repeat_password.length > 0 && inputs.password === repeat_password"
                    type="password"
                    class="form-control"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </b-input-group>

                <b-button
                  :disabled="!inputs.username.length || !inputs.email.length"
                  variant="success"
                  block
                  @click="doRegister"
                >
                  Create Account
                </b-button>
                <router-link
                  :to="{ name: 'Login' }"
                  class="btn btn-primary btn-block"
                >
                  Log In
                </router-link>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button
                    block
                    class="btn btn-facebook"
                  >
                    <span>facebook</span>
                  </b-button>
                </b-col>
                <b-col cols="6">
                  <b-button
                    block
                    class="btn btn-twitter"
                    type="button"
                  >
                    <span>twitter</span>
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
        email: '',
        password: '',
      },
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
