<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h4 class="mt-2">Promotion</h4>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right px-4" @click="goToAdd()">
                Thêm
              </b-button>
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
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'price',
          label: 'Giá'
        },
        {
          key: 'expired',
          label: 'Hết Hạn'
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
        {stt: '1', name: 'cocacola', price: '30000', expired: '2020/10/12', createDate: '2019/10/12', action: ''},
        {stt: '1', name: '7 up', price: '30000', expired: '2020/10/12', createDate: '2019/10/12', action: ''}
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
      this.$router.push('/promo/index/' + id)
    },
    goToAdd () {
      this.$router.push('/promo/index/')
    }
  }
}
</script>
