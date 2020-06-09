<template>
  <div class="backstage">
    <app-header></app-header>
    <div class="content">
      <Form class="con"
            ref="formInline"
            :model="formInline"
            :rules="ruleInline"
            inline>
        <div class="cons">
          <div class="left">
            <Divider orientation="left">基础信息</Divider>
            <FormItem prop="blog_name">
              <div class="item">
                <span>博客名称：</span>
                <Input maxlength="5"
                       v-model="formInline.blog_name"
                       show-word-limit
                       placeholder="请输入博客名称"
                       style="width:200px" />
              </div>
            </FormItem>
            <FormItem prop="blog_sign">
              <div class="item">
                <span>博客签名：</span>
                <Input maxlength="50"
                       v-model="formInline.blog_sign"
                       show-word-limit
                       type="textarea"
                       placeholder="请输入博客签名"
                       style="width:200px" />
              </div>
            </FormItem>
            <FormItem prop="author">
              <div class="item">
                <span>作者名称：</span>
                <Input maxlength="10"
                       v-model="formInline.author"
                       show-word-limit
                       placeholder="请输入作者名称"
                       style="width:200px" />
              </div>
            </FormItem>
            <FormItem prop="sign">
              <div class="item">
                <span>个性签名：</span>
                <Input maxlength="50"
                       v-model="formInline.sign"
                       show-word-limit
                       type="textarea"
                       placeholder="请输入个性签名"
                       style="width:200px" />
              </div>
            </FormItem>
            <FormItem prop="sign">
              <div class="item">
                <span>星座：</span>
                <Input maxlength="10"
                       v-model="formInline.constellation"
                       show-word-limit
                       placeholder="请输入星座"
                       style="width:200px" />
              </div>
            </FormItem>
          </div>
          <div class="right">
            <Divider orientation="left">图片设置</Divider>
            <FormItem prop="img_url">
              <div class="item">
                <div class="upload-img"
                     v-if="formInline.img_url">
                  <img :src="formInline.img_url" />
                </div>
                <div class="upload">
                  <input id="upload"
                         @change="uploadImgs('img', $event)"
                         class="upload-input"
                         type="file"
                         name="file"
                         accept="image"
                         ref="upload" />
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera"
                          size="20"></Icon>
                  </div>
                </div>
              </div>
            </FormItem>
            <Divider orientation="left">头部图片设置</Divider>
            <FormItem prop="header_url">
              <div class="item">
                <div class="upload-img"
                     v-if="formInline.header_url">
                  <img :src="formInline.header_url" />
                </div>
                <div class="upload">
                  <input id="upload"
                         @change="uploadImgs('header', $event)"
                         class="upload-input"
                         type="file"
                         name="file"
                         accept="image"
                         ref="upload" />
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera"
                          size="20"></Icon>
                  </div>
                </div>
              </div>
            </FormItem>
            <Divider orientation="left">作者图片设置</Divider>
            <FormItem prop="author_url">
              <div class="item">
                <div class="upload-img"
                     v-if="formInline.author_url">
                  <img :src="formInline.author_url" />
                </div>
                <div class="upload">
                  <input id="upload"
                         @change="uploadImgs('author', $event)"
                         class="upload-input"
                         type="file"
                         name="file"
                         accept="image"
                         ref="upload" />
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera"
                          size="20"></Icon>
                  </div>
                </div>
              </div>
            </FormItem>
          </div>
        </div>
        <Divider orientation="left">自我介绍</Divider>
        <FormItem prop="introduce">
          <mavon-editor id="edit"
                        v-model="formInline.introduces"
                        ref="md"
                        :toolbars="toolbars"
                        @imgAdd="handleEditorImgAdd"
                        @imgDel="handleEditorImgDel"
                        @change="changeMarkdown" />
        </FormItem>
      </Form>
      <div class="btn">
        <Button type="primary"
                @click="editInfo('formInline')">提交</Button>
        <Button @click="goBcak">取消</Button>
      </div>
    </div>
    <app-footer></app-footer>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { getInfo, editInfo, upload } from "@/api/http.js";
import header from "@/components/header/header";
import footer from "@/components/footer/footer";
export default {
  name: "manage",
  components: {
    "app-header": header,
    "app-footer": footer
  },
  data () {
    return {
      loadShow: true,
      formInline: {},
      ruleInline: {
        blog_name: [
          { required: true, message: "请输入博客名称", trigger: "blur" }
        ],
        blog_sign: [
          { required: true, message: "请输入博客签名", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" }
        ],
        sign: [{ required: true, message: "请输入个性签名", trigger: "blur" }],
        introduce: [
          { required: true, message: "请输入自我介绍", trigger: "blur" }
        ]
      },
      imgName: "",
      visible: false,
      imgtype: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  created () {
    this.uploadObj = {};
    this.getInfo();
  },
  mounted () {
  },
  methods: {
    goBcak () {
      this.$router.go(-1);
    },
    getInfo () {
      let obj = {
        user_art: sessionStorage.getItem("user_art"),
        token_art: sessionStorage.getItem("Access-Token")
      };
      getInfo(obj)
        .then(res => {
          if (res.data.code === 200) {
            this.formInline = res.data.result.length ? res.data.result[0] : {};
          } else {
            this.$toast(res.data.msg);
          }
        })
        .catch(data => {
          console.log(data);
        })
        .finally(() => {
          this.loadShow = false;
        });
    },
    editInfo (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let obj = {
            user_art: sessionStorage.getItem("user_art"),
            token_art: sessionStorage.getItem("Access-Token"),
            blog_name: this.formInline.blog_name,
            blog_sign: this.formInline.blog_sign,
            author: this.formInline.author,
            sign: this.formInline.sign,
            introduce: this.formInline.introduce,
            introduces: this.formInline.introduces,
            constellation: this.formInline.constellation,
            img_url: this.formInline.img_url,
            header_url: this.formInline.header_url,
            author_url: this.formInline.author_url
          };
          editInfo(obj).then(res => {
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
      });
    },
    uploadImgs (type, e) {
      let file = e.target.files || e.dataTransfer.files;
      if (!file.length) {
        return;
      }
      var picavalue = file[0];
      this.imgtype = type;
      this.imgPreview(picavalue);
    },
    imgPreview (file, callback) {
      const that = this;
      // 创建一个reader
      const reader = new FileReader();
      const img = new Image();

      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 读取成功后的回调
        reader.onloadend = function () {
          const result = this.result;
          const blob = that.dataURItoBlob(result);
          const formData = new FormData();
          formData.append("file", blob);
          // 发送请求
          upload(formData).then(res => {
            if (that.imgtype == "img") {
              that.formInline.img_url = res.data.path;
            }
            if (that.imgtype == "header") {
              that.formInline.header_url = res.data.path;
            }
            if (that.imgtype == "author") {
              that.formInline.author_url = res.data.path;
            }
            that.formInline = Object.assign({}, that.formInline);
          });
        };
        // 将图片转成base64格式
        reader.readAsDataURL(file);
      } else {
        this.$toast("请上传正确的图片格式");
      }
    },
    handleEditorImgAdd (pos, $file) {
      const blob = this.dataURItoBlob($file.miniurl);
      const formData = new FormData();
      formData.append("file", blob);
      // 发送请求
      upload(formData).then(res => {
        this.$refs.md.$img2Url(pos, res.data.path);
      });
    },
    handleEditorImgDel (pos) {
      delete this.imgFile[pos];
    },
    changeMarkdown (value, render) {
      this.formInline.introduce = render;
      this.formInline.introduces = value;
    },
    dataURItoBlob (base64Data) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.backstage {
  min-height: 100vh;
  .content {
    width: 880px;
    min-height: 450px;
    margin: 0 auto 20px;
    padding: 13px 10px;
    border: 10px solid #333;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    .con {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      .item {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        span {
          width: 80px;
          padding-right: 5px;
          text-align: right;
        }
      }
      .upload-img {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
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
        position: relative;
        background: #fff;
        border: 1px dashed #dcdee2;
        border-radius: 4px;
        text-align: center;
        overflow: hidden;
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
      }
    }
    .cons {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      .left {
        flex: 1;
      }
      .right {
        flex: 1;
        margin-left: 40px;
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
  }
  .footer {
    width: 880px;
    margin: auto;
  }
}
</style>
