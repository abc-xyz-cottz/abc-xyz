<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
        <b-row class="form-row">
          <b-col md='6'>
            <h4 class="mt-2">Quản lý order</h4>
          </b-col>
          <b-col md='6' class="text-right">
            <b-button variant="primary" class="px-4" @click="goToOrderHis">
              Xem lịch sử đặt món
            </b-button>
          </b-col>
        </b-row>

        <hr/>
          <b-tabs content-class="mt-3">
              <!-- First tab -->
              <b-tab title="Orders" active>
                  <div  v-for="(item, index) in created" :key="item.table + index">
                      <b-row class="border border-dark mt-4 mess">
                        <h4 class="col-12">Bàn: {{item.table}}</h4>
                        <p class="col-12" v-if="item.type == 'order'">Loại: Order</p>
                        <p class="col-12" v-if="item.type == 'request'">Loại: Yêu cầu</p>
                        <p class="col-12" v-if="item.type == 'confirm'">Loại: Xác nhận</p>
                        <p class="col-12">Khách hàng: {{item.customerName}}</p>
                        <p class="col-12">Thời gian : {{item.time}}</p>
                        <p class="col-12" v-if="item.type == 'order'">Tổng thành tiền: {{item.totalPrice}}</p>
                        <p class="col-12" >Chi tiết:</p>
                        <p class="col-12" v-for="it in item.orders" :key="it">{{it}}</p>
                        <b-col class="col-6">
                            <div class="is-left">
                                <b-button class="btn-danger pull-left ml-3 px-1" @click="cancel(index, item.orderId, item.customerName, item.type)">
                                    Hủy
                                </b-button>
                            </div>
                        </b-col>
                        <b-col class="col-6">
                            <div class="text-right">
                                <b-button class="btn-primary pull-right ml-3 px-1" @click="confirm(index, item.orderId, item.customerName, item.type)">
                                    Xác nhận
                                </b-button>
                            </div>
                        </b-col>
                      </b-row>
                  </div>
              </b-tab>

              <!-- Second tab -->
              <b-tab title="Đã xác nhận">
                  <div  v-for="(item, index) in approved" :key="item.table + index">
                      <b-row class="border border-dark mt-4 mess">
                        <h4 class="col-12">Bàn: {{item.table}}</h4>
                        <p class="col-12" v-if="item.type == 'order'">Loại: Order</p>
                        <p class="col-12" v-if="item.type == 'request'">Loại: Yêu cầu</p>
                        <p class="col-12" v-if="item.type == 'confirm'">Loại: Xác nhận</p>
                        <p class="col-12">Khách hàng: {{item.customerName}}</p>
                        <p class="col-12">Thời gian : {{item.time}}</p>
                        <p class="col-12" v-if="item.type == 'order'">Tổng thành tiền: {{item.totalPrice}}</p>
                        <p class="col-12" >Chi tiết:</p>
                        <p class="col-12" v-for="it in item.orders" :key="it">{{it}}</p>
                      </b-row>
                  </div>
              </b-tab>

              <!-- Third tab -->
              <b-tab title="Đã hủy">
                  <div  v-for="(item, index) in canceled" :key="item.table + index">
                      <b-row class="border border-dark mt-4 mess">
                        <h4 class="col-12">Bàn: {{item.table}}</h4>
                        <p class="col-12" v-if="item.type == 'order'">Loại: Order</p>
                        <p class="col-12" v-if="item.type == 'request'">Loại: Yêu cầu</p>
                        <p class="col-12" v-if="item.type == 'confirm'">Loại: Xác nhận</p>
                        <p class="col-12">Khách hàng: {{item.customerName}}</p>
                        <p class="col-12">Thời gian : {{item.time}}</p>
                        <p class="col-12" v-if="item.type == 'order'">Tổng thành tiền: {{item.totalPrice}}</p>
                        <p class="col-12" >Chi tiết:</p>
                        <p class="col-12" v-for="it in item.orders" :key="it">{{it}}</p>
                      </b-row>
                  </div>
              </b-tab>
          </b-tabs>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import {Constant} from '@/common/constant'
import adminAPI from '@/api/admin'
import { RootAPI } from '@/api/index'
import commonFunc from '@/common/commonFunc'


export default {
  data () {
    return {
      created: [],
      approved: [],
      canceled: [],
      options: [
        {value: 1, text: '1 ngày'},
        {value: 7, text: '1 tuần'},
        {value: 30, text: '1 tháng'}
      ],
    }
  },
  computed: {
  },
  mounted() {

    // Load order history
    this.loadOrderHistory()

    // Define socket
    let user = JSON.parse(Cookies.get(Constant.APP_USR))
    let storeId = user.storeId

    let api = RootAPI.replace("http://", "").replace("https://", "").replace("/api/", "")
    var socket = new WebSocket("ws://" + api + "/join-group/admin-" + storeId)

    socket.onopen = event => {
        console.log('connected')
        this.connected = true
        socket.send({})
    }

    socket.onmessage = event => {
      var json_data = JSON.parse(event.data)
      // this.dataSet = json_data.text
      // console.log(json_data.text)
      this.created = [json_data.text].concat(this.created)
      // alert(JSON.stringify(json_data.text))
    }

    socket.onclose = event => {
      this.connected = false
    }
  },
  methods: {
    /**
   * Make toast without title
   */
  popToast(variant, content) {
    this.$bvToast.toast(content, {
      toastClass: 'my-toast',
      noCloseButton: true,
      variant: variant,
      autoHideDelay: 5000
    })
  },
     /**
     * Confirm
     */
    confirm(index, orderId, customerInfo, type) {
      this.approved = [this.created[index]].concat(this.approved)
      this.created.splice(index, 1)

       let phoneNumber = null
       if(customerInfo) {
         phoneNumber = customerInfo.split("-")[1]
       }

       // Update order status to db
       let orderInfo = {"id": orderId, "status": Constant.ORDER_APPROVED, "phoneNumber": phoneNumber, "type": type}
      adminAPI.updateOrderStatus(orderInfo).then(res => {
        this.popToast('success', 'Thao tác thành công!!! ')
      }).catch(err => {
        // Handle error
          let errorMess = commonFunc.handleStaffError(err)
          this.popToast('danger', errorMess)
      })
    },

    /**
     * Cancel
     */
    cancel(index, orderId, customerInfo, type) {
      this.canceled = [this.created[index]].concat(this.canceled)
      this.created.splice(index, 1)

      let phoneNumber = null
       if(customerInfo) {
         phoneNumber = customerInfo.split("-")[1]
       }

      // Update order status to db
      let orderInfo = {"id": orderId, "status": Constant.ORDER_CANCELED, "phoneNumber": phoneNumber, "type": type}
      adminAPI.updateOrderStatus(orderInfo).then(res => {
        this.popToast('success', 'Thao tác thành công!!! ')
      }).catch(err => {
          // Handle error
          let errorMess = commonFunc.handleStaffError(err)
          this.popToast('danger', errorMess)
      })
    },

    /**
     * Load orders history
     */
    loadOrderHistory() {
      adminAPI.loadOrderHistory().then(res => {
        // Load orders created
        let orders_created = res.data.data.orders_created
        this.created.push.apply(this.created, orders_created)

        // Load orders approved
        let orders_approved = res.data.data.orders_approved
        this.approved.push.apply(this.approved, orders_approved)

        // Load orders canceled
        let orders_canceled = res.data.data.orders_canceled
        this.canceled.push.apply(this.canceled, orders_canceled)
      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)
      })
    },

    /**
    * Go to order history
    */
    goToOrderHis() {
      this.$router.push('/order-history')
    }
  }
}
</script>

<style lang="scss">
.mess {
    background-color: white
}
</style>
