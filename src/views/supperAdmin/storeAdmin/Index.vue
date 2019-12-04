<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Admin store</h4>
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
                  v-model="adminStore.name">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                    Vui lòng nhập tên
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Số Điện Thoại </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="phone"
                  type="text"
                  class="form-control"
                  v-model="adminStore.phone_number"
                  autocomplete="new-password">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPhone">
                    Vui lòng nhập số điện thoại
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Quyền </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select :options="options" v-model="adminStore.role_id"></b-form-select>
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorRole">
                    Vui lòng chọn quyền
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Cửa Hàng </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select :options="optionsStore" v-model="adminStore.store_id"></b-form-select>
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorStore">
                    Vui lòng chọn cửa hàng
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Mật Khẩu </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="pasword"
                  type="password"
                  class="form-control"
                  v-model="adminStore.password"
                  autocomplete="new-password">
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPassword">
                    Vui lòng nhập mật khẩu
                  </b-form-invalid-feedback>
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
import superAdminAPI from '@/api/superAdmin'
import Mapper from '@/mapper/staff'
import commonFunc from '@/common/commonFunc'
export default {
  data () {
    return {
      options: [
        {value: '1', text: 'Staff'},
        {value: '2', text: 'Admin'}
      ],
      optionsStore: [
        {value: '1', text: 'Store1'},
        {value: '2', text: 'Store2'},
        {value: '3', text: 'Store3'},
        {value: '4', text: 'Store4'},
        {value: '5', text: 'Store5'},
      ],
      adminStore: {
        name: '',
        phone_number: '',
        password: '',
        role_id: '',
        store_id: ''
      },
      click: false,
    }
  },
  mounted() {
    this.getAdminStoreDetail()
  },
  computed: {
    errorName: function () {
      return this.checkInfo(this.adminStore.name)
    },
    errorPhone: function () {
      return this.checkInfo(this.adminStore.phone_number)
    },
    errorRole: function () {
      return this.checkInfo(this.adminStore.role_id)
    },
    errorStore: function () {
      return this.checkInfo(this.adminStore.store_id)
    },
    errorPassword: function () {
      return this.checkInfo(this.adminStore.password)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorPhone || this.errorRole || this.errorStore || this.errorPassword)
    },
    getAdminStoreDetail() {
      let AdminStoreId = this.$route.params.id
      if(AdminStoreId){
        superAdminAPI.getAdminStoreDetail(AdminStoreId).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            this.adminStore = Mapper.mapAdminStoreDetailModelToDto(res.data.data)
            // this.store.expired_at = commonFunc.calculateMonth(this.store.expired_at)
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
        let adminStoreId = this.$route.params.id
        if(adminStoreId){
          // Edit
          let adminStore = this.adminStore
          adminStore.id = adminStoreId
          superAdminAPI.editAdminStore(adminStore).then(res => {
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Cập nhật thành công", {
                  title: "Cập Nhật Admin",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/admin-store/list")
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
              title: "Cập Nhật Admin",
              centered: true, 
              size: 'sm',
              headerClass: 'bg-danger',
            })
          })
        } else {
          // Add
          superAdminAPI.addAdminStore(this.adminStore).then(res => {
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Thêm thành công", {
                  title: "Thêm Admin",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/admin-store/list")
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
                title: "Thêm Admin",
                centered: true, 
                size: 'sm',
                headerClass: 'bg-danger',
              })
          })
        }
      }    
    }
  }
}
</script>
