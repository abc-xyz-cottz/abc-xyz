<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Brand</h3>
            </b-col>
            <b-col class="col-6">
              <button
                type="button"
                class="btn btn-primary pull-right px-4"
              >
                Add Brand
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
                <label>Brand Name</label>
                <input
                  id="username"
                  type="text"
                  class="form-control"
                >
                <div class="invalid-feedback">
                  This field is required.
                </div>
              </div>
              <div class="form-group col-md-6 col-sm-12">
                <label>Store Name</label>
                <input
                  id="fullname"
                  type="text"
                  class="form-control"
                >
              </div>
            </div>
          </b-form>
          <b-row>
              <b-col class="mt-3">
              <b-button class="px-4">Back</b-button>
              <button
                type="button"
                class="btn btn-danger pull-right px-4">
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
    name: 'Brand',
    data () {
        return {
        }
    }
}
</script>