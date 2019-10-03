<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3> {{ $t("guestManagrment.titlePage") }} </h3>
            </b-col>
            <b-col class="d-none d-md-block col-6">
              <button type="button" class="btn btn-primary pull-right px-4 d-none">
                {{ $t("buttons.btnAddGuest") }}
              </button>
            </b-col>
          </b-row>
          <hr>
          <b-form method="GET" @submit.prevent="search">
            <div class="form-row">
              <div class="form-group col-md-4 col-sm-12">
                <label>{{ $t("guestManagrment.label.name") }}</label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>{{ $t("guestManagrment.label.phone") }}</label>
                <input 
                  id="phone" 
                  v-model="phone"
                  type="text" 
                  class="form-control">
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>{{ $t("guestManagrment.label.email") }}</label>
                <input 
                  id="email" 
                  v-model="email"
                  type="text" 
                  class="form-control">
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>{{ $t("guestManagrment.label.code") }}</label>
                <input
                  id="code"
                  @focus="onShowQRCode = true"
                  @blur="onShowQRCode = false"
                  class="form-control"
                  v-model="code">
                <qrcode-stream v-if="onShowQRCode" @decode="onDecode" class="showQACode" />
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label>{{ $t("guestManagrment.label.level") }}</label>
                <b-form-select v-model="level" :options="options" class="mb-3"></b-form-select>
              </div>
            </div>
            <hr>
            <button class="btn btn-primary pull-right px-4">
              {{ $t("buttons.btnSearch") }}
            </button>
            <button type="button" class="btn btn-primary pull-right px-4 d-md-none d-sm-block">
              {{ $t("buttons.btnAddGuest") }}
            </button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col>
              <h4>Guest List</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-table
                hover
                bordered
                stacked="md"
                :fields="fields" :items="items"
                :per-page="0"
                :current-page="currentPage"
                onSearch="false">
                <template v-slot:cell(code)="dataCode">
                  <a :href="`#/guest-detail/pay-his/${dataCode.value}`" @click="goToDetail(dataCode.value)">{{ dataCode.value }}</a>
                </template>
                <template v-slot:cell(actions)="dataId">
                  <b-list-group horizontal :class="onSearch == true ? 'd-inline-flex table-btn-list-group' : 'd-none'" >
                    <b-list-group-item v-b-tooltip.hover title="Pay his">
                      <a :href="`#/guest-detail/pay-his/${dataId.value}`" @click="goToDetailTab('pay-his')">
                        <i class="fa fa-paypal"/>
                      </a>
                    </b-list-group-item>
                    <b-list-group-item v-b-tooltip.hover title="Promotion">
                      <a :href="`#/guest-detail/promotion/${dataId.value}`" @click="goToDetailTab('promotion')">
                        <i class="fa fa-bookmark" />
                      </a>
                    </b-list-group-item>
                    <b-list-group-item v-b-tooltip.hover title="Edit">
                      <a :href="`#/guest-edit/${dataId.value}`">
                        <i class="fa fa-edit" />
                      </a>
                    </b-list-group-item>
                    <b-list-group-item v-b-tooltip.hover title="Payment">
                      <a :href="`#/payment-management/${dataId.value}`" @click="goToPaymentPage(dataId.value)">
                        <i class="fa fa-credit-card" />
                      </a>
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
                @change="changePage">
              </b-pagination>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  import { QrcodeStream } from 'vue-qrcode-reader'
  import CustomerAPI from '@/api/customer'
  import Mapper from '@/common/mapper'
  export default {
    name: 'GuestManagement',
    data () {
      return {
        name: '',
        phone: '',
        email: '',
        code: '',
        level: '',
        onSearch: false,
        getField: false,
        perPage: 10,
        currentPage: 1,
        rows: 1,
        options: [],
        onShowQRCode: false,
        fields: [{
          key: 'code',
          label: this.$t("guestManagrment.titlePage")
        }, {
          key: 'fullName',
          label: 'Guest Name'
        }, {
          key: 'phoneNumber',
          label: 'Phone'
        }, {
          key: 'email',
          label: 'Email'
        }, {
          key: 'level',
          label: 'Level'
        }, {
          key: 'point',
          label: 'Point'
        }, {
          key: 'promotions',
          label: 'Promotion'
        }, {
          key: 'actions',
          class: 'actions-cell',
          label: ''
        } ],
        items: [{}]
      }
    },
    components: {
      QrcodeStream
    },
    mounted () {
      this.getOption()
    },
    methods: {
      onDecode (result) {
        this.code = result
      },
      changePage (currentPage) {
        this.currentPage = currentPage
        this.onSearch = true
        let limit = 10
        let offset = 0
        if(this.currentPage != 1) {
          offset= this.currentPage*limit - limit
        }
        let params = 'name='+ this.name + '&level=' + this.level + '&email=' + this.email 
        + '&code=' + this.code + '&phone=' + this.phone + '&limit=' + limit + '&offset=' + offset
        CustomerAPI.getListCustomer(params).then(res => {
          if(res != null && res.data != null && res.data.data != null){
            let customers = res.data.data.customers
            this.items = Mapper.mapCusModelToDto(customers)
          }
        }).catch(err => {
          this.onSearch = false
          console.log(err)
        })
      },
      search () {
        let limit = 10
        let offset = 0
        if(this.currentPage != 1) {
          offset= this.currentPage*limit - limit
        }
        let params = 'name='+ this.name + '&level=' + this.level + '&email=' + this.email 
        + '&code=' + this.code + '&phone=' + this.phone + '&limit=' + limit + '&offset=' + offset
        CustomerAPI.getListCustomer(params).then(res => {
          if(res != null && res.data != null && res.data.data != null){
            this.onSearch = true
            let customers = res.data.data.customers
            this.items = Mapper.mapCusModelToDto(customers)
            this.rows = res.data.data.total_row
          }else{
            this.onSearch = false
            this.items = [{}]
          }
        }).catch(err => {
          this.onSearch = false
          console.log(err)
        })
      },
      getOption () {
        CustomerAPI.getOptionLevel().then(res => {
          if(res != null && res.data != null && res.data.data != null){
            let level = res.data.data
            let levelOption = []
            for(let index in level){
              let item = {}
              item.value = level[index].fields.level
              item.text = level[index].fields.descen
              levelOption.push(item)
            }
            this.options = levelOption
          }
        }).catch(err => {
          console.log(err)
        })
      },
      goToDetail (cusId) {
        this.$router.push({params:{Cid:cusId}})
      },
      goToDetailTab (tabId) {
        this.$router.push({params:{tab:tabId}})
      },
      goToPaymentPage (paymentId) {
        this.$router.push({params:{payId:paymentId}})
      }
    }
  }
</script>
