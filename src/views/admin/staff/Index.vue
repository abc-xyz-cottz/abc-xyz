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
                  v-model="staff.phone_number">
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
      }
    }
  },
  mounted() {
    this.getStaffDetail()
  },
  methods: {
    /**
     * Get staff detail
     */
    getStaffDetail() {
      let staffId = this.$route.params.id
      if(staffId){
        adminAPI.getStaffDetail(staffId).then(res => {
          this.staff = Mapper.mapStaffDetailModelToDto(res.data.data)
        }).catch(err => {
          console.log(err)
        })
      }
    },


    save () {
      let staffId = this.$route.params.id
      if(staffId){
        // Edit
        adminAPI.editStaff(this.staff).then(res => {
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
        adminAPI.addStaff(this.staff).then(res => {
          if(res != null && res.data != null){
            // Go to list
            this.$router.push('/staff/list')
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
