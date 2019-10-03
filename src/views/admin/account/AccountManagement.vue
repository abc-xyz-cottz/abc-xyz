<template>
  <div class="container-fluid">
  <b-row>
    <b-col>
    <b-card>
      <b-row>
      <b-col class="col-6">
        <h3>Account Managerment</h3>
      </b-col>
      <b-col class="d-none d-md-block col-6">
        <button
        type="button"
        class="btn btn-primary pull-right px-4"
        @click.prevent="goToAddAccount"
        >
        Add Account
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
        <label>User Name</label>
        <input
          id="username"
          type="text"
          class="form-control"
          v-model="username"
        >
        <div class="invalid-feedback">
          This field is required.
        </div>
        </div>
        <div class="form-group col-md-6 col-sm-12">
        <label for="fullname">Full Name</label>
        <input
          id="fullname"
          type="text"
          class="form-control"
          v-model="fullname"
        >
        </div>
        <div class="form-group col-md-6 col-sm-12">
        <label for="role">Role</label>
        <b-form-select :options="optionsRole" class="mb-3" v-model="role"></b-form-select>          
        </div>
        <div class="form-group col-md-6 col-sm-12">
          <label>Store</label>
          <b-form-select :options="optionsStore" class="mb-3" v-model="store"></b-form-select>
        </div>
      </div>
      <hr>
      <button class="btn btn-primary pull-right px-4" @click.prevent="Search">
        Search
      </button>
      <button
        type="button"
        class="btn btn-primary pull-right px-4 d-md-none d-sm-block">
        Add Account
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
        <h4>Account List</h4>
      </b-col>
      </b-row>
      <b-row>
      <b-col>
        <b-table
        hover
        bordered
        stacked="md"
        :fields="fields"
        :items="items"
        :per-page="0"
        :current-page="currentPage"
        >
        <template v-slot:cell(full_name) = "full_name">
          <span v-html="full_name.value"></span>
        </template>
        <template v-slot:cell(actions) = "actions">
          <b-list-group horizontal > 
            <b-list-group-item v-b-tooltip.hover title="Edit"><a href="#/account-index"><i class="fa fa-edit"/></a></b-list-group-item>
            <b-list-group-item v-b-tooltip.hover title="Reset"><a href="#"><i class="fa fa-times"/></a></b-list-group-item>
            <b-list-group-item v-b-tooltip.hover title="Delete"><a href="#"><i class="fa fa-trash"/></a></b-list-group-item>
          </b-list-group>          
        </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          size="sm"
          @change="changePage"
      ></b-pagination>
      </b-col>
      </b-row>
    </b-card>
    </b-col>
  </b-row>
  </div>
</template>
<script>
import StaffAPI from '@/api/staff'
import Mapper from '@/common/mapper'

// Export default
export default {
  name: 'AccountManagement',
  data: function() {
    return {
      username: '',
      fullname: '',
      role: '',
      store: '',
      guestName: '',
      phone: '',
      email: '',
      code: '',
      level: '',
      getField: false,
      currentPage: 1,
      rows:1,
      totalPage: 1,
      perPage: 10,
      optionsRole: [],
      optionsStore: [],
      fields: [
        {
          key: 'id',
          label: 'ID',
          class: 'd-none'
        },
        {
          key: 'user_name',
          label: 'User name'
        },
        {
          key: 'full_name',
          label: 'Full name'
        },
        {
          key: 'role_name',
          label: 'Role'
        },
        {
          key: 'stores',
          label: 'Stores'
        },
        {
          key: 'actions',
          class: 'actions-cell',
          label: ''          
        },
      ],
      items: []
    }
  },
  mounted () {
    this.defineOptions();
  },
  methods: {
    Search () {
      var this_= this;
      let limit = 10
      let offset = 0
      if(this_.currentPage != 1) {
        offset= this_.currentPage*limit - limit
      }
      let params = "?user_name=" + this_.username + "&full_name=" + this_.fullname
      + "&role_id=" + this_.role + "&store_id=" + this_.store + "&limit=" + limit + "&offset=" + offset 
      StaffAPI.searchAccount(params).then(res => {
        if(res != null && res.data != null && res.data.data != null) {
          let staffs = res.data.data.staffs              
          this_.items = Mapper.mapStaffModelToDto(staffs)
          this_.rows = res.data.data.total_row          
        }
      }).catch(err => {
        console.log(err);
      })    
    },
    defineOptions() {
      StaffAPI.defineOptionsForSearchStaff().then(res => {
          if(res != null && res.data != null && res.data.data != null) {
              // Gen roles options
              let roles = res.data.data.roles.roles    
              let roleOptions = [{"value":'', "text": ''}] 
              for(var index in roles) {
                  var role = {}
                  role.value = roles[index].pk
                  role.text = roles[index].fields.name

                  roleOptions.push(role)
              }
              this.optionsRole = roleOptions              
              
              // Gen store option
              let stores = res.data.data.stores
              let storeOptions = [{"value":'', "text": ''}] 
              for(var index in stores) {
                  var store = {}
                  store.value = stores[index].pk
                  store.text = stores[index].fields.name

                  storeOptions.push(store)
              }
              this.optionsStore = storeOptions
          }
        }).catch(err => {
          console.log(err);
        })
    },
    changePage(currentPage) {
        var this_ = this
        this_.currentPage = currentPage
        this_.Search()     
        
    },
    goToAddAccount() {
      this.$router.push("/account-index")
    }
  }
}

</script>
