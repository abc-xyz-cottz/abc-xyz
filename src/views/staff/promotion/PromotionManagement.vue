<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Promotion Management</h3>
            </b-col>
            <b-col class="col-6">
              <button
                type="button"
                class="btn btn-primary pull-right">
                Add Promotion
              </button>
            </b-col>
          </b-row>
          <hr>
          <b-form
            method="POST"
            @submit.prevent="Add">
            <div class="form-row">
              <div class="form-group col-4">
                <label>{{ $t("promoManagrment.label.code") }}</label>
                <input
                  id="code"
                  type="text"
                  class="form-control">
                <div class="invalid-feedback">
                  This field is required.
                </div>
              </div>
              <div class="form-group col-4">
                <label>{{ $t("promoManagrment.label.name") }}</label>
                <input
                  id="name"
                  type="text"
                  class="form-control"
                >
              </div>
              <div class="form-group col-4 inline">
                <label class="d-block">{{ $t("promoManagrment.label.expiredDate") }}</label>
                <b-row class="text-center">
                    <b-col class="col-5">
                        <input
                        id="from"
                        type="text"
                        class="form-control"
                        >
                    </b-col>
                    <div class="col-2"> ~ </div>
                    <b-col class="col-5">
                        <input
                        id="to"
                        type="text"
                        class="form-control"
                        >
                    </b-col>
                </b-row>
              </div>
              <div class="form-group col-4">
                <label>{{ $t("promoManagrment.label.type") }}</label>
                <b-form-select :options="options" class="mb-3"></b-form-select>
              </div>
              <div class="form-group col-4">
                <label>{{ $t("promoManagrment.label.apply") }}</label>
                <b-form-select :options="options" class="mb-3"></b-form-select>
              </div>
              <div class="form-group col-4 d-none">
                <label>{{ $t("promoManagrment.label.promoBy") }}</label>
                <b-form-select :options="options" class="mb-3"></b-form-select>
              </div>
              <div class="form-group col-12">
                <label>{{ $t("promoManagrment.label.info") }}</label>
                <input
                  id="info"
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
              <h4>Promotion List</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-table
                hover
                bordered
                :fields="fields"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
              >
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
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
    name: 'PromotionManageent',
  data: function() {
    return {
      perPage: 2,
      currentPage: 1,
      fields: [
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'info',
            label: 'Info'
        },
        {
            key: 'expired',
            label: 'Expired'
        },
        {
            key: 'quantity',
            label: 'Quantity'
        },
        {
            key: 'available',
            label: 'Available'
        },
        {
            key: 'point',
            label: 'Point'
        },
        {
            key: 'actions',
            class: 'actions-cell w-10',
            label: ''
        },
      ],
      items: [
        {name: 'P_lala', info: 'this is a most promo', expired: '20191010', quantity: 'gold', available: 'y', point: '5000', actions: ''},
        {name: 'P_lala2', info: 'this is a most promo', expired: '20191010', quantity: 'gold', available: 'y', point: '5000', actions: ''},
        {name: 'P_lala3', info: 'this is a most promo', expired: '20191010', quantity: 'gold', available: 'y', point: '5000', actions: ''}
      ],
      options: [
        { value: 'A', text: 'Option A' },
        { value: 'B', text: 'Option B' }
      ]
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  methods: {
  }
}
</script>
