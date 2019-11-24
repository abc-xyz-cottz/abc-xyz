<template>
    <div class="container">
      <b-card no-body>
      <b-card-body class="welcome-page">
         <!--<b-form>-->
            <b-row>
              <b-col>
                <b-table 
                hover
                bordered
                stacked="md"
                :fields="fields" 
                :items="items">
                <template v-slot:cell(actions)="dataId">
                  <b-list-group horizontal>
                    <b-list-group-item @click="countDownt(dataId)">
                      <i class="fa fa-minus" />
                    </b-list-group-item>
                    <b-list-group-item @click="countUp(dataId)">
                      <i class="fa fa-plus" />
                    </b-list-group-item>
                    <b-list-group-item>
                      <span :id="`${dataId}`"> {{ counter }} </span>
                    </b-list-group-item>
                  </b-list-group>
                </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label class="col-2">Chọn bàn</label>
                <b-form-select v-model="selected" :options="options" class="col-4"></b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" class="mt-3">
                <button class="btn btn-primary pull-right  px-4" @click="sendOrder">
                    Đặt Món
                </button>
              </b-col>
            </b-row>
         <!--</b-form>-->
      </b-card-body>
      </b-card>

      <!-- Modal -->
      <b-modal id="modal-order" title="Thông Báo">
        <p>Đặt món thành công!</p>
        <p>Đăng ký tài khoản để tích điểm và nhận nhiều khuyến mãi từ nhà hàng</p>
        <template v-slot:modal-footer>
          <b-button
            variant="primary"
            class="px-4"
            @click="$bvModal.hide('modal-order')"
          > OK</b-button>
      </template>
      </b-modal>
    </div>
</template>
<script>
import CustomerAPI from '@/api/customer'

export default {
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'Vui lòng chọn bàn' },
        { value: '1', text: 'Bàn 1' },
        { value: '2', text: 'Bàn 2' },
        { value: '3', text: 'Bàn 3' }
      ],
      counter: 0,
      perPage: '10',
      currentPage: '1',
      fields: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'image',
          label: 'Hình Ảnh'
        },
        {
          key: 'name',
          label: 'Tên Sản Phẩm'
        },
        {
          key: 'price',
          label: 'Giá'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [
        {stt: '1', image: 'a1', name: 'cocacola', price: '30000', action: ''},
        {stt: '2', image: 'a2', name: '7 up', price: '30000', action: ''},
        {stt: '1', image: 'a1', name: 'cocacola', price: '30000', action: ''},
        {stt: '2', image: 'a2', name: '7 up', price: '30000', action: ''},
        {stt: '1', image: 'a1', name: 'cocacola', price: '30000', action: ''},
        {stt: '2', image: 'a2', name: '7 up', price: '30000', action: ''},
        {stt: '1', image: 'a1', name: 'cocacola', price: '30000', action: ''},
        {stt: '2', image: 'a2', name: '7 up', price: '30000', action: ''},
        {stt: '1', image: 'a1', name: 'cocacola', price: '30000', action: ''},
        {stt: '2', image: 'a2', name: '7 up', price: '30000', action: ''},
      ],
      socket: null,
      connected: false
    }
  },

  mounted() {
    let storeId = 1 // this.$route.params.sid
    this.socket = new WebSocket(
      'ws://127.0.0.1:8000/join-group/' + storeId)

    this.socket.onopen = event => {
        console.log('connected')
        this.connected = true
        // this.socket.send({})
    }

    this.socket.onmessage = event => {
      alert("mess den")
      var json_data = JSON.parse(event.data)
      this.dataSet = json_data.text
      console.log(json_data.text)
      alert(json_data.text)
    }

    this.socket.onclose = event => {
      this.connected = false
    }

  },

  methods: {
    sendOrder () {
      // alert("send order start")
      // this.$bvModal.show('modal-order')
      CustomerAPI.sendOrder().then(res => {
        console.log(JSON.parse(res))
      }).catch(err => {
        console.log(err)

      })
      // this.socket.send({"abc": "xyz"})
      // alert("send order end")
    },
    countDownt (num) {
      this.counter -= 1
    },
    countUp (num) {
      this.counter += 1
    }
  }
}
</script>
