<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container">
    <b-card-group>
      <b-card no-body>
        <b-card-body>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-height="175"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide img-src="../../static/img/quang-cao/1.jpg"></b-carousel-slide>
            <b-carousel-slide img-src="../../static/img/quang-cao/2.jpg"></b-carousel-slide>
            <b-carousel-slide img-src="../../static/img/quang-cao/3.jpg"></b-carousel-slide>
            <b-carousel-slide img-src="../../static/img/quang-cao/4.jpg"></b-carousel-slide>
            <b-carousel-slide img-src="../../static/img/quang-cao/5.jpg"></b-carousel-slide>
          </b-carousel>
          <b-row>
            <b-col>
              <b-button
                class="mt-2"
                @click="showPopupQRCode()">
                Quét QR code
              </b-button>
              <p class="">(Bạn có thể gọi món hoặc gửi yêu cầu tới nhân viên nhà hàng thông qua quét QR code)
              </p>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-card-group>
    <b-card-group>
      <b-card no-body>
        <b-card-body>
          <h5 class="boder-bottom">Tìm khuyến mãi</h5>
          <b-form @submit.prevent="search">
            <b-row>
              <b-col md="6">
                <b-form-group label-cols="4" label="Tỉnh/ Thành Phố" class="mb-2">
                  <b-form-select 
                    id="citi"
                    :options="optionsCiti"
                    type="text"
                    autocomplete="new-password"
                    class="form-control"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label-cols="4" label="Nhà Hàng" class="mb-2">
                  <b-form-select 
                    id="restaurant"
                    :options="optionsRes"
                    type="text"
                    autocomplete="new-password"
                    class="form-control"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button
                  variant="primary"
                  class="px-4 pull-right">
                  Tìm Kiếm
                </b-button>
              </b-col>
            </b-row>
          </b-form>
          <b-table 
            hover
            bordered
            stacked="md"
            :fields="fields" 
            :items="items"
            class="mt-3">
            <template v-slot:cell(actions)="dataId">
              <b-list-group horizontal>
                <b-list-group-item v-b-tooltip.hover title="Mua" @click="toBuy(dataId)">
                  <i class="fa fa-shopping-cart" />
                </b-list-group-item>
              </b-list-group>
            </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              size="sm"
            ></b-pagination>
        </b-card-body>
      </b-card>
    </b-card-group>

    <!-- Modal Scan QR code -->
    <b-modal hide-header-close no-close-on-backdrop centered hide-footer
    id="modal-scan"
    :title='$t("modal.customer.title")'>
    <qrcode-stream @decode="onDecode" class="showQRCode"/>
    <b-button class="mt-3" variant="primary" block @click="hidePopupQRCode">Close</b-button>
    </b-modal>

  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import Cookies from 'js-cookie'
import {Constant} from '@/common/constant'


export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      optionsCiti: [
        {value: '1', text: 'HCM'},
        {value: '2', text: 'HN'}
      ],
      optionsRes: [
        {value: '1', text: 'Nha hang 1'},
        {value: '2', text: 'Nha Hang 2'}
      ],
      slide: 0,
      sliding: null,
      onLogin: false,
      selected: '',
      onShowQRCode: false,
      perPage: '10',
      currentPage: '1',
      fields: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'citi',
          label: 'Tỉnh/ Thành Phố'
        },
        {
          key: 'district',
          label: 'Quận'
        },
        {
          key: 'address',
          label: 'Địa Chỉ'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [
      {stt: '1', name: 'cocacola', citi: 'HN', district: '3', address: 'haha', action: ''},
      {stt: '1', name: 'cocacola', citi: 'HN', district: '3', address: 'haha', action: ''},
    ]
    }
  },
    computed: {
      rows() {
        return this.items.length
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },

      /**
       * Decode QR code
       */
      onDecode (result) {
        this.onShowQRCode = false
        let url = result.replace("http://localhost:8088", "")
        this.$router.push(url)
      },

      /**
       * Buy promotion
       */
      toBuy () {
        this.$bvModal.msgBoxOk('Bạn không đủ điểm tại nhà hàng này!', {
          title: false,
          buttonSize: 'sm',
          centered: true, size: 'sm',
          footerClass: 'p-2'
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
    }
  }
</script>
