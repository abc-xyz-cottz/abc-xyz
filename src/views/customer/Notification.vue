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

        <!-- Loading -->
        <span class="loading-more" v-show="loading"><icon name="loading" width="60" /></span>
        <span class="loading-more" v-if="hasNext === false">Hết</span>

      </b-card>

  </div>
</template>
<script>
import customerAPI from '@/api/customer'
import {Constant} from '@/common/constant'
import commonFunc from '@/common/commonFunc'

export default {
  components: {

  },
  data() {
    return {
      notifications: [],
      onLoad: false,
      offset: 0,
      hasNext: true,
      pageLimit: Constant.PAGE_LIMIT,
      loadByScroll: false,
      loading: false
    }
  },
  computed: {

  },
  activated () {
    this.mounted()
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)

    // Load order history
    this.loadNotification()

    // Update number of not read
    this.updateNotificationIsRead()
  },
  methods: {

    /**
   * Make toast without title
   */
    popToast(variant, content) {
      this.$bvToast.toast(content, {
        toastClass: 'my-toast',
        noCloseButton: true,
        variant: variant,
        autoHideDelay: 3000
      })
    },

    /**
     *  Processing on scroll: use for paging
     */
    onScroll (event) {
      if(this.onLoad) {
        return
      }
      event.preventDefault()
      var body = document.body
      var html = document.documentElement
      if (window.pageYOffset + window.innerHeight +1 > Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)) {
        if(this.hasNext) {
          this.offset = parseInt(this.offset) + parseInt(this.pageLimit)
          this.loadByScroll = true
          this.loadNotification ()
        }
      }
    },

      /**
     * Load notification
     */
      loadNotification() {
        if (this.onLoad) { return }
        this.onLoad = true
        this.loading = true

        let params = {
          "limit": this.pageLimit,
          "offset": this.offset
        }
        customerAPI.getNotification(params).then(res => {
          let notifications = res.data.data.notifications
          this.notifications.push.apply(this.notifications, notifications)

          // Check has next
          if(this.offset + this.pageLimit >= res.data.data.total_row) {
            this.hasNext = false
          }

          this.onLoad = false
          this.loading = false
        }).catch(err => {
          // Handle error
          let errorMess = commonFunc.handleCusError(err)
          this.popToast('danger', errorMess)
        })
      },

    /**
     * Update is read
     */
    updateNotificationIsRead() {
      customerAPI.updateNotificationIsRead().then(res => {
      }).catch(err => {
        console.log(err)
      })
    }
  }
  }
</script>
