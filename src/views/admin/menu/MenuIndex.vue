<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <b-row>
              <b-col cols="6">
                <b-button variant="secondary" class="pull-left px-4" @click="back">
                  Quay lại
                </b-button>
              </b-col>
              <b-col cols="6">
                <button class="btn btn-primary pull-right  px-4" @click="save" :disabled="saving">
                    Lưu
                </button>
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
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorName">
                    Đây là mục bắt buộc nhập
                  </b-form-invalid-feedback>
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
                  <b-form-invalid-feedback  class="invalid-feedback" :state="!errorPrice">
                    Đây là mục bắt buộc nhập
                  </b-form-invalid-feedback>
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
                </b-col>
                <b-col md="9">
                  <b-input-group @click="$refs.file.click()" append="Browse" class="pointer">
                    <b-input v-model="menu.image"></b-input>
                  </b-input-group>
                  <input class="d-none" type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload"/>
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
      styleImg: {},
      saving: false,
      click: false
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
    errorName: function () {
      return this.checkInfo(this.menu.name)
    },
    errorPrice: function () {
      return this.checkInfo(this.menu.price)
    },
  },
  methods: {
    checkInfo (info) {
      return (this.click && (info == null || info.length <= 0))
    },
    checkValidate () {
      return !(this.errorName || this.errorPrice)
    },

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
     * Handle upload file
     */
    handleFileUpload () { // event
      this.menu.imagePreview = null
      this.file = this.$refs.file.files[0]//event.target.files[0]
      this.menu.image = this.file.name

      // Render image in review
      let reader  = new FileReader ()
      reader.addEventListener("load", function () {
        // this.$refs.cropper.image = reader.result
        this.menu.imagePreview = reader.result
      }.bind(this), false)
      if( this.file ){
        reader.readAsDataURL( this.file )
        this.height = '300px'
        this.styleImg = {'max-width': '100%', 'max-height': '100%'}
      }
    },

    /**
     * Prepare info to save
     */
    save() {
      this.saving = true
      this.click = true
      let result = this.checkValidate()
      if(result) {
        if(this.menu.imagePreview) {
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

              this.doSave(formData);
            });
        } else {
          const formData = new FormData();
          formData.append("file", null)
          formData.append("name", this.menu.name)
          formData.append("price", this.menu.price)

          this.doSave(formData);
        }
      } else {
        this.saving = false
      }
    },

    /**
     * Call api, save data
     * @param formData
     */
    doSave(formData) {
      let menuId = this.$route.params.id
      if(menuId){
        // Edit
        formData.append("active", this.menu.active)
        formData.append("id", menuId)

        adminAPI.editMenu(formData).then(res => {
          this.saving = false
          if(res != null && res.data != null){
            // Show notify edit success
            this.popToast('success', 'Lưu menu thành công!!! ')
          }else{
            // Show notify edit fail
            this.popToast('danger', 'Lưu menu thất bại!!! ')
          }
        }).catch(err => {
          this.saving = false
          console.log(err)
          // Show notify edit fail
          this.popToast('danger', 'Lưu menu thất bại!!! ')
        })
      } else {
        // Add
        adminAPI.addMenu(formData).then(res => {
          this.saving = false
          if(res != null && res.data != null){
            // Go to list
            this.$router.push('/menu/list')
          }else{
            // Show notify add fail
            this.popToast('danger', 'Lưu menu thất bại!!! ')
          }
        }).catch(err => {
          this.saving = false
          console.log(err)
          // Show notify add fail
          this.popToast('danger', 'Lưu menu thất bại!!! ')
        })
      }
    },

    /**
     * Event crop image
     */
    cropImage() {
      // Use to check reupload image when edit
    },

    /**
     * Back to list
     */
    back() {
      // Go to list
      this.$router.push('/menu/list')
    }
  }
}
</script>
