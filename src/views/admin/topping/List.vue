<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h4 class="mt-2">Topping</h4>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right px-4" @click="goToAdd()">
                Thêm
              </b-button>
            </b-col>
          </b-row>
          <hr>

          <b-table 
          hover
          bordered
          stacked="md"
          :fields="fields" 
          :items="items">
          <template v-slot:cell(actions)="dataId">
            <b-list-group horizontal>
              <b-list-group-item v-b-tooltip.hover title="Edit" @click="edit(dataId.value)">
                <i class="fa fa-edit" />
              </b-list-group-item>
              <b-list-group-item v-b-tooltip.hover title="Delete" @click="deleted(dataId.value, dataId.item.name, dataId.item.stt)">
                <i class="fa fa-trash" />
              </b-list-group-item>
            </b-list-group>
          </template>
          </b-table>

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/topping'
import {Constant} from '@/common/constant'
import commonFunc from '@/common/commonFunc'

export default {
  data () {
    return {
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
          key: 'price',
          label: 'Giá'
        },
        {
          key: 'status',
          label: 'Trạng Thái'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [],
      listIdDeleted: []
    }
  },
  computed: {
  },
  mounted() {
    // Load list when load page
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
   * Make toast with title
   */
  makeToast(variant = null, title, content) {
    this.$bvToast.toast(content, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 5000
    })
  },

    /**
     *  Delete
     */
    deleted (id, name, rowIndex) {

      this.$bvModal.msgBoxConfirm('Xóa ' + name + ". Bạn có chắc không?", {
        title: false,
        buttonSize: 'sm',
        centered: true, size: 'sm',
        footerClass: 'p-2'
      }).then(res => {
        if(res){
          adminAPI.deleteTopping(id).then(res => {

            // Remove item in list
            let indexTemp = commonFunc.updateIndex(rowIndex - 1, this.listIdDeleted)
            this.items.splice(indexTemp, 1)
            this.listIdDeleted.push(rowIndex - 1)

            this.popToast('success', 'Xóa topping thành công!!!')
          }).catch(err => {
            let message = ""
            if(err.response.data.status == 500) {
              message = "Lỗi hệ thống, chúng tôi rất tiếc về sự cố này, bạn thử lại sau vài phút nhé"
            } else {
              message = err.response.data.mess
            }
            this.makeToast('danger', 'Cập nhật topping thất bại!!!', message)
          })
        }
      })
    },

    /**
     *  Go to edit
     */
    edit (id) {
      this.$router.push('/topping/edit/' + id)
    },

    /**
     *  Go to add
     */
    goToAdd () {
      this.$router.push('/topping/add')
    },

    /**
     *  Search
     */
    search() {
      // Search
      adminAPI.searchTopping().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          this.items = Mapper.mapToppingModelToDto(res.data.data)
        }

      }).catch(err => {
        // Handle error
        let errorMess = commonFunc.handleStaffError(err)
        this.popToast('danger', errorMess)
      })
    },

  }
}
</script>
