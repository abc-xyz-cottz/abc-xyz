<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md="2">
              <label> Chọn bàn: </label>
            </b-col>
            <b-col md="4">
              <b-form-select
                  :options="tables"
                  id="tableList"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="tableId"
                  v-on:change="getSelectedItem"
                  >
              </b-form-select>
            </b-col>
            <b-col md="3">
              <b-button variant="primary" class="px-4" :disabled="!tableId">
                In
              </b-button>
            </b-col>
            <b-col md="3">
              <b-button variant="primary" class="px-4" :disabled="!tableId">
                Xuất file pdf
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-show="tableId">
      <b-col>
        <b-card>
          <b-card-body class="p-4">
              <b-row>
                <b-col md="10" class="text-right"><p>Bàn: </p></b-col>
                <b-col md="2" class="text-left"><h4><b>{{tableName}}</b></h4></b-col>
              </b-row>
            <b-row>

              <b-col md="6" class="text-right">
                LOGO:
              </b-col>
              <b-col md="6" class="text-left">
                <h2> CusRes</h2>
                <h5>Ứng dụng đặt món tại bàn trực tuyến</h5>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col class="text-center">
                <h4 >
                  Chào mừng tới cửa hàng {{storeName}}
                </h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-center">
                <br/>
                <qrcode v-if="qr_code" :value="qr_code" :options="{ width: 200 }"/>
                <br/>
              </b-col>
            </b-row>
            <b-row>
              <p>Hướng dẫn sử dụng:</p>
            </b-row>
            <b-row>
              <p>1. Truy cập website cusres.vn</p>
            </b-row>
            <b-row>
              <p>2. Nhấn vào nút "Quét QR code"</p>
            </b-row>
            <b-row>
              <p>3. Quét QR code phía trên</p>
            </b-row>
            <b-row>
              <p>4. Chọn món hoặc gửi yêu cầu tới nhân viên trong màn hình hiện ra</p>
            </b-row>
            <b-row>
              <p>5. Chờ xác nhận từ bếp</p>
            </b-row>
            <hr/>
            <b-row>
              <br/>
              <p>* Đăng nhập tài khoản để tích điểm trong mỗi lần order, điểm này có thể mua nhiều
                khuyến mãi từ nhà hàng</p>
            </b-row>

          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import Vue from 'vue'
Vue.component(VueQrcode.name, VueQrcode)

import adminAPI from '@/api/admin'
import Mapper from '@/mapper/table'
import { RootAPI } from '@/api/index'
import {Constant} from '@/common/constant'
import Cookies from 'js-cookie'

export default {

  data () {
    return {
      tableId: null,
      tableName: "",
      storeName: "Abc xyz",
      tables: [
        {value: '1', text: 'q1'},
        {value: '1', text: 'q2'}
      ],
      qr_code: "hello word"
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    /**
     * Load list option table
     */
    getTableList () {
      adminAPI.getTableList().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.tables = Mapper.mapTableModelToOption(res.data.data)
        }
      })
    },

    /**
     * Get selected table
     */
    getSelectedItem() {
      this.tableName = document.getElementById("tableList").selectedOptions[0].text
      let user = JSON.parse(Cookies.get(Constant.APP_USR))
      if(user) {
        let url = window.location.host + "/store/" + user.storeId + "/table/" + this.tableId
        this.qr_code = url
      }
    }
  }
}
</script>
