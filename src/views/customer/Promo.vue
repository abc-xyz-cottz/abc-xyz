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
                <template v-slot:cell(actions)="dataId">
                  <b-list-group horizontal>
                    <b-list-group-item @click="showDetail()">
                      <i class="fa fa-info" />
                    </b-list-group-item>
                  </b-list-group>
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
                <template v-slot:cell(actions)="dataId">
                  <b-list-group horizontal>
                    <b-list-group-item @click="showDetail()">
                      <i class="fa fa-info" />
                    </b-list-group-item>
                  </b-list-group>
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
                <template v-slot:cell(actions)="dataId">
                  <b-list-group horizontal>
                    <b-list-group-item @click="showDetail()">
                      <i class="fa fa-info" />
                    </b-list-group-item>
                  </b-list-group>
                </template>
                </b-table>
            </b-tab>
        </b-tabs>
      </b-card-body>
    </b-card>
    <b-modal id="modal-point" title="Chi Tiết">
      <b-table 
        hover
        bordered
        stacked="md"
        :fields="fieldsPoint" 
        :items="itemsPoint">
        </b-table>
        <template v-slot:modal-footer>
          <b-button
            variant="primary"
            class="px-4"
            @click="$bvModal.hide('modal-point')"
          > OK</b-button>
      </template>
    </b-modal>
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
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [
        {stt: '1', name: 'cocacola', expiredate: '12/22/2019', action: ''},
        {stt: '2', name: 'cocacola', expiredate: '12/22/2019', action: ''},
        {stt: '3', name: 'cocacola', expiredate: '12/22/2019', action: ''},
        {stt: '4', name: 'cocacola', expiredate: '12/22/2019', action: ''},
        {stt: '5', name: 'cocacola', expiredate: '12/22/2019', action: ''}
      ],
      fieldsPoint: [
        {
          key: 'stt',
          label: 'STT'
        },
        {
          key: 'point',
          label: 'Điểm'
        },
        {
          key: 'expiredate',
          label: 'Ngày Hết Hạn'
        }
      ],
      itemsPoint: [
        {stt: '1', point: '1500', expiredate: '12/22/2019'},
        {stt: '2', point: '2500', expiredate: '1/22/2019'},
        {stt: '3', point: '5500', expiredate: '3/22/2019'},
      ]
    }
  },
  methods: {
    showDetail () {
      this.$bvModal.show('modal-point')
    }
  }
}
</script>