<template>
  <div class="container homepage">
    <b-card-group>
      <b-card no-body>
        <b-card-body>
          <b-row>
            <b-col md="12">
              <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="1024"
                img-height="480"
              >
                <b-carousel-slide
                  img-src="../../static/img/quang-cao/1.png"
                ></b-carousel-slide>
                <b-carousel-slide
                  img-src="../../static/img/quang-cao/2.png"
                ></b-carousel-slide>
                <b-carousel-slide
                  img-src="../../static/img/quang-cao/3.png"
                ></b-carousel-slide>
                <b-carousel-slide
                  img-src="../../static/img/quang-cao/4.png"
                ></b-carousel-slide>
                <b-carousel-slide
                  img-src="../../static/img/quang-cao/5.png"
                ></b-carousel-slide>
              </b-carousel>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-card-group>

      <b-card-group>
      <b-card no-body>
        <b-card-body>

          <b-row>
            <b-col md="12" class="text-center">
              <b-button
                class="mt-2"
                @click="showPopupQRCode()">
                Quét QR code
              </b-button>
              <p class="">(Bạn có thể gọi món hoặc gửi yêu cầu tới nhân viên nhà hàng thông qua quét QR code)
              </p>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-card-group>

    <b-card-group>
      <b-card no-body>
        <b-card-body>
          <h5 class="boder-bottom">Tìm khuyến mãi</h5>
          <b-form>
            <b-row>
              <b-col md="6">
                <b-form-group label-cols="4" label="Tỉnh/ Thành Phố" class="mb-2">
                  <b-form-select 
                    id="city"
                    :options="optionsCity"
                    v-model="inputs.cityId"
                    type="text"
                    autocomplete="new-password"
                    class="form-control"
                  @change="getStoreByCity"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label-cols="4" label="Nhà Hàng" class="mb-2">
                  <b-form-select 
                    id="restaurant"
                    :options="optionsStore"
                    v-model="inputs.storeId"
                    :disabled="!inputs.cityId"
                    type="text"
                    autocomplete="new-password"
                    class="form-control"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button
                  variant="primary"
                  class="px-4 pull-right"
                  @click="prepareToSearch"
                  :disabled="onSearch">
                  Tìm Kiếm
                </b-button>
              </b-col>
            </b-row>
          </b-form>

          <b-row>
            <b-col>
              <b-table
                hover
                bordered
                stacked="md"
                :fields="fields"
                :items="items"
                class="mt-3">
                <template v-slot:cell(actions)="dataId">
                  <b-list-group horizontal>
                      <b-button
                        v-show="dataId.item.quantity > 0"
                        variant="primary"
                        class="px-4 pull-right"
                        @click="buyPmt(dataId.item.id, dataId.item.name, dataId.item.storeName, dataId.item.price, dataId.item.expiredAt)">
                        Mua
                      </b-button>
                  </b-list-group>
                </template>
                </b-table>
            </b-col>
          </b-row>

            <!-- Loading -->
            <span class="loading-more" v-show="loading"><icon name="loading" width="60" /></span>
            <span class="loading-more" v-if="hasNext === false">Hết</span>

        </b-card-body>
      </b-card>
    </b-card-group>

    <!-- Modal Scan QR code -->
    <b-modal hide-header-close no-close-on-backdrop centered hide-footer
    id="modal-scan"
    >
    <qrcode-stream @decode="onDecode" class="showQRCode"/>
    <b-button class="mt-3" variant="primary" block @click="hidePopupQRCode">Close</b-button>
    </b-modal>

    <!-- Modal login require -->
    <b-modal title="Yêu cầu đăng nhập" centered hide-footer
    id="modal-login-require">
      <b-row>
        <b-col>
          <p>Bạn chưa đăng nhập, hãy đăng nhập để mua khuyến mãi</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4" class="text-left mt-3">
          <button class="btn btn-danger px-4" @click="cancelLogin()">
            Hủy
          </button>
        </b-col>
        <b-col cols="8" class="text-right mt-3">
          <button class="btn btn-primary px-4" @click="confirmLogin()">
            Đăng nhập
          </button>
        </b-col>
      </b-row>
    </b-modal>

    <!-- Modal confirm buy pmt -->
    <b-modal title="Xác nhận mua" centered hide-footer
    id="modal-confirm-buy">
      <b-row>
        <b-col>
          <p>Tên: {{buyName}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Cửa hàng: {{buyStore}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Giá: {{buyPrice}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Ngày hết hạn: {{buyExpired}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4" class="text-left mt-3">
          <button class="btn btn-danger px-4" @click="cancelBuy()">
            Hủy
          </button>
        </b-col>
        <b-col cols="8" class="text-right mt-3">
          <button class="btn btn-primary px-4" @click="confirmBuy()">
            Mua
          </button>
        </b-col>
      </b-row>
    </b-modal>

  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import Cookies from 'js-cookie'
import {Constant} from '@/common/constant'
import MasterApi from '@/api/master'
import MasterMapper from '@/mapper/master'
import CusApi from '@/api/customer'
import StoreMapper from '@/mapper/store'
import PmtMapper from '@/mapper/promotion'


export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      onLogin: false,
      selected: '',
      onShowQRCode: false,
      perPage: '10',
      currentPage: '1',
      fields: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'name',
          label: 'Khuyến mãi'
        },
        {
          key: 'storeName',
          label: 'Cửa hàng'
        },
        {
          key: 'cityName',
          label: 'Tỉnh/Thành Phố'
        },
        {
          key: 'districtName',
          label: 'Quận/Huyện'
        },
        {
          key: 'price',
          label: 'Giá (điểm)'
        },
        {
          key: 'quantity',
          label: 'Số lượng còn lại'
        },
        {
          key: 'expiredAt',
          label: 'Hết hạn vào'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [],
      optionsCity: [],
      optionsStore: [],
      inputs: {
        cityId: null,
        storeId: null
      },
      pageLimit: Constant.PAGE_LIMIT,
      offset: 0,
      hasNext: true,
      onSearch: false,
      loadByScroll: false,
      loading: false,
      buyId: "",
      buyName: "",
      buyStore: "",
      buyPrice: "",
      buyExpired: ""
    }
  },
  mounted () {
    this.getOptionCity()

    // Choose city by account
    this.selectCity()

    // Load store by city
    this.getStoreByCity()

    window.addEventListener('scroll', this.onScroll)

    window.addEventListener('resize', this.delete)

    // Load list when load page
    this.search()

  },
    computed: {
      rows() {
        return this.items.length
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },

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
       * Decode QR code
       */
      onDecode (result) {
        this.onShowQRCode = false
        let url = result.replace(window.location.host, "")
        this.$router.push(url)
      },

      /**
       * Event click btn show QR code
       */
      showPopupQRCode () {
        this.onShowQRCode = true
        this.$bvModal.show('modal-scan')
      },

      /**
       * Hide popup scan QR code
       */
      hidePopupQRCode () {
        this.onShowQRCode = false
        this.$bvModal.hide('modal-scan')
      },

      /**
     * Get city options
     */
      getOptionCity() {
        MasterApi.getCityOptions().then(res => {
          this.optionsCity = MasterMapper.mapCityModelToDto(res.data.data)
        })
      },

      /**
       * Select city by account
       */
      selectCity() {
        // Get customer info
        let customer = Cookies.get(Constant.APP_USR)
        if(customer) {
          let cusTemp = JSON.parse(customer)
          this.inputs.cityId = cusTemp.cityId
        } else {
          this.inputs.cityId = ""
        }
      },

      /**
       * Get store list by city
       */
      getStoreByCity() {
        if(this.inputs.cityId) {
          CusApi.getStoreByCity(this.inputs.cityId).then(res => {
            this.optionsStore = StoreMapper.mapStoreModelListToDto(res.data.data)
          })
        }
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
        "city_id": this.inputs.cityId,
        "store_id": this.inputs.storeId,
        "limit": this.pageLimit,
        "offset": this.offset
      }

      // Search
      CusApi.searchPmt(param).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          this.onSearch = true
          let it = PmtMapper.mapPromoSearchModelToDto(res.data.data.pmts, this.offset)

           // Update items
          if(this.loadByScroll) {
            let temp = this.items
            var newArray = temp.concat(it)
            this.items = newArray
          } else {
            this.items = it
          }
          this.loadByScroll = false

          // Check has next
          if(this.offset + this.pageLimit >= res.data.data.total_row) {
            this.hasNext = false
          }
        }else{
            this.items = []
        }
        this.onSearch = false
        this.loading = false
      }).catch(err => {
        this.onSearch = false
        this.loading = false
      })
    },

      /**
       * Buy pmt
       */
      buyPmt(pmtId,name,storeName,price,expiredAt) {
        // Check login
        let customer = Cookies.get(Constant.APP_USR)
        if(customer) {

          // Show confirm popup
          this.buyId = pmtId
          this.buyName = name
          this.buyStore = storeName
          this.buyPrice = price
          this.buyExpired = expiredAt

          this.$bvModal.show('modal-confirm-buy')
        } else {
          // Show popup, login require
          this.$bvModal.show('modal-login-require')
        }
      },


      /**
     * Cancel login
     */
    cancelLogin() {
      this.$bvModal.hide('modal-login-require')
    },

    /**
     * Confirm login
     */
    confirmLogin() {
      this.$router.push("/login")
    },

     /**
     * Cancel buy
     */
    cancelBuy() {
      this.$bvModal.hide('modal-confirm-buy')
    },

    /**
     * Confirm login
     */
    confirmBuy() {
      this.$bvModal.hide('modal-confirm-buy')
      CusApi.buyPmt(this.buyId).then(res => {
        if(res != null && res.data != null){
          this.popToast('success', 'Mua khuyến mãi thành công!!!')
          this.prepareToSearch()
        } else {
          this.popToast('danger', 'Lỗi hệ thống, bạn thử lại sau nhé')
        }
      }).catch(err => {
        let message = ""
        if(err.response.data.status == 500) {
          message = "Lỗi hệ thống, chúng tôi rất tiếc về sự cố này, bạn thử lại sau vài phút nhé"
        } else {
          message = err.response.data.mess
        }
        this.makeToast('danger', 'Mua khuyến mãi thất bại!!!', message)
      })
    },

    }
  }
</script>
<style lang="scss">
  .homepage {
    .carousel img {
      /*height: unset;*/
    }
  }

</style>
