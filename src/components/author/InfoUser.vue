<template>
  <div class="container-fluid">
    <b-row class="row justify-content-center">
      <b-col md="8">
        <b-card-group>
          <b-card no-body>
            <b-card-body>
              <b-row class="m-1">
                <b-col md="12" class="p-0">
                  <b-alert 
                    variant="success" 
                    success 
                    fade 
                    :show="showSuccessAlert" 
                    @dismissed="showSuccessAlert=false">
                    Update Compeleted!
                  </b-alert>
                  <b-alert 
                    variant="danger" 
                    dismissible 
                    fade 
                    :show="showDismissibleAlert" 
                    @dismissed="showDismissibleAlert=false">
                    Update Failed!
                  </b-alert>
                </b-col>
              </b-row>
              <b-row class="info-welcome m-1">
                <b-col md="8">
                  <div class="user-img"><i class="fa fa-user fa-3x" /></div>
                  <div class="row h-100">
                    <div class="align-self-center">
                      <p> {{ staff.username }}
                        <br>{{ staff.roleName }}</p>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <div class="update-info">
                <b-form method="put" @submit.prevent="update" @submit="validateForm">
                  <div class="form-group">
                    <label for="fullName">
                      {{ $t("infoUser.fullName") }}
                      <span class="start-require"></span>
                    </label>
                    <input id="fullName" 
                      v-model="staff.fullName" 
                      type="text" 
                      class="form-control" 
                      placeholder="input your full name ..." 
                      :class="{ 'is-invalid': attemptSubmit && missingFullName }">
                    <div class="invalid-feedback">
                      {{ $t("commons.invalidFeedback") }}
                    </div>
                  </div>
                  <b-row>
                    <b-col cols="12" class="text-center mt-3">
                      <button class="btn btn-primary px-4">
                        {{ onUpdate ? "Update.." : "Update" }}
                      </button>
                      <b-button variant="primary" class="px-4" href="/#/changePassword">
                        Change Password
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </div>
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import StaffAPI from '@/api/staff'
import Mapper from '@/common/mapper'
export default {
  name: 'InfoUser',
  data () {
    return {
      staff: {
        fullName: ''
      },
      onUpdate: false,
      attemptSubmit: false,
      showSuccessAlert: false,
      showDismissibleAlert: false
    }
  },
  mounted () {
    this.getStaffInfo ();
  },
  computed: {
    missingFullName () {
      return this.staff.fullName === ''
    }
  },
  methods: {
    getStaffInfo () {
      StaffAPI.getStaffInfo(this.$store.state.user.id, {}).then(res => {
        this.staff = Mapper.mapUserModelToDto(res.data.data)
      })
    },
    validateForm (event) {
      this.attemptSubmit = true
      if (this.missingFullName) event.preventDefault()
    },
    update () {
      if (this.attemptSubmit == true) {
        this.onUpdate = true
        setTimeout(() => {
          StaffAPI.updateStaffInfo({
            "id": this.$store.state.user.id,
            "full_name": this.staff.fullName
          }).then(res => {
            this.showSuccessAlert = true
            this.onUpdate = false
          }).catch(err => {
            this.showDismissibleAlert = true
            this.onUpdate = false
          })
        }, 500)
      }
    }
  }
}
</script>