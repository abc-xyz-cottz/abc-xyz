<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Account</h3>
            </b-col>
            <b-col class="d-none d-md-block col-6">
              <button
                type="button"
                class="btn btn-primary pull-right ml-3 px-4">
                Add Account
              </button>
              <button
                type="button"
                class="btn btn-primary pull-right px-4">
                Reset Password
              </button>
            </b-col>
          </b-row>
          <hr>
          <b-form
            method="GET"
            @submit.prevent="search">
            <div class="form-row">
              <div class="form-group col-md-4 col-sm-12">
                <label for="name">User Name</label>
                <input
                  id="username"
                  type="text"
                  class="form-control"
                >
                <div class="invalid-feedback">
                  This field is required.
                </div>
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label for="fullname">Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-4 col-sm-12">
                <label for="role">Role</label>
                <b-form-select :options="options" class="mb-3"></b-form-select>
              </div>
            </div>
          </b-form>
          <h5 class="mt-3">Store</h5>
          <b-form-group>
            <b-form-checkbox-group>
                <b-form-checkbox value="b1">Brand 1 - store 1</b-form-checkbox>
                <b-form-checkbox value="b1-2">Brand 1 - store 2</b-form-checkbox>
                <b-form-checkbox value="b1-3">Brand 1 - store 3</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group>
                <b-form-checkbox value="b2-1">Brand 2 - store 1</b-form-checkbox>
                <b-form-checkbox value="b2-2">Brand 2 - store 2</b-form-checkbox>
                <b-form-checkbox value="b2-3">Brand 2 - store 3</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <b-row>
              <b-col class="mt-3">
                <button
                type="button"
                class="btn btn-primary pull-right px-4 d-md-none d-sm-block">
                Add Account
                </button>
                <button
                  type="button"
                  class="btn btn-primary pull-right px-4 d-md-none d-sm-block">
                  Reset Password
                </button>
                <b-button class="px-4 pull-left">Back</b-button>
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
  name: 'Promotion',
  data () {
    return {
      options: [
        { value: 'A', text: 'Option A' },
        { value: 'B', text: 'Option B' }
      ]
    }
  },
  methods: {
    formatNames(files) {
    if (files.length === 1) {
      return files[0].name
    } else {
      return '${files.length} files selected'
    }
    }
  }
}
</script>