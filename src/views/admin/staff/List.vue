<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h6 class="mt-2">Staff</h6>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right px-4" @click="gotoAdd()">
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
                  <label> Số Điện Thoại </label>
                  <input
                  id="phone"
                  type="text"
                  class="form-control">
                </b-col>
                <b-col md="4">
                  <label> Quyền </label>
                  <b-form-select
                  id="permision"
                  :options="options"
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
      options:[
        {text: 'Staff', value: '1'},
        {text: 'Admin', value: '2'}
      ],
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
          key: 'permission',
          label: 'Quyền'
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
        {stt: '1', name: 'cocacola', phone: '30000', permission: 'Mở',createDate: '2019/10/12', action: ''},
        {stt: '1', name: '7 up', phone: '30000', permission: 'Mở',createDate: '2019/10/12', action: ''}
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
      this.$bvModal.msgBoxConfirm('Bạn có muốn xóa không?', {
        title: false,
        buttonSize: 'sm',
        centered: true, size: 'sm',
        footerClass: 'p-2'
      })
    },
    edit (id) {
      this.$router.push('/staff/index/' + id)
    },
    gotoAdd () {
      this.$router.push('/staff/index/')
    }
  }
}
</script>