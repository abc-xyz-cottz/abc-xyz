<template>
  <div class="container-fluid">
  <b-row>
    <b-col>
    <b-card>
      <b-row>
      <b-col class="col-6">
        <h3>Store Managerment</h3>
      </b-col>
      <b-col class="col-6">
        <button
        type="button"
        class="btn btn-primary pull-right ml-3 px-4"
        >
        Add Store
        </button>
        <button
        type="button"
        class="btn btn-primary pull-right px-4 ml-3"
        >
        Add Brand
        </button>
        <button
        type="button"
        class="btn btn-primary pull-right px-4"
        >
        Add Location
        </button>
      </b-col>
      </b-row>
      <hr>
      <b-form
      method="GET"
      @submit.prevent="search"
      >
      <div class="form-row">
        <div class="form-group col-md-4">
          <label>Brand Name</label>
          <input
            id="username"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group col-md-4">
          <label>Location</label>
          <input
            id="location"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group col-md-4">
          <label for="fullname">Store Name</label>
          <input
            id="fullname"
            type="text"
            class="form-control"
          >
        </div>
      </div>
      <hr>
      <button class="btn btn-primary pull-right px-4">
        Search
      </button>
      </b-form>
    </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-card>
        <b-row>
          <b-col>
            <h4>Location List</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
            hover
            bordered
            :fields="fieldsLocation"
            :items="itemsLocation"
            :per-page="perPage"
            :current-page="currentPageLocation"
            >
            <template slot="actions">
              <b-list-group horizontal>
                <b-list-group-item v-b-tooltip.hover title="Edit"><i class="fa fa-edit"/></b-list-group-item>
                <b-list-group-item v-b-tooltip.hover title="Delete"><i class="fa fa-trash"/></b-list-group-item>
              </b-list-group>
            </template>
            </b-table>
            <b-pagination
            v-model="currentPageLocation"
            :total-rows="rowsPageLocation"
            :per-page="perPage"
            aria-controls="my-table"
            size="sm"
          ></b-pagination>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h4>Brand List</h4>
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
            :current-page="currentPageBrand"
            >
            <template slot="actions">
              <b-list-group horizontal>
                <b-list-group-item v-b-tooltip.hover title="Edit"><i class="fa fa-edit"/></b-list-group-item>
                <b-list-group-item v-b-tooltip.hover title="Delete"><i class="fa fa-trash"/></b-list-group-item>
              </b-list-group>
            </template>
            </b-table>
            <b-pagination
            v-model="currentPageBrand"
            :total-rows="rowsPageBrand"
            :per-page="perPage"
            aria-controls="my-table"
            size="sm"
          ></b-pagination>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h4>Store List</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
            hover
            bordered
            :fields="storeFields"
            :items="storeItems"
            :per-page="perPage"
            :current-page="currentPageStore"
            >
            <template slot="actions">
              <b-list-group horizontal>
                <b-list-group-item v-b-tooltip.hover title="Edit"><i class="fa fa-edit"/></b-list-group-item>
                <b-list-group-item v-b-tooltip.hover title="Delete"><i class="fa fa-trash"/></b-list-group-item>
              </b-list-group>
            </template>
            </b-table>
            <b-pagination
            v-model="currentPageStore"
            :total-rows="rowsPageStore"
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
  name: 'StoreManagement',
  data () {
    return {
      perPage: 2,
      currentPageLocation: 1,
      currentPageStore: 1,
      currentPageBrand: 1,
      // table location
      fieldsLocation: [
        {
          key: 'code',
          label: 'Location Code'
        },
        {
          key: 'name',
          label: 'Location Name'
        },
        {
          key: 'actions',
          class: 'actions-cell w-10',
          label: ''
        }
      ],
      itemsLocation: [
        {code: 'NEC-01', name: 'NEC ltd,Co', actions: ''},
        {code: 'NEC-01', name: 'NEC ltd,Co', actions: ''},
        {code: 'NEC-01', name: 'NEC ltd,Co', actions: ''}
      ],
      fields: [
        {
          key: 'code',
          label: 'Brand Code'
        },
        {
          key: 'name',
          label: 'Brand Name'
        },
        {
          key: 'actions',
          class: 'actions-cell w-10',
          label: ''
        }
      ],
      items: [
        {code: '001', name: 'Cocacola', actions: ''},
        {code: '001', name: 'Pessi', actions: ''},
        {code: '001', name: 'Coconut', actions: ''}
      ],
      // table store list
      storeFields: [
        {
          key: 'code',
          label: 'Brand Code'
        },
        {
          key: 'name',
          label: 'Brand Name'
        },
        {
          key: 'storeCode',
          label: 'Store Code'
        },
        {
          key: 'storeName',
          label: 'Store Name'
        },
        {
          key: 'storeIP',
          label: 'Store IP'
        },
        {
          key: 'storeInfo',
          label: 'Store Info'
        },
        {
          key: 'actions',
          class: 'actions-cell w-10',
          label: ''
        },
      ],
      storeItems: [
        {code: '001', name: 'Cocacola', storeCode: 'S001', storeName: 'ST1', storeIP: '10.0.1.10', storeInfo: 'Address, Phone', actions: ''},
        {code: '002', name: 'Cocacola', storeCode: 'S002', storeName: 'ST2', storeIP: '10.0.1.12', storeInfo: 'Address, Phone', actions: ''},
        {code: '003', name: 'Cocacola', storeCode: 'S003', storeName: 'ST3', storeIP: '10.0.1.14', storeInfo: 'Address, Phone', actions: ''}
      ]
    }
  },
  computed: {
    rowsPageBrand () {
      return this.items.length
    },
    rowsPageStore () {
      return this.storeItems.length
    },
    rowsPageLocation () {
      return this.itemsLocation.length
    }
  }
}
</script>
