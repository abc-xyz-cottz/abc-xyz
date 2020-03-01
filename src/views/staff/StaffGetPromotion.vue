<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-row>
              <b-col cols="12">
                <button class="btn btn-primary pull-right  px-4" @click="send" :disabled="saving">
                    Gửi
                </button>
              </b-col>
            </b-row>

              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2 text-center">Xác nhận khuyến mãi</h4>
                </b-col>

              </b-row>

              <hr/>

              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Mã khuyến mãi </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <div class="input-group">
                    <input
                    id="id"
                    type="text"
                    autocomplete="new-password"
                    class="form-control  pull-left"
                    v-model="inputs.code">&nbsp;&nbsp;
                    <b-button @click="showPopupQRCode()" class="show-qr-code-button">
                      <icon width="20" name="qr-code" />
                    </b-button>
                </div>

                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorId">
                    Đây là mục bắt buộc nhập
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

            <b-row class="form-row">
                <b-col md="12">
                  <input
                  id="idCus"
                  type="text"
                  autocomplete="new-password"
                  class="form-control  pull-left"
                  v-model="inputs.idCus"
                  :disabled="idCusFlag"
                  hidden>
                </b-col>
              </b-row>

              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Bàn </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="tables"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="inputs.tableId">
                  </b-form-select>
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorTableId">
                    Đây là mục bắt buộc nhập
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal Scan QR code -->
    <b-modal hide-header-close no-close-on-backdrop centered hide-footer
    id="modal-scan"
    >
    <qrcode-stream @decode="onDecode" class="showQRCode"/>
    <b-button class="mt-3" variant="primary" block @click="hidePopupQRCode">Close</b-button>
    </b-modal>

  </div>
</template>


<script>
import adminAPI from '@/api/admin'
import staffAPI from '@/api/staff'
import MapperTable from '@/mapper/table'
import commonFunc from '@/common/commonFunc'
import { QrcodeStream } from 'vue-qrcode-reader'


export default {
  components: {
    QrcodeStream
  },
  data () {
    return {
      tables: [],
      inputs: {
        "code": null,
        "idCus": "",
        "tableId": null,
      },
      idCusFlag: true,
      saving: false,
      click: false
    }
  },
  mounted() {
    // Get table list
    this.getTableList()
  },
  computed: {
    errorId: function () {
      return this.checkInfo(this.inputs.code)
    },
    errorTableId: function () {
      return this.checkInfo(this.inputs.tableId)
    },
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorId || this.errorTableId)
    },

    /**
   * Make toast without title
   */
    popToast(variant, content) {
      this.$bvToast.toast(content, {
        toastClass: 'my-toast',
        noCloseButton: true,
        variant: variant,
        autoHideDelay: 3000
      })
    },

    /**
     * Load list option table
     */
    getTableList () {
      adminAPI.getTableListOption().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.tables = MapperTable.mapTableModelToOption(res.data.data)
        }
      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)
      })
    },

    /**
     * Event click btn show QR code
     */
    showPopupQRCode () {
      this.onShowQRCode = true
      this.$bvModal.show('modal-scan')
    },

    /**
     * Hide popup scan QR code
     */
    hidePopupQRCode () {
      this.onShowQRCode = false
      this.$bvModal.hide('modal-scan')
    },

    /**
     * Decode QR code
     */
    onDecode (result) {

      let ids = result.split("-")
      let proId = ids[0]
      this.inputs.code = commonFunc.formatId(proId, 8)
      this.inputs.idCus = ids[2]

      this.onShowQRCode = false
      this.$bvModal.hide('modal-scan')
    },

    /**
     * Send promotion to admin
     */
    send() {
      this.click = true
      this.saving = true
      let result = this.checkValidate()
      if(result) {
        staffAPI.sendPromo(this.inputs).then(res => {
          this.popToast('success', 'Thao tác thành công')

          this.saving = false
        }).catch(err => {
          this.saving = false

          // Handle error
          let errorMess = commonFunc.handleStaffError(err)
          this.popToast('danger', errorMess)
        })
      } else {
        this.saving = false
      }

    }

  }
}
</script>
