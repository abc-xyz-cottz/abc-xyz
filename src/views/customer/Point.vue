<template>
  <div class="container">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col class="mb-3">
            <span>Tổng Điểm: 1000 </span>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
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
          </b-col>
        </b-row>
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
          label: 'Tên Nhà Hàng'
        },
        {
          key: 'point',
          label: 'Tổng Điểm'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [
        {stt: '1', name: 'cocacola', point: '30000', action: ''},
        {stt: '2', name: 'cocacola', point: '30000', action: ''},
        {stt: '3', name: 'cocacola', point: '30000', action: ''},
        {stt: '4', name: 'cocacola', point: '30000', action: ''},
        {stt: '5', name: 'cocacola', point: '30000', action: ''}
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