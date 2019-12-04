<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Store</h4>
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
                  v-model="store.name"
                  maxlength="100">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                    Vui lòng nhập tên
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Tỉnh/ Thành Phố </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select 
                  :options="optionsCity"
                  id="city_id"
                  type="text" 
                  class="form-control"
                  v-model="store.city_id"
                  v-on:change="changeCity($event.target)"></b-form-select>
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorCiti">
                    Vui lòng nhập tỉnh/thành phố
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Quận </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                    v-bind="{ disabled: store.city_id=='' }"
                    :options="optionsDistrict"
                    id="district"
                    type="text" 
                    class="form-control"
                    v-model="store.district_id"
                    ></b-form-select>
                  <b-form-invalid-feedback class="invalid-feedback" :state="!errorDistrict">
                    Vui lòng nhập quận
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Địa Chỉ </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="address"
                  type="text"
                  class="form-control"
                  v-model="store.address">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorAddress">
                    Vui lòng nhập địa chỉ
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Hết Hạn Sau </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="6">
                  <input
                  id="expriedDate"
                  type="text"
                  class="form-control"
                  v-model="store.expired_at"
                  @keypress="validateCode">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorMonth">
                    Vui lòng nhập tháng
                  </b-form-invalid-feedback>
                </b-col>
                <b-col md="3"> <label class="mt-1">Tháng</label></b-col>
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
import superAdminAPI from '@/api/superAdmin'
import Mapper from '@/mapper/store'
import commonFunc from '@/common/commonFunc'
import MasterApi from '@/api/master'
import MasterMapper from '@/mapper/master'
export default {
  data () {
    return {
      optionsCity: [],
      optionsDistrict: [],
      store: {
        "name": '',
        "address": '',
        "city_id": '',
        "district_id": '',
        "expired_at": ''
      },
      click: false,
    }
  },
  mounted() {
    this.getStoreDetail()
    this.getOptionCity()
  },
  computed: {
    errorName: function () {
      return this.checkInfo(this.store.name)
    },
    errorCiti: function () {
      return this.checkInfo(this.store.city_id)
    },
    errorDistrict: function () {
      return this.checkInfo(this.store.district_id)
    },
    errorAddress: function () {
      return this.checkInfo(this.store.address)
    },
    errorMonth: function () {
      return this.checkInfo(this.store.expired_at)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorCiti || this.errorDistrict || this.errorAddress || this.errorMonth)
    },
    getStoreDetail() {
      let storeId = this.$route.params.id
      if(storeId){
        superAdminAPI.getStoreDetail(storeId).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            this.store = Mapper.mapStoreDetailModelToDto(res.data.data)
            this.store.expired_at = commonFunc.calculateMonth(this.store.expired_at)
            this.getOptionCity()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    save () {
      this.click = true
      let result = this.checkValidate()
      if(result) { 
        let storeId = this.$route.params.id
        if(storeId){
          // Edit
          let store = this.store
          store.id = storeId
          superAdminAPI.editStore(store).then(res => {
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Cập nhật thành công", {
                  title: "Cập Nhật Cửa Hàng",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/store/list")
                })
              }
            }
          }).catch(err => {
            console.log(err)
            // Show notify edit fail: TODO
            let message = ""
            if(err.response.data.status == 422) {
              message = err.response.data.mess
            } else {
              message = "Lỗi hệ thống"
            }
            this.$bvModal.msgBoxOk(message, {
              title: "Cập Nhật Cửa Hàng",
              centered: true, 
              size: 'sm',
              headerClass: 'bg-danger',
            })
          })
        } else {
          // Add
          superAdminAPI.addStore(this.store).then(res => {
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Thêm thành công", {
                  title: "Thêm Cửa Hàng",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/store/list")
                })
              }
            }
          }).catch(err => {
            console.log(err)
            let message = ""
              if(err.response.data.status == 422) {
                message = err.response.data.mess
              } else {
                message = "Lỗi hệ thống"
              }
              this.$bvModal.msgBoxOk(message, {
                title: "Thêm Cửa Hàng",
                centered: true, 
                size: 'sm',
                headerClass: 'bg-danger',
              })
          })
        }
      }    
    },
    validateCode (event) {
      // not number
      if(!commonFunc.isNumber(event)) {
        event.preventDefault()
      }
    },
    /**
     * Get city options
     */
    getOptionCity() {
      MasterApi.getCityOptions().then(res => {
        this.optionsCity = MasterMapper.mapCityModelToDto(res.data.data)
        this.changeCity()
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * Get district by city
     */
    changeCity() {
      let cityId = this.store.city_id
      // console.log(cityId)
      if(cityId != "" && cityId != undefined) {
        MasterApi.getDistrictOptions(cityId).then(res => {
          // console.log(res.data.data)
          this.optionsDistrict = MasterMapper.mapCityModelToDto(res.data.data)
        })
      } else {
        this.store.district_id = ""
      }
    }
  }
}
</script>
