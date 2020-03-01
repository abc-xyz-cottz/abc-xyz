<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='12'>
              <b-button variant="primary" class="pull-right px-4" @click="goToAdd()">
                Thêm
              </b-button>
            </b-col>
          </b-row>

           <b-row>
            <b-col md='12'>
              <h4 class="mt-2 text-center">Khuyến Mãi</h4>
            </b-col>
          </b-row>
          <hr>

          <b-row>
            <b-col md="3">
              <label> Tên </label>
              <input
              id="name"
              type="text"
              autocomplete="new-password"
              class="form-control"
              v-model="inputs.name">
            </b-col>

            <b-col md="3">
              <label> Giá </label>
              <input
              id="price"
              type="text"
              autocomplete="new-password"
              class="form-control"
              v-model="inputs.price">
            </b-col>

            <b-col md="3">
              <label> Loại </label>
              <b-form-select
              :options="typeOptions"
              id="status"
              type="text"
              autocomplete="new-password"
              class="form-control"
              v-model="inputs.type"></b-form-select>
            </b-col>

            <b-col md="3">
              <label> Hiệu lực </label>
              <b-form-select
              :options="expireOptions"
              id="status"
              type="text"
              autocomplete="new-password"
              class="form-control"
              v-model="inputs.expire"></b-form-select>
            </b-col>


          </b-row>

        <b-row class="mt-2 mb-2">
          <b-col md="12">
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
import Mapper from '@/mapper/promotion'
import commonFunc from '@/common/commonFunc'
import {Constant} from '@/common/constant'


export default {
  data () {
    return {
      inputs: {
        name: null,
        price: null,
        type: null,
        expire: null
      },
      pageLimit: Constant.PAGE_LIMIT,
      fields: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'code',
          label: 'Mã'
        },
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'price',
          label: 'Giá(điểm)'
        },
        {
          key: 'type',
          label: 'Loại'
        },
        {
          key: 'quantity',
          label: 'Số lượng'
        },
        {
          key: 'remaining',
          label: 'Còn lại'
        },
        {
          key: 'createDate',
          label: 'Ngày Tạo'
        },
        {
          key: 'expired',
          label: 'Ngày Hết Hạn'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [],
      listIdDeleted: [],
      offset: 0,
      hasNext: true,
      onSearch: false,
      loadByScroll: false,
      loading: false,
      expireOptions: [
        {value: null, text: ''},
        {value: 'true', text: 'Còn'},
        {value: 'false', text: 'Hết'}
      ],
      typeOptions: [{value: null, text: ''}]
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)

    window.addEventListener('resize', this.delete)

    // Load list option promotion type
    this.getPromotionTypeList()

    // Get list promotion
    this.getPromoList()

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
     * Make toast with title
     */
    makeToast(variant = null, title="Success!!!", content="Thao tác thành công!!!") {
      this.$bvToast.toast(content, {
        title: title,
        variant: variant,
        solid: true,
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
          this.getPromoList ()
        }
      }
    },

    /**
     * Delete
     */
    deleted (id, name, rowIndex) {
      if(id && name) {
        this.$bvModal.msgBoxConfirm('Xóa ' + name + ". Bạn có chắc không?", {
          title: false,
          buttonSize: 'sm',
          centered: true, size: 'sm',
          footerClass: 'p-2'
        }).then(res => {
          if (res) {
            adminAPI.deletePromo(id).then(res => {
              // Remove item in list
              let indexTemp = commonFunc.updateIndex(rowIndex - 1, this.listIdDeleted)
              this.items.splice(indexTemp, 1)
              this.listIdDeleted.push(rowIndex - 1)
            }).catch(err => {
              // Handle error
              let errorMess = commonFunc.handleStaffError(err)
              this.makeToast('danger', "Xóa thất bại!!!", errorMess)
            })
          }
        })
      }
    },

    /**
     * Load list option promotion type
     */
    getPromotionTypeList () {
      adminAPI.getListPromotionType().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.typeOptions = this.typeOptions.concat(res.data.data)
        }
      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)
      })
    },

    /**
     * Go to edit
     * @param id
     */
    edit (id) {
      this.$router.push('/promo/index/' + id)
    },

    /**
     * Go to add
     */
    goToAdd () {
      this.$router.push('/promo/index/')
    },

    /**
     * Prepare to search
     */
    prepareToSearch() {
      this.offset = 0
      this.items = []
      this.hasNext = true

      this.getPromoList()
    },

    /**
     * Get list
     */
    getPromoList () {
      if (this.loading) { return }

      this.onSearch = true
      this.loading = true
      // Define params
      let param = {
        "name": this.inputs.name,
        "price": this.inputs.price,
        "type": this.inputs.type,
        "expire": this.inputs.expire,
        "limit": this.pageLimit,
        "offset": this.offset
      }

      adminAPI.getPromoList(param).then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          let it = Mapper.mapPromoModelToDto(res.data.data.promotions, this.offset)

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
    }
  }
}
</script>
