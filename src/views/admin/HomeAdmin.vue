<template>
  <div class="container-fluid">
    <div>
      <b-row class="form-row">
        <b-col md='12'>
          <h4 class="mt-2">Quản lý order</h4>
        </b-col>
      </b-row>
      <hr/>
        <b-tabs content-class="mt-3">
            <!-- First tab -->
            <b-tab title="Orders" active>
                <div  v-for="(item, index) in firstItems" :key="item.table + index">
                    <b-row class="border border-dark mt-4 mess">
                        <h4>{{item.table}}, Tổng thành tiền: {{item.totalPrice}}</h4>
                        <p class="col-12" v-for="it in item.orders" :key="it">{{it}}</p>
                        <b-col class="col-6">
                            <div class="is-left">
                                <b-button class="btn-danger pull-right ml-3 px-4" @click="cancel(index)">
                                    Hủy
                                </b-button>
                            </div>
                        </b-col>
                        <b-col class="col-6">
                            <div class="text-right">
                                <b-button class="btn-primary pull-right ml-3 px-4" @click="confirm(index, item.orderId)">
                                    Xác nhận
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-tab>

            <!-- Second tab -->
            <b-tab title="Đã xác nhận">
                <div  v-for="item in secondItems" :key="item.table">
                    <b-row class="border border-dark mt-4 mess">
                        <h4>{{item.table}}</h4>
                        <p class="col-12" v-for="it in item.orders" :key="it">{{it}}</p>
                    </b-row>
                </div>
            </b-tab>

            <!-- Third tab -->
            <b-tab title="Đã hủy">
                <div  v-for="item in thirdItems" :key="item.table">
                    <b-row class="border border-dark mt-4 mess">
                        <h4>{{item.table}}</h4>
                        <p class="col-12" v-for="it in item.orders" :key="it">{{it}}</p>
                    </b-row>
                </div>
            </b-tab>
        </b-tabs>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import {Constant} from '@/common/constant'
import adminAPI from '@/api/admin'


export default {
  data () {
    return {
      firstItems: [
      ],
      secondItems: [],
      thirdItems: []
    }
  },
  computed: {
  },
  mounted() {
    let user = JSON.parse(Cookies.get(Constant.APP_USR))
    let storeId = user.storeId

    var socket = new WebSocket(
        'ws://127.0.0.1:8000/join-group/' + storeId)

    socket.onopen = event => {
        console.log('connected')
        this.connected = true
        socket.send({})
    }

    socket.onmessage = event => {
      var json_data = JSON.parse(event.data)
      this.dataSet = json_data.text
      console.log(json_data.text)
      this.firstItems.push(json_data.text)
      // alert(JSON.stringify(json_data.text))
    }

    socket.onclose = event => {
      this.connected = false
    }
  },
  methods: {
     /**
     * Confirm
     */
    confirm(index, orderId) {
      this.secondItems.push(this.firstItems[index])
      this.firstItems.splice(index, 1)

       // Update order status to db

    },

    /**
     * Cancel
     */
    cancel(index) {
    this.thirdItems.push(this.firstItems[index])
    this.firstItems.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
.mess {
    background-color: white

}
</style>
