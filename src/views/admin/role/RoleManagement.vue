<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col class="col-6">
              <h3>Role Managerment</h3>
            </b-col>
            <b-col class="col-6">
              <button
                type="button"
                class="btn btn-primary pull-right px-4"
                @click.prevent="goToAddRole"
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
                <label>Role Name</label>
                <input
                  id="roleName"
                  type="text"
                  class="form-control"
                  v-model="roleName"
                >
              </div>
            </div>
            <hr>
            <button class="btn btn-primary pull-right px-4" @click.prevent="Search">
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
              <h4>Role List</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-table
                hover
                bordered
                :fields="fields"
                :items="items"
                :per-page="0"
                :current-page="currentPage"
              >
              <template v-slot:cell(actions)="dataId">
                <b-list-group horizontal >
                  <b-list-group-item v-b-tooltip.hover title="Edit" >
                    <a :href="`#/role-index/`" @click="goToRoleDetail(dataId.value)">
                      <i class="fa fa-edit"/>
                    </a>
                  </b-list-group-item>
                  <b-list-group-item v-b-tooltip.hover title="Delete">
                    <a :href="`#/role-index/`" @click="goToRoleDetail(dataId.value)">
                      <i class="fa fa-trash"/>
                    </a>
                  </b-list-group-item>
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
import RoleAPI from '@/api/admin'
import Mapper from '@/common/mapper'

export default {
    name: 'RoleManagement',
    data: function() {
        return {
            roleName: '',
            perPage: 10,
            currentPage: 1,
            rows:1,
            fields: [
                {
                    key: 'role',
                    label: 'Role'
                },
                {
                    key: 'member',
                    label: 'Member List'
                },
                {
                    key: 'actions',
                    class: 'actions-cell w-10',
                    label: ''
                },
            ],
            items: []
        }
    },
    computed: {
    },
    methods: {
      Search () {
        var this_= this;
        let limit = 10
        let offset = 0
        if(this_.currentPage != 1) {
          offset= this_.currentPage*limit - limit
        }
        let params = "?name=" + this_.roleName + "&limit=" + limit + "&offset=" + offset 
        RoleAPI.searchRole(params).then(res => {
          if(res != null && res.data != null && res.data.data != null) {
            let roles = res.data.data.roles  
            console.log(roles)            
            this_.items = Mapper.mapRoleModelToDto(roles)
            this_.rows = res.data.data.total_row          
          }
        }).catch(err => {
          console.log(err);
        })    
      },
      goToRoleDetail (roleid) {
        this.$router.push({params:{role_id:roleid}})
      },
      goToAddRole() {
        this.$router.push("/role-index")
      }
    }
}
</script>
