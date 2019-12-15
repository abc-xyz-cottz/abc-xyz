<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="container">
      <b-card no-body>
      <b-card-body class="welcome-page">
         <!--<b-form>-->
            <b-row>
              <b-col cols="6">
                <b-button variant="secondary" class="pull-left px-4" @click="goBack()">
                  Quay lại
                </b-button>
              </b-col>
              <b-col cols="6">
                <button class="btn btn-primary pull-right  px-4" @click="confirmOrder()">
                    Đặt Món
                </button>
              </b-col>
            </b-row>

            <b-row class="mt-3">

            </b-row>

            <b-row>
              <b-col>
                <b-table 
                hover
                bordered
                stacked="md"
                :fields="fields" 
                :items="items">
                <template v-slot:cell(action)="dataId">
                  <b-list-group horizontal>
                    <b-list-group-item @click="countDown(dataId.value)">
                      <i class="fa fa-minus" />
                    </b-list-group-item>
                    <b-list-group-item @click="countUp(dataId.value)">
                      <i class="fa fa-plus" />
                    </b-list-group-item>
                    <b-list-group-item>
                      <span :id="`${dataId.value}`">0</span>
                    </b-list-group-item>
                  </b-list-group>
                </template>
                </b-table>
              </b-col>
            </b-row>


         <!--</b-form>-->
      </b-card-body>
      </b-card>

      <!-- Modal -->
      <b-modal id="modal-order" title="Thông Báo">
        <p>Đặt món thành công!</p>
        <p>Đăng ký tài khoản để tích điểm và nhận nhiều khuyến mãi từ nhà hàng</p>
        <template v-slot:modal-footer>
          <b-button
            variant="primary"
            class="px-4"
            @click="$bvModal.hide('modal-order')"
          > OK</b-button>
      </template>
      </b-modal>

      <!-- Modal confirm order -->
    <b-modal title="Thông tin đặt món" centered hide-footer
    id="modal-confirm-order">
      <b-row>
        <b-col>
          <p>Tổng thành tiền: <b>{{totalPrice}}</b></p>
        </b-col>
      </b-row>
        <b-table
          hover
          bordered
          stacked="md"
          :fields="orderfields"
          :items="orderItems">
          </b-table>
      <b-row>

      </b-row>

      <b-row>
        <b-col cols="4" class="text-left mt-3">
          <button class="btn btn-danger px-4" @click="cancelOrder()">
            Hủy
          </button>
        </b-col>
        <b-col cols="8" class="text-right mt-3">
          <button class="btn btn-primary px-4" @click="sendOrder()">
            Xác nhận
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
import CustomerApi from '@/api/customer'
import MenuMapper from '@/mapper/menu'

export default {
  data () {
    return {
      selected: null,
      counter: 0,
      perPage: '10',
      currentPage: '1',
      fields: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'image',
          label: 'Hình Ảnh'
        },
        {
          key: 'name',
          label: 'Tên Sản Phẩm'
        },
        {
          key: 'price',
          label: 'Giá'
        },
        {
          key: 'action',
          label: '',
          class: 'actions-cell'
        }
      ],
      orderfields: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'name',
          label: 'Tên Sản Phẩm'
        },
        {
          key: 'price',
          label: 'Đơn giá'
        },
        {
          key: 'quantity',
          label: 'Số Lượng',
        },
        {
          key: 'amount',
          label: 'Thành tiền',
        }
      ],
      items: [
      ],
      orderItems: [
      ],
      // socket: null,
      // connected: false
      storeId: null,
      tableId: null,
      totalPrice: 0
    }
  },

  mounted() {
    this.storeId = Cookies.get(Constant.STORE_ID)
    this.tableId = Cookies.get(Constant.TABLE_ID)

    this.getMenu()
  },

  methods: {
  /**
   * Make toast with title
   */
  makeToast(variant = null, title="Success!!!", content="Thao tác thành công!!!") {
    this.$bvToast.toast(content, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 5000
    })
  },

    /**
     * Get menu
     */
    getMenu() {
      CustomerApi.getMenu(this.storeId).then(res => {
        if(res && res.data && res.data.data) {
          this.items = MenuMapper.mapCustomerMenuModelToDto(res.data.data)
        }

      }).catch(err => {
      })
    },

    /**
     * Cancel order
     */
    cancelOrder() {
      this.$bvModal.hide('modal-confirm-order')
    },

    /**
     * Confirm order
     */
    confirmOrder() {
      // Get list order
      this.orderItems = []
      for(var i = 1; i <= this.items.length; i++) {
        let count = parseInt(document.getElementById(i).textContent)
        let index = 1
        if(count > 0) {
          let order = {}
          order.stt = index
          order.name = this.items[i-1].name
          order.price = this.items[i-1].price
          order.quantity = count
          let amount = parseInt(this.items[i-1].price) * parseInt(count)
          order.amount = amount
          this.totalPrice = this.totalPrice + amount

          this.orderItems.push(order)
          index = index + 1
        }
      }

      if(this.orderItems.length == 0) {
        return
      }

      this.$bvModal.show('modal-confirm-order')
    },

    /**
     * Send order
     */
    sendOrder () {
      // Hide modal
      this.$bvModal.hide('modal-confirm-order')

      // Get customer info
      let customer = Cookies.get(Constant.APP_USR)
      let customerId = null
      let customerName = null
      if(customer) {
        let cusTemp = JSON.parse(customer)
        customerId = cusTemp.id
        customerName = cusTemp.userName + " - " + cusTemp.phoneNumber
      }

      // Send order
      let orderInfo = {"customerId": customerId,"customerName": customerName, "storeId": this.storeId, "tableId": this.tableId, "orders": this.orderItems}
      console.log(JSON.stringify(orderInfo))
      CustomerAPI.sendOrder(orderInfo).then(res => {
        // this.$bvModal.msgBoxOk("Món ăn bạn gọi đã được gửi tới nhân viên nhà hàng, bạn chờ trong giây lát nhé!!!", {
        //   title: "Đặt món thành công!!! ",
        //   buttonSize: 'sm',
        //   centered: true, size: 'sm',
        //   footerClass: 'p-2'
        // })
        this.makeToast('success', 'Đặt món thành công!!!', 'Món ăn bạn gọi đã được gửi tới nhân viên nhà hàng, bạn chờ trong giây lát nhé.')
      }).catch(err => {
        this.makeToast('danger', 'Đặt món thất bại!!!', 'Đã có lỗi xảy ra, bạn thử lại nhé.')
      })
    },

    /**
     * Count down number of food
     */
    countDown (num) {
      let currentNumber = parseInt(document.getElementById(num).textContent)
      if(currentNumber > 0) {
        document.getElementById(num).textContent = currentNumber - 1
      }
    },

    /**
     * Count up number of food
     */
    countUp (num) {
      let currentNumber = document.getElementById(num).textContent
      document.getElementById(num).textContent = parseInt(currentNumber) + 1
    },

    /**
     * Go back
     */
    goBack() {
      this.$router.push('/store/' + this.storeId + '/table/' + this.tableId)
    }
  }
}
</script>
