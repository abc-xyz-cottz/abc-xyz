<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h4 class="mt-2">Setting</h4>
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
                  class="form-control"
                  v-model="data.value">
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
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/setting'
export default {
  data () {
    return {
      data: {
        "id" : null,
        "expired_point" : null,
        "value": null
      }
    }
  },
  mounted () {
    this.getSystemConfig()
  },
  methods: {
    save () {
      adminAPI.saveSystemConfig(this.data).then(res => {
          if(res != null && res.data != null){
            // Show notify edit success: TODO
            alert("ok")
          }else{
            // Show notify edit fail: TODO
            alert("fail")
          }
        }).catch(err => {
          console.log(err)
          // Show notify edit fail: TODO
          alert("fail")
        })
    },
    getSystemConfig () {
      adminAPI.getSystemConfig().then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          console.log(res.data.data)
          this.data = Mapper.mapSysCfgModelToDto(res.data.data)
        }
      })
    }
  }
}
</script>
