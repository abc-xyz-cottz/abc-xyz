<template>
    <div class="container">
      <b-card no-body>
      <b-card-body class="welcome-page">
         <b-form @submit.prevent="send">
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
                <button class="btn btn-primary pull-right  px-4">
                    Đặt Món
                </button>
              </b-col>
            </b-row>
         </b-form>
      </b-card-body>
      </b-card>
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
      ]
    }
  },
  methods: {
    send () {
      this.$bvModal.show('modal-order')
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