<template>
  <div class="app flex-row align-items-center" id="fullScreen">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card no-body>
            <b-card-body class="welcome-page">
              <b-row>
                <b-col class="text-center">
                  <h5>{{storeName}}</h5>
                  <p class="text-right">(Bàn: {{tableName}})</p>
                </b-col>
              </b-row>
              <br>
              <b-row>
                <b-col cols="12" class="text-center">
                  <b-button variant="primary" class="px-4 default-btn-bg" @click="goToOrder()">
                  Gọi Món
                  </b-button>
                  <b-button variant="primary" class="px-4 default-btn-bg" @click="goToRequire()">
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
      storeName: "Order way",
      tableId: null,
      tableName: "00",
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
    let code = this.$route.params.code
    let decode = atob(code)
    let decode_temmp = decode.split("-")

    this.storeId = decode_temmp[0]
    this.tableId = decode_temmp[1]

    this.getStoreNameTableName()
  },

  methods: {
  /**
   * Make toast with title
   */
  makeToast(variant = null, title, content) {
    this.$bvToast.toast(content, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 5000
    })
  },

    /**
     * Go to menu
     */
    goToOrder () {
      this.$router.push({ name: 'Order', params:{sid:this.storeId}})
    },

    /**
     * Show modal send request
     */
    goToRequire () {
      this.$bvModal.show('modal-send-request')
    },

    /**
     * Get store name, table name by id
     */
    getStoreNameTableName() {
      let dataPost = {"storeId": this.storeId, "tableId": this.tableId}
      CustomerAPI.getStoreNameTableName(dataPost).then(res => {
        this.storeName = res.data.data.store
        this.tableName = res.data.data.table

        // Store store
        this.$store.commit('updateStore', this.storeId)

        // Store table
        this.$store.commit('updateTable', this.tableId)
      }).catch(err => {
        // Handle error
        // let errorMess = commonFunc.handleStaffError(err)
        // this.popToast('danger', errorMess)
      })
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
        this.makeToast('success', 'Gửi yêu cầu thành công!!!', 'Yêu cầu của bạn đã được gửi tới nhân viên nhà hàng, bạn chờ trong giây lát nhé.' )
      }).catch(err => {
        this.makeToast('danger', 'Gửi yêu cầu thất bại!!!', 'Đã có lỗi xảy ra, bạn thử lại nhé.')
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

<style lang="scss" scoped>
  #fullScreen {
    background-image: url("../../../static/img/project/bg_welcome.png");
  }
</style>
