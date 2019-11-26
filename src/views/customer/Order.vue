<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="container">
      <b-card no-body>
      <b-card-body class="welcome-page">
         <!--<b-form>-->
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

            <b-row>
              <b-col cols="12" class="mt-3">
                <button class="btn btn-primary pull-right  px-4" @click="sendOrder">
                    Đặt Món
                </button>
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
      items: [
      ],
      // socket: null,
      // connected: false
      storeId: null,
      tableId: null
    }
  },

  mounted() {
    this.storeId = Cookies.get(Constant.STORE_ID)
    this.tableId = Cookies.get(Constant.TABLE_ID)

    this.getMenu()
  },

  methods: {
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
     * Send order
     */
    sendOrder () {

      // Get customer info
      let customer = Cookies.get(Constant.APP_USR)
      let customerId = null
      if(customer) {
        customerId = JSON.parse(customer).id
      }


      // Get list order
      let listOrder = []
      for(var i = 1; i <= this.items.length; i++) {
        let count = parseInt(document.getElementById(i).textContent)
        if(count > 0) {
          let order = this.items[i-1]
          order.quantity = count
          listOrder.push(order)
        }
      }

      // Send order
      let orderInfo = {"customerId": customerId, "storeId": this.storeId, "tableId": this.tableId, "orders": listOrder}
      CustomerAPI.sendOrder(orderInfo).then(res => {
        this.$bvModal.msgBoxOk("Món ăn bạn gọi đã được gửi tới nhân viên nhà hàng, bạn chờ trong giây lát nhé!!!", {
          title: "Đặt món thành công!!! ",
          buttonSize: 'sm',
          centered: true, size: 'sm',
          footerClass: 'p-2'
        })
      }).catch(err => {
        console.log(err)

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
    }
  }
}
</script>
