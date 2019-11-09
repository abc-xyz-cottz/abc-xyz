<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col md='6'>
              <h6 class="mt-2">Admin</h6>
            </b-col>

          </b-row>
          <hr/>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToToppingList()">
                Quản lý topping
              </b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToMenuList()">
                Quản lý menu
              </b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToStaffList()">
                Quản lý nhân viên
              </b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToPmtList()">
                Quản lý khuyến mãi
              </b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToTableList()">
                Quản lý bàn ăn
              </b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToSetting()">
                Quản lý cấu hình
              </b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-button variant="primary" class="pull-center px-4" @click="goToPrintQrCode()">
                In QR code
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
    goToToppingList () {
      this.$router.push('/topping/list')
    },
    goToMenuList () {
      this.$router.push('/menu/list')
    },
    goToStaffList () {
      this.$router.push('/staff/list')
    },
    goToPmtList () {
      this.$router.push('/promo/list')
    },
    goToTableList () {
      this.$router.push('/table/list')
    },
    goToSetting () {
      this.$router.push('/setting')
    },
    goToPrintQrCode () {
      this.$router.push('/print-qr-code')
    }
  }
}
</script>
