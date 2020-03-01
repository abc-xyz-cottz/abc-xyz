<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Store</h3>
            </b-col>
            <b-col class="col-6">
              <button
                type="button"
                class="btn btn-primary pull-right px-4">
                Add Store
              </button>
            </b-col>
          </b-row>
          <hr>
          <b-form
            method="GET"
            @submit.prevent="addStore">
            <div class="form-row">
              <div class="form-group col-4">
                <label for="code">Store Code</label>
                <input
                  id="code"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-4">
                <label for="name">Store Name</label>
                <input
                  id="name"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-4">
                <label>{{ $t("promoManagrment.label.brand") }}</label>
                <b-form-select :options="options"></b-form-select>
              </div>
              <div class="form-group col-4">
                <label>Location</label>
                <b-form-select :options="options"></b-form-select>
              </div>
              <div class="form-group col-4">
                <label>Latitude</label>
                <input
                  id=""
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-4">
                <label>Longitude</label>
                <input
                  id=""
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-4">
                <label>Host</label>
                <div class="input-group">
                  <input type="text" class="form-control w-70">
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="form-group col-4">
                <label>Account</label>
                <div class="input-group">
                  <input type="text" class="form-control">
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="form-group col-4">
                <label>Schema</label>
                <input
                  id=""
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-12">
                <label>Store Info</label>
                <b-form-textarea
                  id="textarea"
                  placeholder="Enter something..."
                  rows="2"
                ></b-form-textarea>
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
    name: 'StoreIndex',
    data () {
        return {
            options: [
                { value: 'A', text: 'Option A' },
                { value: 'B', text: 'Option B' }
            ]
        }
    }
}
</script>
