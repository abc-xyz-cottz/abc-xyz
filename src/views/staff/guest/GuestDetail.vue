<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3> {{ $t("guestDetail.titlePage") }} </h3>
            </b-col>
            <b-col class="col-6">
            </b-col>
          </b-row>
          <hr>
          <b-row class="d-md-flex d-none">
            <b-col class="col-md-5 float-left">
              <b-col class="d-inline-block">
                <p class="float-left">
                  {{ $t("guestDetail.label.name") }} {{ customer.fullName }}
                  <br> 
                  {{ $t("guestDetail.label.level") }} {{ customer.level }}
                </p>
                <i class="fa fa-user fa-3x pull-right" />
              </b-col>
              <b-col class="d-inline-block">
                <p class="float-left">
                  {{ $t("guestDetail.label.code") }} {{ customer.code }}
                  <br> 
                  {{ $t("guestDetail.label.date") }} {{ customer.date }}
                </p>
                <qrcode-vue :value="value" :size="size" level="H" class="pull-right"></qrcode-vue>
              </b-col>
            </b-col>
            <b-col class="col-md-6 float-left">
              <b-col class="d-inline-block">
                <p>{{ $t("guestDetail.label.availablePoint") }} {{ customer.availablePoint }}</p>
                <p>{{ $t("guestDetail.label.totalPoint") }} {{ customer.totalPoint }}</p>
                <p>{{ $t("guestDetail.label.expiredPoint") }} {{ customer.expiredPoint }}</p>
                <p>{{ $t("guestDetail.label.expiredDate") }} {{ customer.expiredDate }}</p>
                <b-button variant="primary" class="px-4 mt-3">
                  {{ $t("buttons.btnPayment") }}
                </b-button>
              </b-col>
            </b-col>
          </b-row>
          <b-row class="d-md-none d-sm-block">
            <b-col class="d-inline-block">
              <div class="float-left mr-5 col-1">
                <i class="fa fa-user fa-3x" />
                <qrcode-vue :value="value" :size="size" level="H" class="mt-3"></qrcode-vue>
              </div>
              <div class="float-left">
                <p>{{ $t("guestDetail.label.name") }}</p>
                <p>{{ $t("guestDetail.label.level") }}</p>
                <p>{{ $t("guestDetail.label.code") }}</p>
                <p>{{ $t("guestDetail.label.availablePoint") }}</p>
                <p>{{ $t("guestDetail.label.totalPoint") }}</p>
                <p>{{ $t("guestDetail.label.expiredPoint") }}</p>
                <p>{{ $t("guestDetail.label.date") }}</p>
              </div>
              <b-button variant="primary" class="px-4 mt-3">
                {{ $t("buttons.btnPayment") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-tabs pills card>
          <b-tab :title="$t('guestDetail.tabs.paymentHis.title')" :active="isTab == 'pay-his' ? true : false">
            <b-card-text>
              <b-table 
                hover bordered 
                stacked="md"
                :fields="paymentFields" 
                :items="paymentItems" 
                :per-page="perPage" 
                :current-page="currentPage">
              </b-table>
              <b-pagination 
                v-model="currentPage" 
                :total-rows="rows" 
                :per-page="perPage" 
                aria-controls="my-table" 
                size="sm">
              </b-pagination>
            </b-card-text>
          </b-tab>
          <b-tab :title="$t('guestDetail.tabs.availablePromo')"  :active="isTab == 'promotion' ? true : false">
            <b-card-text>
              <b-table 
                hover bordered 
                stacked="md"
                :fields="availablePromotionFields" 
                :items="availablePromotionItems" 
                :per-page="0" 
                :current-page="currentPageAvailablePromotion">
                <template v-slot:cell(detail)="row">
                  <span @click="info(row.item)" class="pointer" title="click to show detail more">
                    {{ row.value }}
                  </span>
                </template>
              </b-table>
              <b-pagination 
                v-model="currentPageAvailablePromotion" 
                :total-rows="rowsAvailablePromotion" 
                :per-page="perPage" 
                aria-controls="my-table" 
                size="sm"
                @change="changePageOwnedPromotion">
              </b-pagination>
            </b-card-text>
          </b-tab>
          <b-tab :title="$t('guestDetail.tabs.usedPromo')">
            <b-card-text>
              <b-table 
                hover 
                bordered 
                stacked="md"
                :fields="usedPromotionFields" 
                :items="usedPromotionItems" 
                :per-page="perPage" 
                :current-page="currentPageUsedPromotion">
                <template v-slot:cell(detail)="row">
                  <span @click="info(row.item)" class="pointer" title="click to show detail more">
                    {{ row.value }}
                  </span>
                </template>
              </b-table>
              <b-pagination 
                v-model="currentPageUsedPromotion" 
                :total-rows="rowsUsedPromotion" 
                :per-page="perPage" 
                aria-controls="my-table" 
                size="sm"
                @change="changePageUsedPromotion">
              </b-pagination>
            </b-card-text>
          </b-tab>
          <b-tab :title="$t('guestDetail.tabs.expiredPromo')"  :active="isTab == 'payment' ? true : false">
            <b-card-text>
              <b-table 
                hover 
                bordered 
                stacked="md"
                :fields="expiredPromotionFields" 
                :items="expiredPromotionItems" 
                :per-page="perPage" 
                :current-page="currentPageExpiredPromotion">
                <template v-slot:cell(detail)="row">
                  <span @click="info(row.item)" class="pointer" title="click to show detail more">
                    {{ row.value }}
                  </span>
                </template>
              </b-table>
              <b-pagination 
                v-model="currentPageExpiredPromotion" 
                :total-rows="rowsExpiredPromotion" 
                :per-page="perPage" 
                aria-controls="my-table" 
                size="sm"
                @change="changePageExpiredPromotion">
              </b-pagination>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre v-html="infoModal.content"></pre>
    </b-modal>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import CustomerAPI from '@/api/customer'
import Mapper from '@/common/mapper'
export default {
  name: 'GuestDetail',
  data: function() {
    return {
      fullName: '',
      level: 'Gold',
      memberId: '0000001',
      startDate: '20190903',
      value: 'https://example.com',
      size: 40,
      customer: {},
      promoOwned: {},
      promoUsed: {},
      promoExpired: {},
      perPage: 10,
      currentPage: 1,
      currentPageAvailablePromotion: 1,
      currentPageUsedPromotion: 1,
      currentPageExpiredPromotion: 1,
      rows: 1,
      rowsAvailablePromotion: 1,
      rowsUsedPromotion: 1,
      rowsExpiredPromotion: 1,
      isTab: '',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      //
      paymentFields: [{
        key: 'name',
        label: this.$t('guestDetail.tabs.paymentHis.table.name')
      },
      {
        key: 'info',
        label: this.$t('guestDetail.tabs.paymentHis.table.info')
      },
      {
        key: 'date',
        label: this.$t('guestDetail.tabs.paymentHis.table.date')
      },
      {
        key: 'total',
        label: this.$t('guestDetail.tabs.paymentHis.table.total')
      }
      ],
      paymentItems: [
        {
          name: 'FB001',
          info: 'Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor.',
          date: '20190903',
          total: '100'
        },
        {
          name: 'FB002',
          info: 'Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor.',
          date: '20190903',
          total: '100'
        },
        {
          name: 'FB003',
          info: 'Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor.',
          date: '20190903',
          total: '100'
        },
        {
          name: 'FB004',
          info: 'Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor.',
          date: '20190903',
          total: '100'
        }
      ],
      //table available promotion
      availablePromotionFields: [{
          key: 'code',
          label: this.$t('guestDetail.tabs.tablePromo.code')
        },
        {
          key: 'detail',
          label: this.$t('guestDetail.tabs.tablePromo.detail')
        },
        {
          key: 'type',
          label: this.$t('guestDetail.tabs.tablePromo.type')
        },
        {
          key: 'expiredDate',
          label: this.$t('guestDetail.tabs.tablePromo.date')
        }
      ],
      availablePromotionItems: [{}],
      //table used promotion
      usedPromotionFields: [{
          key: 'code',
          label: this.$t('guestDetail.tabs.tablePromo.code')
        },
        {
          key: 'detail',
          label: this.$t('guestDetail.tabs.tablePromo.detail')
        },
        {
          key: 'type',
          label: this.$t('guestDetail.tabs.tablePromo.type')
        },
        {
          key: 'expiredDate',
          label: this.$t('guestDetail.tabs.tablePromo.date')
        }
        ],
        usedPromotionItems: [{}],
      //table expired promotion
      expiredPromotionFields: [{
          key: 'code',
          label: this.$t('guestDetail.tabs.tablePromo.code')
        },
        {
          key: 'detail',
          label: this.$t('guestDetail.tabs.tablePromo.detail')
        },
        {
          key: 'type',
          label: this.$t('guestDetail.tabs.tablePromo.type')
        },
        {
          key: 'expiredDate',
          label: this.$t('guestDetail.tabs.tablePromo.date')
        }
      ],
      expiredPromotionItems: [{}]
    }
  },
  components: {
    QrcodeVue
  },
  mounted () {
    this.getCustomerInfo ()
    this.getOwnedPromotionList()
    this.getUsedPromotionList()
    this.getExpiredPromotionList()
  },
  computed: {
    
  },
  methods: {
    info(item) {
      this.infoModal.title = 'Voucher Detail'
      this.infoModal.content = item.name + '</br>' + 
                                'voucher code:' + item.code + '</br>' +
                                "<b-img src='" + item.img + "'></b-img>" + 
                                "Expire Date: " + item.expireDate
      this.$root.$emit('bv::show::modal', this.infoModal.id)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    // frontEndDateFormat: function(date) {
    //   return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    // },
    getCustomerInfo () {
      // get customer Id from url param
      let cusId = this.$route.params.Cid
      this.isTab = this.$route.params.tab
      CustomerAPI.getCustomerInfo(cusId).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          this.customer = Mapper.mapCusDetailModelToDto(res.data.data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getOwnedPromotionList () {
      let limit = 10
      let offset = 0
      if(this.currentPage != 1) {
        offset= this.currentPage*limit - limit
      }
      let params = this.$route.params.Cid + '/promo/?status=owned&limit=' + limit + '&offset=' + offset
      CustomerAPI.getPromotionList(params).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          // Availble Promotions
          this.promoOwned = Mapper.mapPromoOwnedModelToDto(res.data.data.promotion)
          this.availablePromotionItems = this.promoOwned
          this.rows = res.data.data.total_row
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getUsedPromotionList () {
      let limit = 10
      let offset = 0
      if(this.currentPage != 1) {
        offset= this.currentPage*limit - limit
      }
      let params = this.$route.params.Cid + '/promo/?status=used&limit=' + limit + '&offset=' + offset
      CustomerAPI.getPromotionList(params).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          // Used Promotion
          this.promoUsed = Mapper.mapPromoOwnedModelToDto(res.data.data.promotion)
          this.usedPromotionItems = this.promoUsed
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getExpiredPromotionList () {
      let limit = 10
      let offset = 0
      if(this.currentPage != 1) {
        offset= this.currentPage*limit - limit
      }
      let params = this.$route.params.Cid + '/promo/?status=expired&limit=' + limit + '&offset=' + offset
      CustomerAPI.getPromotionList(params).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          // Expired Promotions
          this.promoExpired = Mapper.mapPromoOwnedModelToDto(res.data.data.promotion)
          this.expiredPromotionItems = this.promoExpired
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changePageOwnedPromotion (currentPageAvailablePromotion) {
      this.currentPageAvailablePromotion = currentPageAvailablePromotion
      let limit = 10
      let offset = 0
      if(this.currentPageAvailablePromotion != 1) {
        offset= this.currentPageAvailablePromotion*limit - limit
      }
      let params = this.$route.params.Cid + '/promo/?status=owned&limit=' + limit + '&offset=' + offset
      CustomerAPI.getPromotionList(params).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          // Availble Promotions
          this.promoOwned = Mapper.mapPromoOwnedModelToDto(res.data.data.promotion)
          this.availablePromotionItems = this.promoOwned
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changePageUsedPromotion (currentPageUsedPromotion) {
      this.currentPageUsedPromotion = currentPageUsedPromotion
      let limit = 10
      let offset = 0
      if(this.currentPageUsedPromotion != 1) {
        offset= this.currentPageUsedPromotion*limit - limit
      }
      let params = this.$route.params.Cid + '/promo/?status=used&limit=' + limit + '&offset=' + offset
      CustomerAPI.getPromotionList(params).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          // Used Promotion
          this.promoUsed = Mapper.mapPromoOwnedModelToDto(res.data.data.promotion)
          this.usedPromotionItems = this.promoUsed
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changePageExpiredPromotion (currentPageExpiredPromotion) {
      this.currentPageExpiredPromotion = currentPageExpiredPromotion
      let limit = 10
      let offset = 0
      if(this.currentPageExpiredPromotion != 1) {
        offset= this.currentPageExpiredPromotion*limit - limit
      }
      let params = this.$route.params.Cid + '/promo/?status=expired&limit=' + limit + '&offset=' + offset
      CustomerAPI.getPromotionList(params).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          // Expired Promotions
          this.promoExpired = Mapper.mapPromoOwnedModelToDto(res.data.data.promotion)
          this.expiredPromotionItems = this.promoExpired
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>