<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Menu</h4>
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
                  v-model="menu.name">
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
                  v-model="menu.price">
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Trạng thái </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="options"      
                  id="status"
                  type="text"
                  class="form-control"
                  v-model="menu.status"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Hình ảnh </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-file
                  id="status"
                  type="text"
                  class="form-control"
                  v-model="menu.image"></b-form-file>
                </b-col>
              </b-row>
              <b-row class="text-center mt-3">
                <b-col>
                  <b-button variant="primary" class="px-4">
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
import Mapper from '@/mapper/menu'


export default {
  data () {
    return {
      options: [
        {value: 'true', text: 'Mở'},
        {value: 'false', text: 'Đóng'}
      ],
      menu: {
        "name": null,
        "price": null,
        "status": null,
        "image": null
      }
    }
  },
  mounted() {
    this.getMenuDetail()
  },
  methods: {
    /**
     * Get menu detail
     */
    getMenuDetail() {
      let menuId = this.$route.params.id
      if(menuId){
        adminAPI.getMenuDetail(menuId).then(res => {
          this.menu = Mapper.mapMenuDetailModelToDto(res.data.data)
        }).catch(err => {
          console.log(err)
        })
      }
    },

    /**
     * Save
     */
    save() {}
  }
}
</script>
