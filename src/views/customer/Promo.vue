<template>
  <div class="container">
    <b-card no-body>
      <b-card-body>
          <b-tabs content-class="mt-3">
            <b-tab title="Khả Dụng" active>
                <b-table
                hover
                bordered
                stacked="md"
                :fields="fields"
                :items="AvailablePromo">
                <template v-slot:cell(stt)="dataId">
                  <span class="promo-tabs-link" @click="showDetail(dataId.item.id, 'available')">
                    {{ dataId.value }}
                  </span>
                </template>
                </b-table>
            </b-tab>
            <b-tab title="Đã Hết Hạn">
                <b-table
                hover
                bordered
                stacked="md"
                :fields="fields"
                :items="ExpiredPromo">
                <template v-slot:cell(stt)="dataId">
                  <span class="promo-tabs-link" @click="showDetail(dataId.item.id, 'expired')">
                    {{ dataId.value }}
                  </span>
                </template>
              </b-table>
            </b-tab>
            <b-tab title="Đã Dùng">
                <b-table
                hover
                bordered
                stacked="md"
                :fields="fields"
                :items="UsedPromo">
                <template v-slot:cell(stt)="dataId">
                  <b-list-group horizontal>
                    <span class="promo-tabs-link" @click="showDetail(dataId.item.id, 'used')">
                      {{ dataId.value }}
                    </span>
                  </b-list-group>
                </template>
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
export default {
  data () {
    return {
      counter: 0,
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
          key: 'expiredate',
          label: 'Ngày Hết Hạn'
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
    showDetail (id, tabName) {
      this.$router.push('/promo-detail/'+ tabName + '/' + id)
    },
    getAvailablePromo() {
      customerAPI.getAvailablePromo().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          console.log(res.data.data)
          this.AvailablePromo = Mapper.mapPromoCustomerModelToDto(res.data.data)
        }
      })
    },
    getExpiredPromo() {
      customerAPI.getExpiredPromo().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.ExpiredPromo = Mapper.mapPromoCustomerModelToDto(res.data.data)
        }
      })
    },
    getUsedPromo() {
      customerAPI.getUsedPromo().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.UsedPromo = Mapper.mapPromoCustomerModelToDto(res.data.data)
        }
      })
    }
  }
}
</script>
