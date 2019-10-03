<template>
  <div class="container-fluid">
  <b-row>
    <b-col>
    <b-card>
      <b-row>
        <b-col class="col-6">
          <h3>Dash Board</h3>
        </b-col>
      </b-row>
      <hr>
      <b-card
      header="System Log"
      header-tag="header"
      >
        <h6>HQ Log</h6>
        <b-table 
        hover
        bordered
        :fields="fields" 
        :items="items"
        >
        </b-table>
        <h6>Mobile Log</h6>
        <b-table 
        hover
        bordered
        :fields="mobileFields" 
        :items="mobileItems"
        >
        </b-table>
        <h6>System Setting Activities</h6>
        <b-table 
        hover
        bordered
        :fields="sysFields" 
        :items="sysItems"
        :per-page="perPage"
        :current-page="currentPage"
        >
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          size="sm"
      ></b-pagination>
      </b-card>
    </b-card>
    </b-col>
  </b-row>
  </div>
</template>
<script>
export default {
  name: 'DashBorad',
  data () {
    return {
      perPage: 2,
      currentPage: 1,
      fields: [
        {
          key: 'code',
          label: 'Code',
          formatter: 'fullname'
        },
        {
          key: 'guestName',
          label: 'Guest Name'
        },
        {
          key: 'phone',
          label: 'Phone'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'level',
          label: 'Level'
        }
      ],
      items: [
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        },
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        },
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        }
      ],
      // mobile log
      mobileFields: [
        {
          key: 'code',
          label: 'Code',
          formatter: 'fullname'
        },
        {
          key: 'guestName',
          label: 'Guest Name'
        },
        {
          key: 'phone',
          label: 'Phone'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'level',
          label: 'Level'
        }
      ],
      mobileItems: [
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        },
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        },
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        }
      ],
      // system setting activities
      sysFields: [
        {
          key: 'code',
          label: 'Code',
          formatter: 'fullname'
        },
        {
          key: 'guestName',
          label: 'Guest Name'
        },
        {
          key: 'phone',
          label: 'Phone'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'level',
          label: 'Level'
        }
      ],
      sysItems: [
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        },
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        },
        {
          code: '001', guestName: 'tantan', phone: '19001821', email: 'crm@fb', level: '1'
        }
      ]
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
}
</script>