<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Promotion</h4>
                </b-col>
              </b-row>
              <hr/>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Tên </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="name"
                  type="text"
                  class="form-control"
                  v-model="promo.name">
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Giá </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="price"
                  type="text"
                  class="form-control"
                  v-model="promo.cost">
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Hết Hạn Sau </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="6">
                  <input
                  id="expiredDate"
                  type="text"
                  class="form-control"
                  v-model="promo.expired_on">
                </b-col>
                <b-col md="3"><label class="mt-1">Ngày</label></b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Số Lượng </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="number"
                  type="text"
                  class="form-control"
                  v-model="promo.quantity">
                </b-col>
              </b-row>
              <b-row class="text-center mt-3">
              <b-col>
                <b-button variant="primary" class="px-4" @click="save">
                  Lưu
                </b-button>
              </b-col>
            </b-row>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/promotion'
import commonFunc from '@/common/commonFunc'
export default {
  data () {
    return {
      promo: {
        "name": null,
        "cost": null,
        "expired_on": null,
        "quantity": null
      }
    }
  },
  mounted() {
    this.getPromoDetail()
  },
  methods: {
    getPromoDetail() {
      let promoId = this.$route.params.id
      if(promoId){
        adminAPI.getPromoDetail(promoId).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            this.promo = Mapper.mapPromoDetailModelToDto(res.data.data)
            this.promo.expired_on = commonFunc.calculateDate(this.promo.expired_on)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    save () {
      let promoId = this.$route.params.id
      if(promoId){
        // Edit
        let promo = this.promo
        promo.id = promoId
        adminAPI.editPromo(promo).then(res => {
          if(res != null && res.data != null){
            // Show notify edit success: TODO
            alert("ok")
          }else{
            // Show notify edit fail: TODO
            alert("fail")
          }
        }).catch(err => {
          console.log(err)
          // Show notify edit fail: TODO
          alert("fail")
        })
      } else {
        // Add
        adminAPI.addPromo(this.promo).then(res => {
          if(res != null && res.data != null){
            // Go to list
            this.$router.push('/promo/list')
          }else{
            // Show notify add fail: TODO
            alert("add fail")
          }
        }).catch(err => {
          console.log(err)
          // Show notify add fail: TODO
          alert("add fail")
        })
      }
    }
  }
}
</script>
