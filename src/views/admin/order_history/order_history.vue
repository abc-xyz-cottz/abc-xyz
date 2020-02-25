<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col cols="12">
              <b-button variant="secondary" class="pull-left px-4" @click="back">
                Quay lại
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col md='12'>
              <h4 class="mt-2 text-center">Lịch Sử Gọi Món</h4>
            </b-col>
          </b-row>
          <hr>
          <b-form>
              <b-row class="form-row">
                <b-col md="4">
                  <label> Loại:  </label>
                  <b-form-select
                  :options="typeOptions"
                  id="status"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="inputs.type"></b-form-select>
                </b-col>
                <b-col md="4">
                  <label> Trạng thái: </label>
                  <b-form-select
                  :options="statusOptions"
                  id="status"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="inputs.status"></b-form-select>
                </b-col>
                <b-col md="4">
                  <label> Thời gian: </label>
                  <b-form-select
                  :options="timeOptions"
                  id="status"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="inputs.time"></b-form-select>
                </b-col>
              </b-row>
              <hr>

            <b-row class="pull-right mb-3">
              <b-col >
                <b-button variant="primary" class="px-4" :disabled="onSearch" @click.prevent="prepareToSearch">
                  Lọc
                </b-button>
              </b-col>
            </b-row>


            <b-row>
              <b-col>
                Số kết quả: {{total}}
              </b-col>
            </b-row>
          </b-form>
        </b-card>
        <b-card v-for="(item, index) in items" :key="item.table + index">
          <div>
              <b-row class="mess">
                <h4 class="col-12"><b>Bàn: {{item.table}}</b></h4>
                <p class="col-12" v-if="item.type == 'order'"><b>Loại:</b> Đặt món</p>
                <p class="col-12" v-if="item.type == 'request'"><b>Loại:</b> Yêu cầu</p>
                <p class="col-12" v-if="item.type == 'confirm'"><b>Loại:</b> Xác nhận</p>
                <p class="col-12"><b>Trạng thái:</b> {{item.status}}</p>
                <p class="col-12"><b>Khách hàng:</b> {{item.customerName}}</p>
                <p class="col-12"><b>Thời gian:</b> {{item.time}}</p>
                <p class="col-12" v-if="item.type == 'order'"><b>Tổng thành tiền:</b> {{item.totalPrice}}</p>
                <p class="col-12" ><b>Chi tiết:</b></p>
                <p class="col-12" v-for="it in item.orders" :key="it">{{it}}</p>
              </b-row>
          </div>
        </b-card>

      </b-col>
    </b-row>

    <!-- Loading -->
    <span class="loading-more" v-show="loading"><icon name="loading" width="60" /></span>
    <span class="loading-more" v-if="hasNext === false">Hết</span>
  </div>
</template>
<script>
import adminAPI from '@/api/admin'
import {Constant} from '@/common/constant'
import commonFunc from '@/common/commonFunc'


export default {
  data () {
    return {
      inputs: {
        type: null,
        time: null,
        status: null
      },
      items: [],
      typeOptions: [
        {value: null, text: ''},
        {value: 'order', text: 'Gọi món'},
        {value: 'request', text: 'Yêu cầu'}
      ],
      statusOptions: [
        {value: null, text: ''},
        {value: 'created', text: 'Đã gửi'},
        {value: 'approved', text: 'Đã xác nhận'},
        {value: 'canceled', text: 'Đã hủy'}
      ],
      timeOptions: [
        {value: 1, text: '1 ngày'},
        {value: 7, text: '7 ngày'},
        {value: 30, text: '30 ngày'}
      ],
      pageLimit: Constant.PAGE_LIMIT,
      offset: 0,
      hasNext: true,
      onSearch: false,
      loadByScroll: false,
      loading: false,
      total: 0
    }
  },
  computed: {
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)

    // Load list when load page
    this.search()
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
     *  Processing on scroll: use for paging
     */
    onScroll (event) {
      if(this.onSearch) {
        return
      }
      event.preventDefault()
      var body = document.body
      var html = document.documentElement
      if (window.pageYOffset + window.innerHeight +1 > Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)) {
        if(this.hasNext) {
          this.offset = this.offset + 10
          this.loadByScroll = true
          this.search ()
        }
      }
    },

    /**
     * Prepare to search
     */
    prepareToSearch() {
      this.offset = 0
      this.items = []
      this.hasNext = true

      this.search()
    },

    /**
     *  Search
     */
    search() {
      if (this.loading) { return }

      this.onSearch = true
      this.loading = true
      // Define params
      let param = {
        "type": this.inputs.type,
        "status": this.inputs.status,
        "time": this.inputs.time,
        "limit": this.pageLimit,
        "offset": this.offset
      }

      // Search
      adminAPI.searchOrderHistory(param).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          // Load orders created
          let orders = res.data.data.orders

           // Update items
          if(this.loadByScroll) {
            let temp = this.items
            var newArray = temp.concat(orders)
            this.items = newArray
          } else {
            this.items = orders
          }
          this.loadByScroll = false

          // Check has next
          let totalRecord = res.data.data.total_row
          this.total = totalRecord
          if(this.offset + this.pageLimit >= totalRecord) {
            this.hasNext = false
          }
        } else{
            this.items = []
        }
        this.onSearch = false
        this.loading = false
      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)

        this.onSearch = false
        this.loading = false
      })
    },

    /**
     * Back to list
     */
    back() {
      // Go to list
      this.$router.push('/home-admin')
    }

  }
}
</script>
