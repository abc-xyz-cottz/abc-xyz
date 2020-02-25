<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
                <b-button variant="primary" class="pull-right px-4" @click="goToAdd()">
                  Thêm
                </b-button>
            </b-col>

            <b-col md='6'>
              <h4 class="mt-2 text-center">Menu</h4>
            </b-col>
          </b-row>
          <hr>

          <b-row>
            <b-col md="4">
              <label> Tên </label>
              <input
              id="name"
              type="text"
              autocomplete="new-password"
              class="form-control"
              v-model="inputs.name">
            </b-col>
            <b-col md="4">
              <label> Giá </label>
              <input
              id="price"
              type="text"
              autocomplete="new-password"
              class="form-control"
              v-model="inputs.price">
            </b-col>
            <b-col md="4">
              <label> Trạng Thái </label>
              <b-form-select
              :options="options"
              id="status"
              type="text"
              autocomplete="new-password"
              class="form-control"
              v-model="inputs.status"></b-form-select>
            </b-col>
          </b-row>

        <b-row class="mt-2 mb-2">
          <b-col md="6">
            <b-button variant="primary" class="pull-right px-4" :disabled="onSearch" @click.prevent="prepareToSearch">
              Tìm Kiếm
            </b-button>
          </b-col>
        </b-row>

          <b-table 
          hover
          bordered
          stacked="md"
          :fields="fields" 
          :items="items">
          <template v-slot:cell(action)="dataId">
            <b-list-group horizontal>
              <b-list-group-item v-b-tooltip.hover title="Edit" @click="edit(dataId.value)">
                <i class="fa fa-edit" />
              </b-list-group-item>
              <b-list-group-item v-b-tooltip.hover title="Delete" @click="deleted(dataId.value, dataId.item.name, dataId.item.stt)">
                <i class="fa fa-trash" />
              </b-list-group-item>
            </b-list-group>
          </template>
          </b-table>

          <!-- Loading -->
          <span class="loading-more" v-show="loading"><icon name="loading" width="60" /></span>
          <span class="loading-more" v-if="hasNext === false">Hết</span>
        </b-card>

      </b-col>
    </b-row>
  </div>
</template>


<script>
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/menu'
import {Constant} from '@/common/constant'
import commonFunc from '@/common/commonFunc'


export default {
  data () {
    return {
      inputs: {
        name: null,
        price: null,
        status: null
      },
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
          key: 'topping',
          label: 'Topping'
        },
        {
          key: 'status',
          label: 'Trạng Thái'
        },
        {
          key: 'action',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [],
      options: [
        {value: null, text: ''},
        {value: 'true', text: 'Mở'},
        {value: 'false', text: 'Đóng'}
      ],
      pageLimit: Constant.PAGE_LIMIT,
      offset: 0,
      hasNext: true,
      onSearch: false,
      loadByScroll: false,
      listIdDeleted: [],
      loading: false
    }
  },
  computed: {
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)

    window.addEventListener('resize', this.delete)

    // Load list when load page
    this.search()
  },
  methods: {

    /**
   * Make toast without title
   */
    popToast(variant, content) {
      this.$bvToast.toast(content, {
        toastClass: 'my-toast',
        noCloseButton: true,
        variant: variant,
        autoHideDelay: 5000
      })
    },

    /**
     *  Processing on scroll: use for paging
     */
    onScroll (event) {
      if(this.onSearch) {
        return
      }
      event.preventDefault()
      var body = document.body
      var html = document.documentElement
      if (window.pageYOffset + window.innerHeight +1 > Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)) {
        if(this.hasNext) {
          this.offset = this.offset + this.pageLimit
          this.loadByScroll = true
          this.search ()
        }
      }
    },

    /**
     * Prepare to search
     */
    prepareToSearch() {
      this.offset = 0
      this.items = []
      this.hasNext = true

      this.search()
    },

    /**
     *  Search
     */
    search() {
      if (this.loading) { return }

      this.onSearch = true
      this.loading = true
      // Define params
      let param = {
        "name": this.inputs.name,
        "price": this.inputs.price,
        "status": this.inputs.status,
        "limit": this.pageLimit,
        "offset": this.offset
      }

      // Search
      adminAPI.searchMenu(param).then(res => {
        if(res != null && res.data != null && res.data.data != null){
          let it = Mapper.mapMenuModelToDto(res.data.data.menus, this.offset)

           // Update items
          if(this.loadByScroll) {
            let temp = this.items
            var newArray = temp.concat(it)
            this.items = newArray
          } else {
            this.items = it
          }
          this.loadByScroll = false

          // Check has next
          if(this.offset + this.pageLimit >= res.data.data.total_row) {
            this.hasNext = false
          }
        }else{
            this.items = []
        }
        this.onSearch = false
        this.loading = false
      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)

        this.onSearch = false
        this.loading = false
      })
    },

    /**
     * Delete
     */
    deleted (id, name, rowIndex) {
      this.$bvModal.msgBoxConfirm('Xóa ' + name + ". Bạn có chắc không?", {
        title: false,
        buttonSize: 'sm',
        centered: true, size: 'sm',
        footerClass: 'p-2'
      }).then(res => {
        if(res){
          adminAPI.deleteMenu(id).then(res => {

            // Remove item in list
            let indexTemp = commonFunc.updateIndex(rowIndex - 1, this.listIdDeleted)
            this.items.splice(indexTemp, 1)
            this.listIdDeleted.push(rowIndex - 1)
          }).catch(err => {
            // Handle error
            let errorMess = commonFunc.handleStaffError(err)
            this.popToast('danger', errorMess)
          })
        }
      })
    },

    /**
     * Go to page edit
     */
    edit (id) {
      this.$router.push('/menu/edit/' + id)
    },

    /**
     * Go to page add
     */
    goToAdd () {
      this.$router.push('/menu/add')
    }
  }
}
</script>
