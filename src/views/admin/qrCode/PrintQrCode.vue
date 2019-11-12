<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <h2>LOGO: CusRes</h2>
            <h5>Ứng dụng đặt món tại bàn trực tuyến</h5>
            <hr/>
            <h4 class="text-center">
              Chào mừng tới cửa hàng {{storeName}}
            </h4>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p>Hướng dẫn sử dụng:</p>
            <p>1. Truy cập website cusres.vn</p>
            <p>2. Nhấn vào nút "Quét QR code"</p>
            <p>3. Quét QR code phía trên</p>
            <p>4. Chọn món hoặc gửi yêu cầu tới nhân viên trong màn hình hiện ra</p>
            <p>5. Chờ xác nhận từ bếp</p>
            <br/>
            <hr/>
            <p>* Đăng nhập tài khoản để tích điểm trong mỗi lần order, điểm này có thể mua nhiều khuyến mãi từ nhà hàng</p>


          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      storeName: "Abc xyz",
      options: [
        {value: '1', text: 'q1'},
        {value: '1', text: 'q2'}
      ]
    }
  },
  methods: {
    save () {
      
    }
  }
}
</script>
