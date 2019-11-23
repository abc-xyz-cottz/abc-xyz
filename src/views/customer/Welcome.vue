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

    <!-- Modal send request -->
    <b-modal hide-header-close no-close-on-backdrop centered hide-footer
    id="modal-send-request">
      <b-row>
        <b-col class="text-center">
          <h5>Yêu cầu của bạn sẽ được gửi tới nhân viên nhà hàng</h5>
          <p v-if="isConnected">We're connected to the server!</p>
          <p>Message from server: "{{socketMessage}}"</p>
        </b-col>
      </b-row>

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
        <b-col cols="4" class="text-left mt-3">
          <button class="btn btn-danger px-4">
            Hủy
          </button>
        </b-col>
        <b-col cols="8" class="text-right mt-3">
          <button class="btn btn-primary px-4" @click="pingServer()">
            Gửi Yêu Cầu
          </button>
        </b-col>
      </b-row>

    </b-modal>

  </div>
</template>
<script>

export default {
  data () {
    return {
      storeId: null,
      tableId: null,
      isConnected: false,
      socketMessage: ''
    }
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data
    }
  },

  mounted() {
    this.storeId = this.$route.params.sid
    this.tableId = this.$route.params.tid
  },

  methods: {
    /**
     * Go to menu
     */
    goToOrder () {
      this.$router.push('/order')
    },

    /**
     * Send request
     */
    goToRequire () {
      this.$bvModal.show('modal-send-request')
    },

    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!')
    }

  }
}
</script>
