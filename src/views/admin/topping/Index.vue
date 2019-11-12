<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Topping</h4>
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
                  class="form-control">
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
                  class="form-control">
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Trạng Thái </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="options"      
                  id="status"
                  type="text"
                  class="form-control"></b-form-select>
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
export default {
  data () {
    return {
      options: [
        {value: 'false', text: 'Đóng'},
        {value: 'true', text: 'Mở'}
      ]
    }
  },
  methods: {
    save () {
      
    }
  }
}
</script>
