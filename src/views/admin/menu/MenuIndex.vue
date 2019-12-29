<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-form @submit="save">
              <b-row class="form-row">
                <b-col md='12' class="text-right">
                  <b-button variant="primary" class="px-4" @click="crop">
                    Lưu
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md='12'>
                  <h4 class="mt-2">Menu</h4>
                </b-col>

              </b-row>

              <hr/>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Tên </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="name"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="menu.name">
                </b-col>
              </b-row>
              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Giá </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <input
                  id="price"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="menu.price">
                </b-col>
              </b-row>

              <b-row class="form-row" v-if="this.$route.params.id">
                <b-col md="3" class="mt-2">
                  <label> Trạng thái </label><span class="error-sybol"></span>
                </b-col>
                <b-col md="9">
                  <b-form-select
                  :options="options"      
                  id="status"
                  type="text"
                  autocomplete="new-password"
                  class="form-control"
                  v-model="menu.active"></b-form-select>
                </b-col>
              </b-row>

              <b-row class="form-row">
                <b-col md="3" class="mt-2">
                  <label> Hình ảnh </label>
                  <!--<span class="error-sybol"></span>-->
                </b-col>
                <b-col md="9">
                  <!--<b-form-file-->
                    <!--id="status"-->
                    <!--type="text"-->
                    <!--autocomplete="new-password"-->
                    <!--class="form-control"-->
                    <!--v-model="menu.image"-->
                    <!--ref="file"-->
                    <!--@change="handleFileUpload($event)">-->
                  <!--</b-form-file>-->
                  <b-input-group @click="$refs.file.click()" append="Browse" class="pointer">
                    <b-input v-model="menu.image"></b-input>
                  </b-input-group>
                  <input class="d-none" type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload($event)"/>
                </b-col>
              </b-row>

              <b-row class="form-row">
                <div v-if="menu.imagePreview" class="preview-box text-center"  :style="{height: computedWidth, width: '100%'}">
                    <vue-cropper
                      ref="cropper"
                      :guides="true"
                      :view-mode="2"
                      :center="true"
                      drag-mode="crop"
                      :auto-crop-area="1"
                      :background="true"
                      :rotatable="true"
                      :src="menu.imagePreview"
                      :initialAspectRatio="1/1"
                      :aspectRatio="1/1"
                      alt="Source Image"
                      :style="computedImg"
                      :crop="cropImage"
                    >
                    </vue-cropper>
                </div>
              </b-row>


            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import adminAPI from '@/api/admin'
import Mapper from '@/mapper/menu'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'


export default {
  components: {
    VueCropper
  },
  data () {
    return {
      options: [
        {value: 'true', text: 'Mở'},
        {value: 'false', text: 'Đóng'}
      ],
      menu: {
        "id": null,
        "name": null,
        "price": null,
        "active": null,
        "image": null,
        imagePreview: null,
      },
      file: null,
      height: '100px',
      styleImg: {}
    }
  },
  mounted() {
    this.getMenuDetail()
  },
  computed: {
    computedWidth() {
      return this.height
    },
    computedImg() {
      return this.styleImg
    },
  },
  methods: {
    /**
     * Get menu detail
     */
    getMenuDetail() {
      let menuId = this.$route.params.id
      if(menuId){
        adminAPI.getMenuDetail(menuId).then(res => {
          this.menu = Mapper.mapMenuDetailModelToDto(res.data.data)
          this.file = this.menu.imagePreview
        }).catch(err => {
          console.log(err)
        })
      }
    },

    /**
     * Save
     */
    save() {
      let menuId = this.$route.params.id
      if(menuId){
        // Edit
        adminAPI.editMenu(this.menu).then(res => {
          if(res != null && res.data != null){
            // Show notify edit success: TODO
            alert("ok")
          }else{
            // Show notify edit fail: TODO
            alert("fail")
          }
        }).catch(err => {
          console.log(err)
          // Show notify edit fail: TODO
          alert("fail")
        })
      } else {
        // Add
        this.menu.image = "abc.jpg"
        adminAPI.addMenu(this.menu).then(res => {
          if(res != null && res.data != null){
            // Go to list
            this.$router.push('/menu/list')
          }else{
            // Show notify add fail: TODO
            alert("add fail")
          }
        }).catch(err => {
          console.log(err)
          // Show notify add fail: TODO
          alert("add fail")
        })
      }
    },

    /**
     * Handle upload file
     */
    handleFileUpload (event) {
      this.file = event.target.files[0] //this.$refs.file.files[0]
      this.menu.image = this.file.name

      // Render image in review
      let reader  = new FileReader ()
      reader.addEventListener("load", function () {
        this.$refs.cropper.image = reader.result
        this.menu.imagePreview = reader.result
      }.bind(this), false)
      if( this.file ){
        reader.readAsDataURL( this.file )
        this.height = '300px'
        this.styleImg = {'max-width': '100%', 'max-height': '100%'}
      }
    },

    crop() {
      this.$refs.cropper
        .getCroppedCanvas({
          width: 300,
          height: 300
        })
        .toBlob(blob => {
          const formData = new FormData();
          formData.append("file", blob, this.menu.image)
          formData.append("name", this.menu.name)
          formData.append("price", this.menu.price)
          this.uploadImage(formData);
        });
    },
    uploadImage(formData) {
      let menuId = this.$route.params.id
      if(menuId){
        // Edit
        adminAPI.editMenu(formData).then(res => {
          if(res != null && res.data != null){
            // Show notify edit success: TODO
            alert("ok")
          }else{
            // Show notify edit fail: TODO
            alert("fail")
          }
        }).catch(err => {
          console.log(err)
          // Show notify edit fail: TODO
          alert("fail")
        })
      } else {
        // Add
        adminAPI.addMenu(formData).then(res => {
          if(res != null && res.data != null){
            // Go to list
            this.$router.push('/menu/list')
          }else{
            // Show notify add fail: TODO
            alert("add fail")
          }
        }).catch(err => {
          console.log(err)
          // Show notify add fail: TODO
          alert("add fail")
        })
      }
    },

    cropImage() {
      alert("crop")
    }


  }
}
</script>
