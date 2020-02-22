<template>
  <div class="container">

      <b-card no-body  v-for="(item, index) in notifications" :key="item.title + index">
        <b-card-body>
          <b-row class="mess">
            <h5 class="col-12 text-warning">{{item.title}}</h5>
            <p v-if="!item.readMoreFlag">{{item.content.slice(0, 200)}}   </p>
            <a class="text-primary" v-if="!item.readMoreFlag" @click="readMore(item.stt)" href="#">
            Đọc thêm...
            </a>
            <p v-if="item.readMoreFlag" v-html="item.content"></p>
            <p class="col-12 text-right" >{{item.created_date}}</p>
          </b-row>
        </b-card-body>
      </b-card>

    <!-- Loading -->
    <span class="loading-more" v-show="loading"><icon name="loading" width="60" /></span>
    <span class="loading-more" v-if="hasNext === false">Hết</span>

  </div>
</template>
<script>
import customerAPI from '@/api/customer'
import {Constant} from '@/common/constant'
import commonFunc from '@/common/commonFunc'
import Mapper from '@/mapper/customer'

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
          let notifications = Mapper.mapNotificationModelToDto(res.data.data.notifications)
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
        console.log("updated")
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * Read more
     */
    readMore(index) {
      this.notifications[index].readMoreFlag = true
    }
  }
  }
</script>
