<template>
  <div class="app-welcome flex-row align-items-center">
    <div class="container">
      <b-row class="row justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body>
              <b-card-body>
                <b-row class="info-welcome m-1">
                  <b-col md="8">
                    <div class="user-img">
                      <i class="fa fa-user fa-3x" />
                    </div>
                    <div class="row h-100">
                      <div class="align-self-center">
                        <p>
                          {{ staff.username }}
                          <br> {{ staff.roleName }}
                        </p>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="info-access m-1">
                  <b-col md="12" class="p-0">
                    <p>
                      {{ staff.fullName }}
                      <br> Last access: {{ staff.lastAccess }}
                    </p>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import StaffAPI from '@/api/staff'
import Mapper from '@/common/mapper'
export default {
  name: "Default",
  data() {
  return {
    staff: {},
    value: 'https://example.com',
    size: 50
  }
  },
  mounted() {
  this.getStaffInfo()
  },
  methods: {
  getStaffInfo() {
    setTimeout(() => {
    StaffAPI.getStaffInfo(this.$store.state.user.id, {}).then(res => {
      this.staff = Mapper.mapUserModelToDto(res.data.data)
    }).catch(err => {
      // TODO: Notifying errors
      console.log('Error:', err)
    })
    }, 500)
  }
  }
}
</script>
