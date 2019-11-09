<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h6 class="mt-2">Setting</h6>
            </b-col>
            <b-col md='6'>
              <b-button variant="primary" class="pull-right px-4" @click="save()">
                Lưu
              </b-button>
            </b-col>
          </b-row>
          <hr>
          <b-form @submit.prevent="save">
            <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Số điểm sẽ hết hạn sau</label><span class="error-sybol"></span>
                </b-col>
                <b-col md="6">
                  <input
                  id="pasword"
                  type="text"
                  class="form-control">
                </b-col>
                <b-col md="3" class="mt-2">
                  <label> Ngày </label>
                </b-col>
              </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
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
          key: 'point',
          label: 'Điểm'
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-cell'
        }
      ],
      items: [
        {stt: '1', point: 'cocacola',  action: ''},
        {stt: '1', point: '7 up', action: ''}
      ]
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    save () {

    }
  }
}
</script>
