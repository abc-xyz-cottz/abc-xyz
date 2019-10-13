<template>
  <div class="container-fluid">
  <b-row>
    <b-col>
    <b-card>
      <h6>Menu</h6>
        <b-table 
        hover
        bordered
        :fields="fields" 
        :items="items">
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          size="sm"
          ></b-pagination>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
          key: 'price',
          label: 'Giá'
        },
        {
          key: 'status',
          label: 'Trạng Thái'
        },
        {
          key: 'actions',
          label: ''
        }
      ],
      items: [
        {stt: '1', name: 'cocacola', price: '30000', status: 'Mở', action: ''},
        {stt: '1', name: '7 up', price: '20000', status: 'Đóng', action: ''}
      ]
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
  }
}
</script>