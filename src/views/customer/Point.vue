<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col class="mb-3">
            <span>Tổng điểm: {{ total_point }} </span>
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
                  <b-list-group-item @click="showDetail(dataId.item.store_id)">
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
import customerAPI from '@/api/customer'
import Mapper from '@/mapper/point'
import commonFunc from '@/common/commonFunc'
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
      items: [],
      total_point: '0',
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
      itemsPoint: []
    }
  },
  mounted() {
    this.getPointList()
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
     * @param store_id
     */
    showDetail (store_id) {
      customerAPI.getPointDetailList(store_id).then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.itemsPoint = Mapper.mapPointDetailModelToDto(res.data.data.point_detail)
        }
      })
      this.$bvModal.show('modal-point')
    },

    /**
     * Get point list
     */
    getPointList () {
      customerAPI.getPointList().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.items = Mapper.mapPointModelToDto(res.data.data.point_list)
          this.total_point = res.data.data.total_point
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
