<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container">

      <b-card no-body>
        <b-card-body>

          <div  v-for="(item, index) in notifications" :key="item.fields.title + index">
              <b-row class="border border-dark mt-4 mess">
                <h4 class="col-12">{{item.fields.title}}</h4>
                <p class="col-12" >{{item.fields.content}}</p>
              </b-row>
          </div>

        </b-card-body>
      </b-card>

  </div>
</template>
<script>
import customerAPI from '@/api/customer'

export default {
  components: {

  },
    data() {
      return {
        notifications: []
      }
    },
    computed: {

    },
  activated () {
    this.mounted()
  },
    mounted() {

      // Load order history
      this.loadNotification()
    },
    methods: {
      /**
     * Load notification
     */
      loadNotification() {

        customerAPI.getNotification().then(res => {
          // Load orders created
          console.log(res.data.data)
          let notifications = res.data.data
          // this.notifications.push(notifications)
          this.notifications.push.apply(this.notifications, notifications)
          console.log(this.notifications)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
