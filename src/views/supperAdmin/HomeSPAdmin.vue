<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h6 class="mt-2">Super admin</h6>
            </b-col>

          </b-row>
          <hr/>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToStoreList()">
                Quản lý store
              </b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToAdminStoreList()">
                Quản lý admin store
              </b-button>
            </b-col>
          </b-row>
          <br>

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    goToStoreList () {
      this.$router.push('/store/list')
    },
    goToAdminStoreList () {
      this.$router.push('/admin-store/list')
    }
  }
}
</script>
