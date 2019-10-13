<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card
              no-body>
              <b-card-body>
                <b-form method="put" @submit.prevent="update">
                  <h1 class="text-center">
                    Đổi Mật Khẩu
                  </h1>
                  <div class="form-group">
                    <label>
                      Số Điện Thoại
                      <span class="start-require"></span>
                    </label>
                    <input id="phone"  
                      type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>
                      Mật Khẩu Mới
                      <span class="start-require"></span>
                    </label>
                    <input id="newPassword"
                      type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>
                      Nhắc lại mật khẩu mới
                      <span class="start-require"></span>
                    </label>
                    <input id="confirmPassword"
                      type="text" 
                      class="form-control">
                  </div>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <button class="btn btn-primary px-4">
                        Cập Nhật Mật Khẩu
                      </button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>