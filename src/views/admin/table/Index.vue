<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Table</h4>
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
                  v-model="table.name">
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
import Mapper from '@/mapper/table'
export default {
  data () {
    return {
      table: {
        "name": null,
      }
    }
  },
  mounted() {
    this.getTableDetail()
  },
  methods: {
    getTableDetail() {
      let tableId = this.$route.params.id
      if(tableId){
        adminAPI.getTableDetail(tableId).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            console.log(res.data.data)
            this.table = Mapper.mapTableDetailModelToDto(res.data.data)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    save () {
      let tableId = this.$route.params.id
      if(tableId){
        // Edit
        let table = this.table
        table.id = tableId
        adminAPI.editTable(table).then(res => {
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
        adminAPI.addTable(this.table).then(res => {
          if(res != null && res.data != null){
            // Go to list
            this.$router.push('/table/list')
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
