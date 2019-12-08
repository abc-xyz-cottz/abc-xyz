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
    <b-modal centered hide-footer
    id="modal-send-request">
      <b-row>
        <b-col class="text-center">
          <h5>Yêu cầu của bạn sẽ được gửi tới nhân viên nhà hàng</h5>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="text-center">
          <b-form-textarea
          id="textarea"
          placeholder="Cho anh(chị) chén mắm ngọt nhé!!!"
          rows="5"
          v-model="request"
        ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4" class="text-left mt-3">
          <button class="btn btn-danger px-4" @click="cancel()">
            Hủy
          </button>
        </b-col>
        <b-col cols="8" class="text-right mt-3">
          <button class="btn btn-primary px-4" @click="sendRequest()">
            Gửi Yêu Cầu
          </button>
        </b-col>
      </b-row>

    </b-modal>

  </div>
</template>
<script>
import CustomerAPI from '@/api/customer'
import Cookies from 'js-cookie'
import {Constant} from '@/common/constant'

export default {
  data () {
    return {
      storeId: null,
      tableId: null,
      request: null,
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

    // Store store
    this.$store.commit('updateStore', this.$route.params.sid)

    // Store table
    this.$store.commit('updateTable', this.$route.params.tid)
  },

  methods: {
    /**
     * Go to menu
     */
    goToOrder () {
      this.$router.push({params:{sid:this.storeId}})
      this.$router.push('/menu')
    },

    /**
     * Show modal send request
     */
    goToRequire () {
      this.$bvModal.show('modal-send-request')
    },

    /**
     * Send request
     */
    sendRequest() {
      // Hide modal
      this.$bvModal.hide('modal-send-request')

      if(!this.request) {
        return
      }

      // Get customer info
      let customer = Cookies.get(Constant.APP_USR)
      let customerId = null
      let customerName = null
      if(customer) {
        let cusTemp = JSON.parse(customer)
        customerId = cusTemp.id
        customerName = cusTemp.userName + " - " + cusTemp.phoneNumber
      }

      // Send request
      let requestInfo = {
        "tableId": this.tableId,
        "storeId": this.storeId,
        "customerId": customerId,
        "customerName": customerName,
        "orders": this.request
      }

      CustomerAPI.sendRequest(requestInfo).then(res => {
        this.$bvModal.msgBoxOk("Yêu cầu của bạn đã được gửi tới nhân viên nhà hàng, bạn chờ trong giây lát nhé!!!", {
          title: "Gửi yêu cầu thành công!!! ",
          buttonSize: 'sm',
          centered: true, size: 'sm',
          footerClass: 'p-2'
        })
      }).catch(err => {
        console.log(err)

      })
      this.request = ""
    },

    /**
     * Cancel send request
     */
    cancel() {
      this.request = ""
      this.$bvModal.hide('modal-send-request')
    }
  }
}
</script>
