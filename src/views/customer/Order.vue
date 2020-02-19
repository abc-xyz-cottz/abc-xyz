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
                <button class="btn btn-primary pull-right  px-4" @click="confirmOrder()" :disabled="orderedNumber == 0">
                  Gọi Món <b style="color: deeppink">{{orderedNumber}}</b>
                </button>
              </b-col>
            </b-row>

            <b-row class="mt-3 border-bottom border-warning">
              <b-col><h4>Menu</h4></b-col>
            </b-row>

            <b-row v-for="item in items" :key="item.action" class="mt-3 pb-3 border-bottom border-warning">
              <b-col cols="5" class="text-right">
                <img :src="item.image" :style="{width: deviceWidth + 'px', height: deviceWidth + 'px'}"/>
              </b-col>
              <b-col cols="7" class="text-left">
                <h5><b>{{item.name}}</b></h5>
                <p>Giá: {{item.price}} vnđ</p>
                <b-list-group horizontal>
                    <b-list-group-item @click="countUp(item.action, item.topping)">
                      <i class="fa fa-plus" />
                    </b-list-group-item>
                    <b-list-group-item>
                      <span :id="item.action">0</span>
                    </b-list-group-item>
                  </b-list-group>
              </b-col>

            </b-row>

            <!--<b-row>-->
              <!--<b-col>-->
                <!--<b-table -->
                <!--hover-->
                <!--bordered-->
                <!--stacked="md"-->
                <!--:fields="fields" -->
                <!--:items="items">-->
                <!--<template v-slot:cell(image)="data">-->
                  <!--<img :src="data.item.image" :style="{width: 100 + 'px', height: 100 + 'px'}"/>-->
                <!--</template>-->
                <!--<template v-slot:cell(action)="dataId">-->
                  <!--<b-list-group horizontal>-->
                    <!--<b-list-group-item @click="countUp(dataId.value, dataId.item.topping)">-->
                      <!--<i class="fa fa-plus" />-->
                    <!--</b-list-group-item>-->
                    <!--<b-list-group-item>-->
                      <!--<span :id="`${dataId.value}`">0</span>-->
                    <!--</b-list-group-item>-->
                  <!--</b-list-group>-->
                <!--</template>-->
                <!--</b-table>-->
              <!--</b-col>-->
            <!--</b-row>-->


         <!--</b-form>-->
      </b-card-body>
      </b-card>

      <!-- Modal -->
      <b-modal id="modal-order" title="Thông Báo">
        <p>Gọi món thành công!</p>
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
    <b-modal title="Thông tin gọi món" centered hide-footer
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
            <template v-slot:cell(action)="dataId">
              <b-list-group horizontal>
                <b-list-group-item @click="countDownOrder(dataId.item.index)">
                  <i class="fa fa-minus" />
                </b-list-group-item>
                <b-list-group-item @click="countUpOrder(dataId.item.index, dataId.item.topping)">
                  <i class="fa fa-plus" />
                </b-list-group-item>
                <b-list-group-item hidden>
                  <span :id="`${dataId.value}`">0</span>
                </b-list-group-item>
              </b-list-group>
            </template>
          </b-table>

      <b-row>
        <b-col cols="12" class="text-left mt-3" v-show="promotion">
          - {{promotion}}
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4" class="text-left mt-3">
          <button class="btn btn-danger px-4" @click="cancelOrder()">
            Hủy
          </button>
        </b-col>
        <b-col cols="4" class="text-right mt-3">
          <button class="btn btn-primary px-4" @click="addPromotion()">
            Thêm khuyến mãi
          </button>
        </b-col>
        <b-col cols="4" class="text-right mt-3">
          <button class="btn btn-primary px-4" @click="sendOrder()">
            Xác nhận
          </button>
        </b-col>
      </b-row>

    </b-modal>

      <!-- Modal add promotion-->
    <b-modal title="Thêm khuyến mãi" centered hide-footer id="modal-add-promotion">
        <b-row>
          <b-col>
            <div v-for="promo in promotions" :key="promo.id">
              <input type="radio" v-model="promotion" name="promo" :value="promo.name">
              <label>{{ promo.name }}</label>
            </div>
         </b-col>
        </b-row>

        <b-row>
          <b-col cols="4" class="text-left mt-3">
            <button class="btn btn-danger px-4" @click="cancelAddPromo">
              Hủy
            </button>
          </b-col>
          <b-col cols="8" class="text-right mt-3">
            <button class="btn btn-primary px-4" @click="confirmAddPromotion" :disabled="promotion == null">
              Xác nhận
            </button>
          </b-col>
        </b-row>

    </b-modal>

      <!-- Modal show topping-->
    <b-modal title="Topping" centered hide-footer id="modal-choose-topping">

        <b-row v-show="sugarTopping.length != 0">
          <h5>Đường</h5>
          <hr/>
        </b-row>
      <b-row>
        <b-col>
          <div v-for="sugar in sugarTopping" :key="sugar.name" class="border">
            <input type="radio" v-model="sugars" name="sugar" :value="sugar.name">
            <label>{{ sugar.name }}</label>
          </div>
       </b-col>
      </b-row>

      <b-row v-show="iceTopping.length != 0">
          <h5>Đá</h5>
          <hr/>
        </b-row>
      <b-row>
        <b-col>
          <div v-for="ice in iceTopping" :key="ice.name" class="border">
            <input type="radio" v-model="ices" name="ice" :value="ice.name">
            <label>{{ ice.name }}</label>
          </div>
       </b-col>
      </b-row>

      <b-row v-show="sizeTopping.length != 0">
        <h5>Kích thước</h5>
        <hr/>
      </b-row>
      <b-row>
        <b-col>
          <div v-for="size in sizeTopping" :key="size.name" class="border">
            <input type="radio" v-model="sizes" name="size" :value="size.name">
            <label>{{ size.name }}</label>
          </div>
       </b-col>
      </b-row>

      <b-row v-show="foodTopping.length != 0">
          <h5>Topping</h5>
          <hr/>
        </b-row>
      <b-row>
        <b-col>
          <div v-for="food in foodTopping" :key="food.name" class="border">
            <input type="checkbox" v-model="foods" v-bind:name="food.name" :value="food.name">
            <label>{{ food.name }}   +{{food.price}}</label>
          </div>
       </b-col>
      </b-row>

        <b-row>
        </b-row>

        <b-row>
          <b-col cols="4" class="text-left mt-3">
            <button class="btn btn-danger px-4" @click="cancelTopping">
              Hủy
            </button>
          </b-col>
          <b-col cols="8" class="text-right mt-3">
            <button class="btn btn-primary px-4" @click="confirmTopping">
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
import ToppingMapper from '@/mapper/topping'
import PromotionMapper from '@/mapper/promotion'
import commonFunc from "../../common/commonFunc";

export default {
  data () {
    return {
      selected: null,
      counter: 0,
      perPage: '10',
      currentPage: '1',
      fields: [
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
          key: 'index',
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
        },
        {
          key: 'action',
          label: '',
          class: 'actions-cell'
        },

      ],
      items: [],
      orderItems: [],
      storeId: null,
      tableId: null,
      totalPrice: 0,
      currentIndex: null,
      toppingFields: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'name',
          label: 'Topping'
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
      sugarTopping: [],
      iceTopping: [],
      sizeTopping: [],
      foodTopping: [],
      toppingItems: [],
      sugars: "",
      ices: "",
      sizes: "",
      foods: [],
      menuCount: 0,
      orderedNumber: 0,
      customerId: null,
      customerName: null,
      promotions:[],
      promotion: null,
      deviceWidth: 100,

    }
  },

  mounted() {
    this.storeId = Cookies.get(Constant.STORE_ID)
    this.tableId = Cookies.get(Constant.TABLE_ID)

    this.getMenu()

    this.getTopping()

    this.getImageWidth()
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
     * Get width image
     */
    getImageWidth() {
      let tempWidth = window.innerWidth
      this.deviceWidth = (parseInt(tempWidth)/ 4)
    },

    /**
     * Get menu
     */
    getMenu() {
      CustomerApi.getMenu(this.storeId).then(res => {
        if(res && res.data && res.data.data) {
          this.items = MenuMapper.mapCustomerMenuModelToDto(res.data.data)

          // Get customer info
          let customer = Cookies.get(Constant.APP_USR)
          if(customer) {
            let cusTemp = JSON.parse(customer)
            this.customerId = cusTemp.id
            this.customerName = cusTemp.userName + " - " + cusTemp.phoneNumber

            // Get owner promotion
            this.getOwnerPromotion()
          }

        }
      }).catch(err => {
      })
    },

    /**
     * Get owner promotion
     */
    getOwnerPromotion() {
      CustomerApi.getPromotions(this.storeId).then(res => {
        if(res && res.data && res.data.data) {
          this.promotions = PromotionMapper.mapPromoOptionModelToDto(res.data.data)
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
      this.getTotalPrice()

      this.$bvModal.show('modal-confirm-order')
    },

    /**
     * Add promotion
     */
    addPromotion() {
      this.$bvModal.show('modal-add-promotion')
    },

    /**
     * Reset order
     */
    resetOrder() {
      for(var i = 0; i < this.orderItems.length; i++) {
        document.getElementById(this.orderItems[i].stt).textContent = 0
      }

      this.orderedNumber = 0
      this.orderItems = []
      this.totalPrice = 0
      this.promotion = null
    },

    /**
     * Send order
     */
    sendOrder () {
      // Hide modal
      this.$bvModal.hide('modal-confirm-order')

      // Send order
      let orderInfo = {"customerId": this.customerId,"customerName": this.customerName, "storeId": this.storeId,
        "tableId": this.tableId, "orders": this.orderItems, "promotion": this.promotion}

      CustomerAPI.sendOrder(orderInfo).then(res => {
        this.makeToast('success', 'Gọi món thành công!!!', 'Món ăn bạn gọi đã được gửi tới nhân viên nhà hàng, bạn chờ trong giây lát nhé.')
      }).catch(err => {
        this.makeToast('danger', 'Gọi món thất bại!!!', 'Đã có lỗi xảy ra, bạn thử lại nhé.')
      })

      // Reset order
      this.resetOrder()
    },

    /**
     * Check menu is exist
     */
    checkMenu(index) {
      if(this.orderItems.length > 0) {
        for(var i = 0; i < this.orderItems.length; i++ ) {
          if(this.orderItems[i].stt == index && this.items[index - 1].topping == false) {
            return true
          }
        }
      }
      return false
    },

    /**
     * Get index by id
     */
    getIndexById(id) {
      let index = 0
      if(this.orderItems.length > 0) {
        for(var i = 0; i < this.orderItems.length; i++) {
          if(this.orderItems[i].stt == id ) {
            return index
          }
          index = index + 1
        }
      }
      return index
    },

    /**
     * Add menu
     */
    addMenu(id) {
      if(this.checkMenu(id)) {
        // Remove old
        let indexTemp = this.getIndexById(id)
        this.orderItems.splice(indexTemp, 1)
      }
      // Add new
      let count = parseInt(document.getElementById(id).textContent)
      if(count > 0) {
        let order = {}
        order.index = this.orderItems.length + 1
        order.stt = id
        order.name = this.items[id-1].name
        order.price = this.items[id-1].price
        order.priceTempStr = this.items[id-1].price
        order.priceTempInt = commonFunc.numberFormat(this.items[id-1].price)
        let amount = 0

        if(this.items[id-1].topping) {
          order.quantity = 1
          amount = this.items[id-1].price
          order.amount = commonFunc.currencyFormat(amount)
        } else {
          order.quantity = count
          amount = parseInt(commonFunc.numberFormat(this.items[id-1].price)) * parseInt(count)
          order.amount = commonFunc.currencyFormat(amount)
        }

        this.orderItems.push(order)
      }

      // Update ordered number
      this.orderedNumber = this.orderedNumber + 1
    },

    /**
     * Count down number of food
     */
    countDown (num) {
      let currentNumber = parseInt(document.getElementById(num).textContent)
      if(currentNumber > 0) {
        document.getElementById(num).textContent = currentNumber - 1
      }
      this.addMenu(num)
    },

    /**
     * Update index
     */
    updateIndex() {
      for(var i = 0; i < this.orderItems.length; i++) {
        this.orderItems[i].index = i + 1
      }
    },

    /**
     * Count down number of food
     */
    countDownOrder (index) {

      index = index - 1
      if(this.orderItems[index].quantity == 1) {
        this.orderItems.splice(index, 1)

        // Update index
        this.updateIndex()

      } else {
        this.orderItems[index].quantity = this.orderItems[index].quantity - 1
        this.orderItems[index].amount = commonFunc.currencyFormat(this.orderItems[index].quantity * commonFunc.numberFormat(this.orderItems[index].price))
      }
      this.getTotalPrice()

      // Update ordered number
      this.orderedNumber = this.orderedNumber - 1
    },

    /**
     * Count down number of food
     */
    countUpOrder (index) {

      index = index - 1

      this.orderItems[index].quantity = this.orderItems[index].quantity + 1
      this.orderItems[index].amount = commonFunc.currencyFormat(this.orderItems[index].quantity * commonFunc.numberFormat(this.orderItems[index].price))
      this.getTotalPrice()

      // Update ordered number
      this.orderedNumber = this.orderedNumber + 1
    },

    /**
     * Get total price
     */
    getTotalPrice() {
      this.totalPrice = 0
      for(var i = 0; i < this.orderItems.length; i++) {
        this.totalPrice = this.totalPrice + commonFunc.numberFormat(this.orderItems[i].amount)
      }
      this.totalPrice = commonFunc.currencyFormat(this.totalPrice)
    },

    /**
     * Count up number of food
     */
    countUp (num, toppingFlag) {
      if(toppingFlag) {
        this.$bvModal.show('modal-choose-topping')
      }
      this.currentIndex = num
      let currentNumber = document.getElementById(num).textContent
      document.getElementById(num).textContent = parseInt(currentNumber) + 1

      this.addMenu(num)
    },

    /**
     * Go back
     */
    goBack() {
      let code = btoa(this.storeId + "-" + this.tableId)
      this.$router.push('/welcome/' + code)
    },

    /**
     * Get topping
     */
    getTopping() {
      CustomerApi.getTopping(this.storeId).then(res => {
        if(res && res.data && res.data.data) {
          let respone = res.data.data
          this.sugarTopping = ToppingMapper.mapToppingCusModelToDto(respone.sugar)
          this.iceTopping = ToppingMapper.mapToppingCusModelToDto(respone.ice)
          this.sizeTopping = ToppingMapper.mapToppingCusModelToDto(respone.size)
          this.foodTopping = ToppingMapper.mapToppingCusModelToDto(respone.food)
        }
      }).catch(err => {
      })
    },

    /**
     * Cancel topping
     */
    cancelTopping() {
      this.$bvModal.hide('modal-choose-topping')
    },

    /**
     * Get total price of topping
     */
    getTotalPriceOfTopping() {
      let totalPrice = 0
      for(var i = 0; i < this.foods.length; i++ ) {
        for (var j = 0; j < this.foodTopping.length; j++) {
          if (this.foods[i] == this.foodTopping[j].name) {
            totalPrice = totalPrice + this.foodTopping[j].price
          }
        }
      }
      return totalPrice
    },

    /**
     * Confirm topping
     */
    confirmTopping() {
      // let topping = {}
      //
      // topping.menu = this.currentIndex
      let detail = ""
      if(this.sugars) {
        detail = detail + this.sugars + " đường, "
      }
      if(this.ices) {
        detail = detail + this.ices + " đá, "
      }
      if(this.sizes) {
        detail = detail + "Size: " + this.sizes
      }
      if(this.foods) {
        detail = detail + this.foods
      }
      if (detail != "") {
        this.orderItems[this.orderItems.length - 1].name = this.orderItems[this.orderItems.length - 1].name + "(" + detail + ")"
      }
      // this.orderItems[this.orderItems.length - 1].topping = detail
      let toppingPrice = this.getTotalPriceOfTopping()
      let foodPrice = commonFunc.numberFormat(this.orderItems[this.orderItems.length - 1].price)
      if(toppingPrice > 0) {
        this.orderItems[this.orderItems.length - 1].priceTempStr = this.orderItems[this.orderItems.length - 1].price + " + " + toppingPrice
        let price = foodPrice + toppingPrice
        this.orderItems[this.orderItems.length - 1].priceTempInt = commonFunc.numberFormat(price)
        this.orderItems[this.orderItems.length - 1].price = commonFunc.currencyFormat(price)
        this.orderItems[this.orderItems.length - 1].amount = commonFunc.currencyFormat((price) * this.orderItems[this.orderItems.length - 1].quantity)
      }
      this.orderItems[this.orderItems.length - 1].toppingPrice = toppingPrice
      // alert(JSON.stringify(this.orderItems))

      this.$bvModal.hide('modal-choose-topping')

      // console.log(this.toppingItems)
      this.resetModal()
    },

    /**
     * Reset modal
     */
    resetModal() {
      this.sugars = ""
      this.ices = ""
      this.sizes = ""
      this.foods = []
    },

    /**
     * Cancel add promotion
     */
    cancelAddPromo() {
      this.promotion = null
      this.$bvModal.hide('modal-add-promotion')
    },

    /**
     * Confirm add promotion
     */
    confirmAddPromotion() {
      this.$bvModal.hide('modal-add-promotion')
    }
  }
}
</script>
