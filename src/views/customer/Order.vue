<template>
    <div class="container">
      <b-card no-body>
      <b-card-body class="welcome-page">
         <b-row>
            <b-col class="text-center">
            <h5>Yêu cầu của bạn sẽ được gửi tới nhân viên nhà hàng</h5>
            </b-col>
         </b-row>
         <b-form @submit.prevent="send">
            <b-row>
            <b-col class="text-center">
               <b-form-textarea
               id="textarea"
               placeholder="Enter something..."
               rows="5"
            ></b-form-textarea>
            </b-col>
            </b-row>
            <b-row>
            <b-col cols="12" class="text-center mt-3">
               <button class="btn btn-primary px-4">
                  Gửi Yêu Cầu
               </button>
            </b-col>
            </b-row>
         </b-form>
      </b-card-body>
      </b-card>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    send () {
      this.$bvModal.msgBoxOk('Đăng ký tài khoản để tích điểm và nhận nhiều khuyến mãi từ nhà hàng', {
        title: 'Đặt món thành công!',
        buttonSize: 'sm',
        centered: true,
        footerClass: 'p-2'
      })
    }
  }
}
</script>