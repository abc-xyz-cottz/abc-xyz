<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h4 class="mt-2">Topping</h4>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right px-4" @click="goToAdd()">
                Thêm
              </b-button>
            </b-col>
          </b-row>
          <hr>
          <b-form @submit.prevent="search">
              <b-row class="form-row">
                <b-col md="4">
                  <label> Tên </label>
                  <input
                  id="name"
                  type="text"
                  class="form-control">
                </b-col>
                <b-col md="4">
                  <label> Giá </label>
                  <input
                  id="price"
                  type="text"
                  class="form-control">
                </b-col>
                <b-col md="4">
                  <label> Trạng Thái </label>
                  <b-form-select
                  :options="options"
                  id="status"
                  type="text"
                  class="form-control"></b-form-select>
                </b-col>
              </b-row>
              <hr>
            <b-row class="pull-right mb-3">
              <b-col>
                <b-button variant="primary" class="px-4">
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
          :items="items">
          <template v-slot:cell(actions)="dataId">
            <b-list-group horizontal>
              <b-list-group-item v-b-tooltip.hover title="Edit" @click="edit(dataId.value)">
                <i class="fa fa-edit" />
              </b-list-group-item>
              <b-list-group-item v-b-tooltip.hover title="Delete" @click="deleted(dataId.value)">
                <i class="fa fa-trash" />
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
          key: 'image',
          label: 'Hình Ảnh'
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
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [
        {stt: '1',image: 'hình1', name: 'cocacola', price: '30000', status: 'Mở', action: ''},
        {stt: '1',image: 'hình2', name: '7 up', price: '20000', status: 'Đóng', action: ''}
      ],
      options: [
        {value: '1', text: 'q1'},
        {value: '1', text: 'q2'}
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
      this.$bvModal.msgBoxConfirm('Bạn có muốn xóa sản phẩm này không?', {
        title: false,
        buttonSize: 'sm',
        centered: true, size: 'sm',
        footerClass: 'p-2'
      }).then(res => {
        if(res){
          alert('đã xóa')
        }
      })
    },
    edit (id) {
      this.$router.push('/menu/index/' + id)
    },
    goToAdd () {
      this.$router.push('/menu/index/')
    }
  }
}
</script>
