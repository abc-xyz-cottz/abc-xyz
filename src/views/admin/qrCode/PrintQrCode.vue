<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md="4">
              <label :style="{width: 100 + '%'}">Chọn bàn:</label>
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
            <b-col md="4">
              <label :style="{width: 100 + '%'}">Chọn kích thước(cm)</label>
              <div class="inline-center">
                <input
                  v-model="defaultWidthCm"
                  type="text"
                  autocomplete="new-password"
                  :style="{width: 50 + '%'}"
                  class="form-control inLine"
                >
                <b-button
                  :style="{width: 30 + '%'}"
                  class="inLine"
                  @click="changeWidth">
                  Đổi
                </b-button>
              </div>
            </b-col>
            <b-col md="4" class="mt-4 inline-center">
              <div :style="{width: 20 + '%'}">
                <b-button :disabled="!tableId" @click="print">
                  In
                </b-button>
              </div>
              <div :style="{width: 60 + '%'}">
                <b-button :disabled="!tableId" @click="createPDF">
                  Xuất file pdf
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-card>
      <b-card-body>
        <b-row v-show="tableId" id="printAble">
          <b-col>
            <b-card  :style="{width: defaultWidthPx + 'px', height: 800 + 'px'}">
              <b-card-body class="p-4">
                <b-row>
                  <b-col md="12" class="text-right mr-4">
                    <h5>Bàn: <b>{{tableName}}</b></h5>
                  </b-col>

                </b-row>
                <hr>
                <b-row>
                  <b-col class="text-center">
                    <h4 >
                      {{storeName}}
                    </h4>
                  </b-col>
                </b-row>
                <br/>
                <b-row>
                  <b-col class="text-center" id="qrCodePlace">
                    <qrcode id="qrCode" v-if="qr_code" :value="qr_code" :options="{ width: 200 }" tag="img"/>
                  </b-col>
                </b-row>
                <br/>
                <b-row>
                  <p class="border-bottom"><b>Hướng dẫn sử dụng:</b></p>
                </b-row>
                <b-row>
                  <p>1. Bạn có thể quét QR code phía trên bằng bất cứ công cụ nào: camera, Zalo, hoặc
                    nhấn nút quét QR code trên website orderway.vn</p>
                </b-row>
                <b-row>
                  <p>2. Chọn món hoặc gửi yêu cầu tới nhân viên trong màn hình hiện ra</p>
                </b-row>
                <b-row>
                  <p>3. Kết thúc! </p>
                </b-row>
                <b-row>
                  <br/>
                  <p>* Đăng nhập tài khoản để tích điểm trong mỗi lần order, điểm này có thể mua nhiều
                    khuyến mãi từ nhà hàng</p>
                </b-row>
                <hr/>
                <b-row>

                  <b-col md="3" class="text-right">
                    <img src="/static/img/icons/favicon.ico" class="logoSize"/>
                  </b-col>
                  <b-col md="9" class="text-left">
                    <h2> Order Way</h2>
                    <p>Ứng dụng đặt món tại bàn trực tuyến</p>
                  </b-col>
                </b-row>

              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

  </div>
</template>
<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import Vue from 'vue'
Vue.component(VueQrcode.name, VueQrcode)

import adminAPI from '@/api/admin'
import Mapper from '@/mapper/table'
import {Constant} from '@/common/constant'
import Cookies from 'js-cookie'
import jsPDF from 'jspdf'
import html2canvas from "html2canvas"
import commonFunc from '@/common/commonFunc'
import superAdminAPI from '@/api/superAdmin'


export default {

  data () {
    return {
      tableId: null,
      tableName: "",
      storeName: "Order way",
      tables: [],
      qr_code: "hello word",
      defaultWidthCm: 13,
      defaultWidthPx: 491.33858268
    }
  },
  mounted() {

    // Get table list
    this.getTableList()

    // Get store name
    this.getStoreName()
  },
  methods: {

     /**
   * Make toast without title
   */
  popToast(variant, content) {
    this.$bvToast.toast(content, {
      toastClass: 'my-toast',
      noCloseButton: true,
      variant: variant,
      autoHideDelay: 5000
    })
  },

    /**
     * Load list option table
     */
    getTableList () {
      adminAPI.getTableList().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.tables = Mapper.mapTableModelToOption(res.data.data)
        }
      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)
      })
    },

    /**
     * Get store name
     */
    getStoreName () {
      let user = JSON.parse(Cookies.get(Constant.APP_USR))
      if(user) {
        superAdminAPI.getStoreDetail(user.storeId).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            this.storeName = res.data.data.fields.name
          }
        }).catch(err => {
          // Handle error
          let errorMess = commonFunc.handleStaffError(err)
          this.popToast('danger', errorMess)
        })
      } else {
        this.$router.push('/staff-login')
      }
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
    },

    /**
     * Print
     */
    print() {
      // Get HTML to print from element
      const prtHtml = document.getElementById('printAble').innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = '';
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
      return
    },

    /**
     * Gen pdf file
     */
    createPDF () {
      const prtHtml = document.getElementById('printAble')
      var doc = new jsPDF("p", "mm", "a4");
      html2canvas(prtHtml).then(function(canvas){
        var imgData = canvas.toDataURL('image/png');
        // var pageHeight = 295;

        var imgWidth = 200 //(canvas.width * 50) / 210 ;
        var imgHeight = canvas.height * imgWidth / canvas.width;

        // var heightLeft = imgHeight;
        var position = 15;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        // heightLeft -= pageHeight;

        // while (heightLeft >= 0) {
        //     position = heightLeft - imgHeight;
        //     doc.addPage();
        //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        //     heightLeft -= pageHeight;
        // }
        doc.save(Date.now() +'.pdf');
      });
    },

    /**
     * Convert cm to px
     */
    convertCmToPx(cmInput) {
        return parseInt(cmInput) * 37.795275591
    },

    /**
     * Change width of print place
     */
    changeWidth() {
      this.defaultWidthPx = this.convertCmToPx(this.defaultWidthCm)
    }
  }
}
</script>

<style lang="css" scoped>
  .logoSize {
    width: 80px;
    height: 80px;
  }
</style>
