<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
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
                  <label> Tỉnh/ Thành Phố </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="optionsCiti"
                  id="citi"
                  type="text"
                  class="form-control"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Quận </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="optionsDistrict"
                  id="district"
                  type="text"
                  class="form-control"></b-form-select>
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
                  class="form-control">
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
                  class="form-control">
                </b-col>
                <b-col md="3"> <label class="mt-1">Tháng</label></b-col>
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
      optionsCiti: [
        {value: '1', text: "HN"},
        {value: '2', text: "HCM"}
      ],
      optionsDistrict: [
        {value: '1', text: "Quận 1"},
        {value: '3', text: "Quận 3"}
      ]
    }
  },
  methods: {
    save () {

    }
  }
}
</script>