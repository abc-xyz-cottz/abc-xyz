<template>
  <div class="container-fluid">
    <b-row class="row justify-content-center">
      <b-col md="8">
        <b-card-group>
          <b-card no-body>
            <b-card-body>
              <b-alert variant="success" dismissible fade :show="showSuccessAlert" @dismissed="showSuccessAlert=false">
                {{ $t("commons.messageSuccessAlert") }}
              </b-alert>
              <b-alert variant="danger" dismissible fade :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
                {{ $t("commons.messageDangerAlert") }}
              </b-alert>
              <b-form method="put" @submit.prevent="update">
                <h1 class="text-center">
                  F&B
                </h1>
                <div class="form-group">
                  <label for="currentPassword">
                    {{ $t("changePassword.label.currentPassword") }}
                    <span class="start-require"></span>
                  </label>
                  <input id="currentPassword" 
                    v-model="inputs.currentPassword" 
                    type="text" class="form-control" 
                    placeholder="input current username ..." 
                    :class="{ 'is-invalid': onComparePass || missCurrentPass}">
                  <div class="invalid-feedback">
                    <template v-if="onComparePass == true">
                      {{ errCompare }}
                    </template>
                    <template v-if="missCurrentPass == true">
                      {{ $t("commons.invalidFeedback") }}
                    </template>
                  </div>
                </div>
                <div class="form-group">
                  <label for="newPassword">
                    {{ $t("changePassword.label.newPassword") }}
                    <span class="start-require"></span>
                  </label>
                  <input id="newPassword" 
                    v-model="inputs.newPassword" 
                    type="text" class="form-control" 
                    placeholder="input new password ..." 
                    :class="{ 'is-invalid': missNewPassword }">
                  <div class="invalid-feedback">
                    <template v-if="missNewPassword == true">
                      {{ $t("commons.invalidFeedback") }}
                    </template>
                  </div>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">
                    {{ $t("changePassword.label.confirmPassword") }}
                    <span class="start-require"></span>
                  </label>
                  <input id="confirmPassword" 
                    v-model="inputs.confirmPassword" 
                    type="text" 
                    class="form-control" 
                    placeholder="input confirm password ..." 
                    :class="{ 'is-invalid':  missConfirmPass || onCompareNewPass}">
                  <div class="invalid-feedback">
                    <template v-if="onCompareNewPass == true">
                      {{ errCompareNewPass }}
                    </template>
                    <template v-if="missConfirmPass == true">
                      {{ $t("commons.invalidFeedback") }}
                    </template>
                  </div>
                </div>
                <b-row>
                  <b-col cols="12" class="text-center mt-3">
                    <button class="btn btn-primary px-4">
                      {{ onUpdate ? "Update.." : "Update" }}
                    </button>
                  </b-col>
                </b-row>
              </b-form>
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
  import {
    log
  } from 'util'
  export default {
    name: 'ChangePassword',
    data () {
      return {
        inputs: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        onUpdate: false,
        showSuccessAlert: false,
        showDismissibleAlert: false,
        missCurrentPass: false,
        missNewPassword: false,
        missConfirmPass: false,
        onComparePass: false,
        errCompare: '',
        onCompareNewPass: false,
        errCompareNewPass: ''
      }
    },
    methods: {
      validateForm () {
        if (this.inputs.newPassword && this.inputs.newPassword == this.inputs.confirmPassword &&
          this.inputs.currentPassword && this.inputs.confirmPassword) {
          this.onCompareNewPass = false
          this.missCurrentPass = false
          this.missNewPassword = false
          this.missConfirmPass = false
          return true
        } else {
          if (this.inputs.confirmPassword != '' && this.inputs.newPassword != this.inputs.confirmPassword) {
            this.onCompareNewPass = true
            this.errCompareNewPass = 'Confirm Password Not Correct!'
          } else {
            this.onCompareNewPass = false
          }
          if (this.inputs.confirmPassword == '') {
            this.missConfirmPass = true
          } else {
            this.missConfirmPass = false
          }
          if (this.inputs.currentPassword == '') {
            this.missCurrentPass = true
          } else {
            this.missCurrentPass = false
          }
          if (this.inputs.newPassword == '') {
            this.missNewPassword = true
          } else {
            this.missNewPassword = false
          }
          return false
        }
      },
      update () {
        let validated = this.validateForm ()
        if (validated) {
          this.onUpdate = true
          setTimeout(() => {
            StaffAPI.changePassword({
              "current_password": this.inputs.currentPassword,
              "new_password": this.inputs.newPassword
            }).then(res => {
              this.showSuccessAlert = true
              this.showDismissibleAlert = false
              this.onComparePass = false
              this.onUpdate = false
            }).catch(err => {
              this.onComparePass = true
              this.errCompare = 'Current Password Not Correct!'
              this.showDismissibleAlert = true
              this.showSuccessAlert = false
              this.onUpdate = false
            })
          }, 500)
        }
      }
    }
  }
</script>
