<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container">
    <b-card no-body>
      <b-card-body>
          <b-tabs content-class="mt-3">

            <b-tab title="Khả Dụng" active>
              <b-row>
          <b-col>
                <b-table
                hover
                bordered
                stacked="md"
                :fields="ownerFields"
                :items="AvailablePromo">

                  <template v-slot:cell(action)="dataId">
                    <b-list-group horizontal>
                      <b-list-group-item @click="showDetail(dataId.item.id)">
                        <i class="fa fa-info" />
                      </b-list-group-item>
                    </b-list-group>
                  </template>
                </b-table>
          </b-col>
              </b-row>
            </b-tab>

            <b-tab title="Hết Hạn">
                <b-table
                hover
                bordered
                stacked="md"
                :fields="fields"
                :items="ExpiredPromo">
              </b-table>
            </b-tab>

            <b-tab title="Đã Dùng">
                <b-table
                hover
                bordered
                stacked="md"
                :fields="fields"
                :items="UsedPromo">
                </b-table>
            </b-tab>

        </b-tabs>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import customerAPI from '@/api/customer'
import Mapper from '@/mapper/promotion'
import commonFunc from '@/common/commonFunc'


export default {
  data () {
    return {
      counter: 0,
      perPage: '10',
      currentPage: '1',
      fields: [
        {
          key: 'idString',
          label: 'Mã'
        },
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'storeName',
          label: 'Cửa hàng'
        },
        {
          key: 'expiredate',
          label: 'Ngày Hết Hạn'
        }
      ],
      ownerFields: [
        {
          key: 'idString',
          label: 'Mã'
        },
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'storeName',
          label: 'Cửa hàng'
        },
        {
          key: 'expiredate',
          label: 'Ngày Hết Hạn'
        },
        {
          key: 'action',
          label: ''
        }
      ],
      AvailablePromo: [],
      ExpiredPromo: [],
      UsedPromo: []
    }
  },
  mounted() {
    this.getAvailablePromo()
    this.getExpiredPromo()
    this.getUsedPromo()
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
        autoHideDelay: 3000
      })
    },

    /**
     * Show detail
     */
    showDetail (id) {
      this.$router.push('/promo-detail/' + id)
    },

    /**
     * Get available promotion
     */
    getAvailablePromo() {
      customerAPI.getAvailablePromo().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          console.log(res.data.data)
          this.AvailablePromo = Mapper.mapPromoCustomerModelToOwnerDto(res.data.data)
        }
      }).catch(err => {
        // Handle error
          let errorMess = commonFunc.handleCusError(err)
          this.popToast('danger', errorMess)
      })
    },

    /**
     * Get expired promotion
     */
    getExpiredPromo() {
      customerAPI.getExpiredPromo().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.ExpiredPromo = Mapper.mapPromoCustomerModelToDto(res.data.data)
        }
      }).catch(err => {
        // Handle error
          let errorMess = commonFunc.handleCusError(err)
          this.popToast('danger', errorMess)
      })
    },

    /**
     * Get used promotion
     */
    getUsedPromo() {
      customerAPI.getUsedPromo().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.UsedPromo = Mapper.mapPromoCustomerModelToDto(res.data.data)
        }
      }).catch(err => {
        // Handle error
          let errorMess = commonFunc.handleCusError(err)
          this.popToast('danger', errorMess)
      })
    }
  }
}
</script>
