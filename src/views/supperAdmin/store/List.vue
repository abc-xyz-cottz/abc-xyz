<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h4 class="mt-2">Store</h4>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right px-4" @click="gotoAdd()">
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
                  class="form-control"
                  v-model="inputs.name">
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>Tỉnh/ Thành Phố</label>
                <b-form-select 
                  :options="optionsCiti"
                  id="citi"
                  type="text" 
                  class="form-control"
                  v-model="inputs.city_id"></b-form-select>
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>Quận</label>
                <b-form-select 
                  :options="optionsDistrict"
                  id="district"
                  type="text" 
                  class="form-control"
                  v-model="inputs.district_id"></b-form-select>
              </div>
            </div>
            <hr>
            <b-button variant="primary" class="mb-3 pull-right px-4" :disable="onSearch" @click.prevent="prepareToSearch">
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
import superAdminAPI from '@/api/superAdmin'
import Mapper from '@/mapper/store'
import commonFunc from '@/common/commonFunc'
import {Constant} from '@/common/constant'
export default {
  data () {
    return {
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
          key: 'citi',
          label: 'Tỉnh/ Thành Phố'
        },
        {
          key: 'district',
          label: 'Quận'
        },
        {
          key: 'address',
          label: 'Địa Chỉ'
        },
        {
          key: 'expiredDate',
          label: 'Ngày Hết Hạn'
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
      optionsCiti: [
        {value: '', text: "Tất cả"},
        {value: '1', text: "HN"},
        {value: '2', text: "HCM"}
      ],
      optionsDistrict: [
        {value: '', text: "Tất cả"},
        {value: '1', text: "Quận 1"},
        {value: '3', text: "Quận 3"}
      ],
      items: [],
      inputs: {
        name: '',
        city_id: '',
        district_id: ''
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
    deleted (id, name, rowIndex) {
      this.$bvModal.msgBoxConfirm('Xóa ' + name + ". Bạn có chắc không?", {
        title: false,
        buttonSize: 'sm',
        centered: true, size: 'sm',
        footerClass: 'p-2'
      }).then(res => {
        if(res){
          superAdminAPI.deleteStore(id).then(res => {
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
    edit (id) {
      this.$router.push('/store/index/' + id)
    },
    gotoAdd () {
      this.$router.push('/store/index/')
    },
    search () {
      if (this.loading) { return }

      this.onSearch = true
      this.loading = true
      
      superAdminAPI.getStoreList(this.inputs).then(res => {
        if (res != null && res.data != null && res.data.data != null) {
          let it = Mapper.mapStoreModelSearchToDto(res.data.data.stores, this.offset)

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
          console.log(err)
          this.onSearch = false
          this.loading = false
      })
    }
  }
}
</script>
