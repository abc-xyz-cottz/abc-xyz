<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card no-body>
            <b-card-body class="welcome-page">
              <b-row>
                <b-col class="text-center">
                  <h5>Welcome To Delicious Restaurant</h5>
                </b-col>
              </b-row>
              <img src="/static/welcome.jpg"/>
              <b-row>
                <b-col cols="12" class="text-center">
                  <b-button variant="primary" class="px-4" @click="goToOrder()">
                  Chọn Món
                  </b-button>
                  <b-button variant="primary" class="px-4" @click="goToRequire()">
                  Gửi Yêu Cầu
                  </b-button>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goToOrder () {
      this.$router.push('/order')
    },
    goToRequire () {
      this.$router.push('/require')
    }
  }
}
</script>