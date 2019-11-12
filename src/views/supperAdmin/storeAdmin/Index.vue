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
                  class="form-control">
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
                  class="form-control">
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Quyền </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select :options="options"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Cửa Hàng </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select :options="optionsStore"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Mật Khẩu </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="pasword"
                  type="text"
                  class="form-control">
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
            {value: 'a', text: 'Staff'},
            {value: 'b', text: 'Admin'}
        ],
        optionsStore: [
            {value: 'a', text: 'Store1'},
            {value: 'b', text: 'Store2'}
        ]
    }
  },
  methods: {
    save () {
      
    }
  }
}
</script>
