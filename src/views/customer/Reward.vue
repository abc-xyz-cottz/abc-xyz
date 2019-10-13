<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h6>Tổng Điểm: 100</h6>
            </b-col>
          </b-row>
          <hr>
          <b-table 
          hover
          bordered
          stacked="md"
          :fields="fields" 
          :items="items">
          <template v-slot:cell(actions)="dataId">
            <b-list-group horizontal>
              <b-list-group-item v-b-tooltip.hover title="Edit" @click="edit(dataId)">
                <i class="fa fa-minus" />
              </b-list-group-item>
              <b-list-group-item v-b-tooltip.hover title="Delete" @click="deleted(dataId)">
                <i class="fa fa-plus" />
              </b-list-group-item>
              <b-list-group-item>
                <span> {{ count }} </span>
              </b-list-group-item>
            </b-list-group>
          </template>
          </b-table>
          <b-row class="text-center">
            <b-col>
              <b-button variant="primary">
                Đổi
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count: 0,
      perPage: '10',
      currentPage: '1',
      fields: [
        {
          key: 'stt',
          label: 'STT'
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
        {stt: '1', name: 'cocacola', price: '30000', action: ''},
        {stt: '2', name: '7 up', price: '30000', action: ''}
      ]
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    deleted (id) {
      alert("delete")
    },
    edit (id) {
      this.$router.push('/promo/index/')
    }
  }
}
</script>