<template>
  <div class="container">
    <b-card no-body>
      <b-card-body>
        <h3 class="boder-bottom">Chi tiết khuyến mãi</h3>
          <b-row>
            <b-col>
              <label>Tên: {{ name }}</label>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label>Ngày Hết Hạn: {{ expiredDate }}</label>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label>Ngày Mua: {{ dateBuy }}</label>
            </b-col>
          </b-row>
        <b-row>
          <b-col>
            <qrcode-vue :value="value" :size="size" level="H" class="mt-1"></qrcode-vue>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  data () {
    return {
      value: 'https://www.facebook.com/tanarmy77',
      size: 100,
      name: 'KM1',
      expiredDate: '20191222',
      dateBuy: '20190101'
    }
  },
  components: {
    QrcodeVue
  }
}
</script>