<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card no-body>
            <b-card-body class="welcome-page">
              <b-row>
                <b-col class="text-center">
                  <h5>Yêu cầu của bạn sẽ được gửi tới nhân viên nhà hàng</h5>
                </b-col>
              </b-row>
              <b-form @submit.prevent="send">
                <b-row>
                  <b-col class="text-center">
                    <b-form-textarea
                    id="textarea"
                    placeholder="Enter something..."
                    rows="5"
                  ></b-form-textarea>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" class="text-center mt-3">
                    <button class="btn btn-primary px-4">
                      Gửi Yêu Cầu
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
export default {
  data () {
    return {

    }
  },
  methods: {
    send () {
      this.$bvModal.msgBoxOk('Yêu  cầu của bạn đã được gửi!', {
        title: false,
        buttonSize: 'sm',
        centered: true, size: 'sm',
        footerClass: 'p-2'
      })
    }
  }
}
</script>