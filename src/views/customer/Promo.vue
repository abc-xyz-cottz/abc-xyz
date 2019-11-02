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
                :items="items">
                <template v-slot:cell(stt)="dataId">
                  <span class="promo-tabs-link" @click="showDetail(dataId.value, 'available')">
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
                :items="items">
                <template v-slot:cell(stt)="dataId">
                  <span class="promo-tabs-link" @click="showDetail(dataId.value, 'expired')">
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
                :items="items">
                <template v-slot:cell(stt)="dataId">
                  <b-list-group horizontal>
                    <span class="promo-tabs-link" @click="showDetail(dataId.value, 'used')">
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
      items: [
        {stt: '1', name: 'cocacola', expiredate: '12/22/2019'},
        {stt: '2', name: 'cocacola', expiredate: '12/22/2019'},
        {stt: '3', name: 'cocacola', expiredate: '12/22/2019'},
        {stt: '4', name: 'cocacola', expiredate: '12/22/2019'},
        {stt: '5', name: 'cocacola', expiredate: '12/22/2019'}
      ]
    }
  },
  methods: {
    showDetail (id, tabName) {
      this.$router.push('/promo-detail/'+ tabName + '/' + id)
    }
  }
}
</script>
