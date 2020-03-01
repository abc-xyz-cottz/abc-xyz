<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Role</h3>
            </b-col>
            <b-col class="col-6">
              <button
                type="button"
                class="btn btn-primary pull-right px-4"
              >
                Add Role
              </button>
            </b-col>
          </b-row>
          <hr>
          <b-form
            method="GET"
            @submit.prevent="search"
          >
            <div class="form-row">
              <div class="form-group col-md-6 col-sm-12">
                <label for="store">Role</label>
                <input
                  id="roleName"
                  type="text"
                  class="form-control"
                >
              </div>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col>
              <h4>Screen List</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
                <b-form-group label="Function 1">
                    <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">
                        <b-form-checkbox value="orange">Orange</b-form-checkbox>
                        <b-form-checkbox value="apple">Apple</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
                        <b-form-checkbox value="grape">Grape</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <b-form-group label="Function 2">
                    <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">
                        <b-form-checkbox value="orange">Orange</b-form-checkbox>
                        <b-form-checkbox value="apple">Apple</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
                        <b-form-checkbox value="grape">Grape</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
            </b-col>
          </b-row>
          <b-row>
              <b-col class="mt-3">
              <b-button class="px-4">Back</b-button>
              <button
                type="button"
                class="btn btn-danger pull-right px-4"
              >
                Delete
              </button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
    name: 'RoleManagement',
    data: function() {
        return {
            roleName: ''
        }
    },
    methods: {
    }
}
</script>