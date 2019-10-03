<template>
  <div>
    <b-table :fields="fields" :items="items">
      <template v-slot:cell(name)="fds">
        <!-- `data.value` is the value after formatted by the Formatter -->
        ádsads
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'name',
            label: 'Full Name'
          },
          // A regular column
          'age',
          {
            // A regular column with custom formatter
            key: 'sex',
            formatter: value => {
              return value.charAt(0).toUpperCase()
            }
          },
          {
            // A virtual column with custom formatter
            key: 'birthYear',
            label: 'Calculated Birth Year',
            formatter: (value, key, item) => {
              return new Date().getFullYear() - item.age
            }
          }
        ],
        items: [
          { name: 'Doe', sex: 'Male', age: 42 }
        ]
      }
    },
    methods: {
    }
  }
</script>