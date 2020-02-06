<template>
  <div class="container">
    <b-card no-body>
      <b-card-body>
        <h3 class="boder-bottom">Chi tiết khuyến mãi</h3>
          <b-row>
            <b-col>
              <label>Tên: {{ promotion.name }}</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <label>Cửa hàng: {{ promotion.storeName }}</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <label>Ngày mua: {{ promotion.createAt }}</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <label>Ngày hết hạn: {{ promotion.expiredAt }}</label>
            </b-col>
          </b-row>

        <b-row>
          <b-col>
            <qrcode-vue :value="qrValue" :size="size" level="H" class="mt-1"></qrcode-vue>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import customerAPI from '@/api/customer'
import Mapper from '@/mapper/promotion'
import commonFunc from '@/common/commonFunc'


export default {
  components: {
    QrcodeVue
  },
  data () {
    return {
      promotion: {
        "id":null,
        "name": "",
        "createAt":"",
        "expiredAt":"",
        "storeId":0,
        "storeName":""
      },
      size: 100,
      qrValue: ""
    }
  },
  mounted() {
    this.getPromoDetail()
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
        autoHideDelay: 3000
      })
    },

    /**
     * Get promotion detail
     */
    getPromoDetail() {
      let id = this.$route.params.id
      customerAPI.getPromotionDetail(id).then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.promotion = Mapper.mapPromoCusDetailModelToDto(res.data.data)

          this.qrValue = this.promotion.id + "-" + this.promotion.storeId
        }
      }).catch(err => {
        // Handle error
          let errorMess = commonFunc.handleCusError(err)
          this.popToast('danger', errorMess)
      })
    }
  }

}
</script>
