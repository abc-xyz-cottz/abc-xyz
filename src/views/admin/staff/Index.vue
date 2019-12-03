<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Staff</h4>
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
                  v-model="staff.name">
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
                  v-model="staff.phone_number"
                  @keypress="validateCode">
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
                  <b-form-select
                  :options="options"
                  id="permission"
                  type="text"
                  class="form-control"
                  v-model="staff.role_id"></b-form-select>
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorRole">
                    Vui lòng nhập quyền
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Mật Khẩu </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="password"
                  type="text"
                  class="form-control"
                  v-model="staff.password">
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
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/staff'
import commonFunc from '@/common/commonFunc'
export default {
  data () {
    return {
      options: [
        {value: '1', text: 'Admin'},
        {value: '2', text: 'Staff'}
      ],
      staff: {
        "name": null,
        "phone_number": null,
        "role_id": null,
        "password": null
      },
      click: false,
    }
  },
  mounted() {
    this.getStaffDetail()
  },
  computed: {
    errorName: function () {
      return this.checkInfo(this.staff.name)
    },
    errorPhone: function () {
      return this.checkInfo(this.staff.phone_number)
    },
    errorRole: function () {
      return this.checkInfo(this.staff.role_id)
    },
    errorPassword: function () {
      return this.checkInfo(this.staff.password)
    }
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorPhone || this.errorRole || this.errorPassword)
    },
    getStaffDetail() {
      let staffId = this.$route.params.id
      if(staffId){
        adminAPI.getStaffDetail(staffId).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            this.staff = Mapper.mapStaffDetailModelToDto(res.data.data)
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
        let staffId = this.$route.params.id
        let staff = this.staff
        staff.id = staffId
        if(staffId){
          // Edit
          this.staff = 
          adminAPI.editStaff(staff).then(res => {
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Cập nhật thành công", {
                  title: "Cập Nhật Nhân Viên",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/staff/list")
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
              title: "Cập Nhật Nhân Viên",
              centered: true, 
              size: 'sm',
              headerClass: 'bg-danger',
            })
          })
        } else {
          // Add
          adminAPI.addStaff(this.staff).then(res => {
            if(res != null && res.data != null){
              let message = ""
              if (res.data.status == 200) {
                // show popup success
                this.$bvModal.msgBoxOk("Thêm thành công", {
                  title: "Thêm Nhân Viên",
                  centered: true, 
                  size: 'sm',
                  headerClass: 'bg-success',
                }).then(res => {
                  this.$router.push("/staff/list")
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
                title: "Thêm Nhân Viên",
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
    }
  }
}
</script>
