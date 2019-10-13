<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h6 class="mt-2">Store Admin</h6>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right">
                Thêm
              </b-button>
            </b-col>
          </b-row>
          <hr>
          <b-form method="GET" @submit.prevent="search">
            <div class="form-row">
              <div class="form-group col-md-4 col-sm-12">
                <label>Tên</label>
                <input
                  id="name"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>Số Điện Thoại</label>
                <input 
                  id="phone"
                  type="text" 
                  class="form-control">
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>Tên Cửa Hàng</label>
                <input 
                  id="nameStore"
                  type="text" 
                  class="form-control">
              </div>
            </div>
            <hr>
            <b-button variant="primary" class="mb-3 pull-right px-4">
              Tìm Kiếm
            </b-button>
          </b-form>
          <b-table 
          hover
          bordered
          stacked="md"
          :fields="fields" 
          :items="items">
          <template v-slot:cell(actions)="dataId">
            <b-list-group horizontal>
              <b-list-group-item v-b-tooltip.hover title="Edit" @click="edit(dataId)">
                <i class="fa fa-edit" />
              </b-list-group-item>
              <b-list-group-item v-b-tooltip.hover title="Delete" @click="deleted(dataId)">
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
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'phone',
          label: 'Số Điện Thoại'
        },
        {
          key: 'store',
          label: 'Cửa Hàng'
        },
        {
          key: 'createDate',
          label: 'Ngày Tạo'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [
        {stt: '1', name: 'cocacola', phone: '0987654321', store: 'store 3', createDate: '2019/10/12', action: ''},
        {stt: '1', name: 'cocacola', phone: '0987654321', store: 'storev 3', createDate: '2019/10/12', action: ''},
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
      this.$router.push('/supper/store/index/')
    }
  }
}
</script>