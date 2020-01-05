<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h4 class="mt-2">Staff</h4>
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
                  maxlength="100"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="inputs.name">
                </b-col>
                <b-col md="4">
                  <label> Số Điện Thoại </label>
                  <input
                  id="phone"
                  type="text"
                  maxlength="20"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="inputs.phone"
                  @keypress="validateCode">
                </b-col>
                <b-col md="4">
                  <label> Quyền </label>
                  <b-form-select
                  id="permision"
                  :options="options"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="inputs.role"></b-form-select>
                </b-col>
              </b-row>
              <hr>
            <b-row class="pull-right mb-3">
              <b-col>
                <b-button variant="primary" class="px-4" :disabled="onSearch" @click.prevent="prepareToSearch">
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
              <b-list-group-item v-b-tooltip.hover title="Edit" @click="edit(dataId.item.id)">
                <i class="fa fa-edit" />
              </b-list-group-item>
              <b-list-group-item v-b-tooltip.hover title="Delete" @click="deleted(dataId.item.id, dataId.item.name, dataId.item.stt)">
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
import Mapper from '@/mapper/staff'
import {Constant} from '@/common/constant'
import commonFunc from '@/common/commonFunc'


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
      items: [],
      inputs: {
        name: '',
        phone: '',
        role: ''
      },
      loadByScroll: false,
      onSearch: false,
      hasNext: true,
      loading: false,
      pageLimit: Constant.PAGE_LIMIT,
      offset: 0,
      listIdDeleted: [],
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
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
     * Scroll event
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
          this.offset = this.offset + 10
          this.loadByScroll = true
          this.search()
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
     * Delete
     * @param id
     * @param name
     * @param rowIndex
     */
    deleted (id, name, rowIndex) {
      this.$bvModal.msgBoxConfirm('Xóa ' + name + ". Bạn có chắc không?", {
        title: false,
        buttonSize: 'sm',
        centered: true, size: 'sm',
        footerClass: 'p-2'
      }).then(res => {
        if(res){
          adminAPI.deleteStaff(id).then(res => {
            // Remove item in list
            let indexTemp = commonFunc.updateIndex(rowIndex - 1, this.listIdDeleted)
            this.items.splice(indexTemp, 1)
            this.listIdDeleted.push(rowIndex - 1)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    /**
     * Go to edit
     * @param id
     */
    edit (id) {
      this.$router.push('/staff/index/' + id)
    },

    /**
     * Go to add
     */
    gotoAdd () {
      this.$router.push('/staff/index/')
    },

    /**
     * Search
     */
    search () {
      if (this.loading) { return }

      this.onSearch = true
      this.loading = true

      let req = {
        "name": this.inputs.name,
        "phone_number": this.inputs.phone,
        "role_id": this.inputs.role,
        "store_name": "store ".concat(this.$store.state.user.storeId),
        "limit": this.pageLimit,
        "offset": this.offset
      }
      
      adminAPI.searchStaff(req, this.offset).then(res => {
        if (res != null && res.data != null && res.data.data != null) {
          let it = Mapper.mapStaffModelSearchToDto(res.data.data.staffs, this.offset)

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
        } else {
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
     * Validate
     * @param event
     */
    validateCode (event) {
      // not number
      if(!commonFunc.isNumber(event)) {
        event.preventDefault()
      }
    }
  }
}
</script>
