<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body>
                <b-form @submit.prevent="logIn">
                  <h1 class="text-center">
                  Kích Hoạt Tài Khoản
                  </h1>
                  <div class="form-group">
                    <label>Code</label><span class="error-sybol"></span>
                    <input
                      id="code"
                      type="text"
                      class="form-control"
                      placeholder="Nhập số code">
                  </div>
                  <b-button variant="primary" class="pull-right"> Xác Nhận</b-button>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>