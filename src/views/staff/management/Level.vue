<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Level Management</h3>
            </b-col>
            <b-col class="col-6">
              <button
                type="button"
                class="btn btn-primary pull-right">
                Add Level
              </button>
            </b-col>
          </b-row>
          <hr>
          <b-form
            method="POST"
            @submit.prevent="Add">
            <div class="form-row">
              <div class="form-group col-3">
                <label>Level Code</label>
                <input
                  id="code"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-3">
                <label>Level Name</label>
                <input
                  id="name"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-3">
                <label>Condition</label>
                <input
                  id="condition"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-3">
                <label></label>
                <b-form-select v-model="selected" :options="options" class="mb-3"></b-form-select>
              </div>
            </div>
          </b-form>
          <br>
          <h6>Level List</h6>
          <b-table
            hover
            bordered
            :fields="fields"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage">
            <template slot="actions">
              <b-list-group horizontal>
                <b-list-group-item v-b-tooltip.hover title="Edit"><i class="fa fa-edit"/></b-list-group-item>
                <b-list-group-item v-b-tooltip.hover title="Delete"><i class="fa fa-trash"/></b-list-group-item>
              </b-list-group>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            size="sm"
        ></b-pagination>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: 'LevelManagement',
  data () {
    return {
      selected: 'account',
      options: [
        {value: 'acount', text: 'point per account'},
        {value: 'month', text: 'point per month'},
        {value: 'year', text: 'point per year'}
      ],
      perPage: 2,
      currentPage: 1,
      fields: [
        {
            key: 'code',
            label: 'Level Code'
        },
        {
            key: 'name',
            label: 'Level Name'
        },
        {
            key: 'condition',
            label: 'Condition'
        },
        {
            key: 'status',
            label: 'Status'
        },
        {
            key: 'actions',
            class: 'actions-cell w-10',
            label: ''
        },
      ],
      items: [
        {code: '000000001', name: 'this is a most promo', condition: '10000 point per year', status: 'active', actions: ''},
        {code: '000000002', name: 'this is a most promo', condition: '10000 point per month', status: 'active', actions: ''},
        {code: '000000003', name: 'this is a most promo', condition: '10000 point per acount', status: 'active', actions: ''}
      ],
    }
  },
   computed: {
    rows () {
      return this.items.length
    }
  }
}
</script>
