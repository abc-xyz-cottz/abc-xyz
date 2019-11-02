<template>
  <div class="container">
    <b-card-group>
      <b-card
        no-body>
        <b-card-body>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-height="250"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"></b-carousel-slide>
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=55"></b-carousel-slide>
          </b-carousel>
          <b-row>
            <b-col>
              <b-button
                class="mt-2"
                @click="goToWelcome()"
                @focus="onShowQRCode = true"
                @blur="onShowQRCode = false">
                Quét QR code
              </b-button>
              <qrcode-stream v-if="onShowQRCode" @decode="onDecode" class="showQACode" />
              <p class="">(Bạn có thể gọi món hoặc gửi yêu cầu tới nhân viên nhà hàng thông qua quét QR code mà không cần tài khoản)
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
                    class="form-control"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label-cols="4" label="Nhà Hàng" class="mb-2">
                  <b-form-select 
                    id="restaurant"
                    :options="optionsRes"
                    type="text"
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
  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
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
    components: {
      QrcodeStream
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      onDecode (result) {
        this.code = result
      },
      toBuy (id) {
        // this.$bvModal.msgBoxOk('Giao dịch thành công!', {
        //   title: false,
        //   buttonSize: 'sm',
        //   centered: true, size: 'sm',
        //   footerClass: 'p-2'
        // })
        this.$bvModal.msgBoxOk('Bạn không đủ điểm tại nhà hàng này!', {
          title: false,
          buttonSize: 'sm',
          centered: true, size: 'sm',
          footerClass: 'p-2'
        })
      },
      // this function will be delete in future
      goToWelcome () {
        this.$router.push('/welcome')
      }
    }
  }
</script>