<template>
  <div class="blog ignore">
    <app-header></app-header>
    <div class="blog-con">
      <Divider orientation="left">{{
        photo_id_art ? "编辑图片" : "上传图片"
      }}</Divider>
      <Form
        class="con"
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        inline
      >
        <FormItem prop="photo_url">
          <div class="item">
            <input
              id="upload"
              @change="uploadImgs"
              class="upload-input"
              type="file"
              name="file"
              accept="image"
              ref="upload"
            />
            <div class="upload-img" v-if="formInline.photo_url">
              <img :src="formInline.photo_url" />
            </div>
            <div class="upload" v-else>
              <div class="upload-input-camera">
                <Icon type="ios-camera" size="40"></Icon>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="photo_con">
          <div class="item">
            <Input
              maxlength="100"
              v-model="formInline.photo_con"
              show-word-limit
              type="textarea"
              placeholder="请输入图片介绍"
              style="width:200px"
            />
          </div>
        </FormItem>
      </Form>
      <div class="btn">
        <Button type="primary" @click="editInfo('formInline')">提交</Button>
        <Button @click="goBack">取消</Button>
      </div>
    </div>
    <app-footer></app-footer>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { upload, addPhoto, editPhotoInfo, photoInfo } from "@/api/http.js";
import header from "@/components/header/header";
import footer from "@/components/footer/footer";
export default {
  name: "blog",
  components: {
    "app-header": header,
    "app-footer": footer
  },
  data() {
    return {
      loadShow: false,
      imgName: "",
      visible: false,
      formInline: {},
      ruleInline: {
        photo_url: [
          { required: true, message: "请输入上传图片", trigger: "blur" }
        ],
        photo_con: [
          { required: true, message: "请输入图片介绍", trigger: "blur" }
        ]
      },
      photo_id_art: ""
    };
  },
  created() {
    if (this.$route.query.id) {
      this.photo_id_art = this.$route.query.id;
      this.getPhotoInfo();
    }
  },
  methods: {
    getPhotoInfo() {
      let obj = {
        photo_id_art: this.$route.query.id,
        user_art: sessionStorage.getItem("user_art")
      };
      photoInfo(obj).then(res => {
        if (res.data.code === 200) {
          this.formInline = res.data.result[0];
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    uploadImgs(e) {
      let file = e.target.files || e.dataTransfer.files;
      if (!file.length) {
        return;
      }
      var picavalue = file[0];
      this.imgPreview(picavalue);
    },
    imgPreview(file, callback) {
      const that = this;
      // 创建一个reader
      const reader = new FileReader();
      const img = new Image();

      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 读取成功后的回调
        reader.onloadend = function() {
          const result = this.result;
          const blob = that.dataURItoBlob(result);
          const formData = new FormData();
          formData.append("file", blob);
          // 发送请求
          upload(formData).then(res => {
            that.formInline.photo_url = res.data.path;
            that.formInline = Object.assign({}, that.formInline);
          });
        };
        // 将图片转成base64格式
        reader.readAsDataURL(file);
      } else {
        this.$toast("请上传正确的图片格式");
      }
    },
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(base64Data.split(",")[1]);
      } else {
        byteString = unescape(base64Data.split(",")[1]);
      }
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    editInfo(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.$route.query.id) {
            let obj = {
              photo_id_art: this.$route.query.id,
              user_art: sessionStorage.getItem("user_art"),
              photo_url: this.formInline.photo_url,
              photo_con: this.formInline.photo_con
            };
            editPhotoInfo(obj).then(res => {
              if (res.data.code === 200) {
                this.$toast(res.data.msg);
                setTimeout(() => {
                  this.$router.go(-1);
                }, 2000);
              } else {
                this.$toast(res.data.msg);
              }
            });
          } else {
            let obj = {
              user_art: sessionStorage.getItem("user_art"),
              photo_url: this.formInline.photo_url,
              photo_con: this.formInline.photo_con
            };
            addPhoto(obj).then(res => {
              if (res.data.code === 200) {
                this.$toast(res.data.msg);
                setTimeout(() => {
                  this.$router.go(-1);
                }, 2000);
              } else {
                this.$toast(res.data.msg);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.blog.ignore {
  min-height: 100vh;
  .blog-con {
    width: 880px;
    padding: 10px 0;
    margin: 0 auto 20px;
    border: 10px solid #333;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    .con {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .upload-input {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 0 auto;
      z-index: 10;
      opacity: 0;
      cursor: pointer;
    }
    .upload-img {
      display: inline-block;
      width: 150px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      margin-right: 4px;
      img {
        object-fit: fill;
        width: 100%;
      }
    }
    .upload {
      background: #fff;
      border: 1px dashed #dcdee2;
      border-radius: 4px;
      text-align: center;
      overflow: hidden;
      .upload-input-camera {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 150px;
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    button {
      margin: 0 5px;
    }
  }
  .footer {
    width: 880px;
    margin: auto;
  }
}
</style>
