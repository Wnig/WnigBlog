<template>
  <div class="backstage ignore">
    <app-header></app-header>
    <div class="content">
      <div class="article-con">
        <div class="tit">{{ $route.query.id ? "编辑" : "写文章" }}</div>
        <div class="art-con">
          <Input
            placeholder="请输入标题"
            v-model="articleObj.tit_art"
            maxlength="50"
          />
          <mavon-editor
            id="edit"
            v-model="articleObj.cons_art"
            ref="md"
            :toolbars="toolbars"
            @imgAdd="handleEditorImgAdd"
            @imgDel="handleEditorImgDel"
            @change="changeMarkdown"
          />
          <div class="control-btn">
            <Select style="width:180px" v-model="articleObj.type_art">
              <Option
                v-for="item in classList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
            <Button type="primary" @click="publish(1)">发表</Button>
            <Button @click="publish(2)">保存草稿</Button>
            <Button @click="goBcak">取消</Button>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { artDetail, write, artEdit, upload } from "@/api/http.js";
import header from "@/components/header/header";
import footer from "@/components/footer/footer";
export default {
  name: "manage",
  components: {
    "app-header": header,
    "app-footer": footer
  },
  data() {
    return {
      loadShow: false,
      selIndex: 1,
      getTimeArr: [],
      alarmTime: null,
      week: 0,
      classList: [
        {
          value: "1",
          label: "我的日常"
        },
        {
          value: "2",
          label: "学习与积累"
        },
        {
          value: "3",
          label: "专业技术问题"
        }
      ],
      articleObj: {
        type_art: "1",
        con_art: "",
        cons_art: "",
        tit_art: ""
      },
      status_art: 1,
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
  created() {},
  mounted() {
    this.status_art = this.$route.query.status || 1;
    if (this.$route.query.id) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      let obj = {
        id_art: this.$route.query.id,
        status_art: this.status_art
      };
      artDetail(obj).then(res => {
        if (res.data.code === 200) {
          this.articleObj = res.data.result;
        }
      });
    },
    publish(status) {
      if (!this.articleObj.tit_art) {
        this.$toast("请填写标题");
        return;
      }
      if (!this.articleObj.con_art) {
        this.$toast("请填写内容");
        return;
      }
      if (this.$route.query.id) {
        let obj = {
          id_art: this.$route.query.id,
          tit_art: this.articleObj.tit_art,
          con_art: this.articleObj.con_art,
          cons_art: this.articleObj.cons_art,
          con_txt_art: this.articleObj.con_txt_art,
          type_art: this.articleObj.type_art,
          status_art: status
        };
        artEdit(obj).then(res => {
          if (res.data.code === 200) {
            this.$toast("操作成功~");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        });
      } else {
        let obj = {
          tit_art: this.articleObj.tit_art,
          con_art: this.articleObj.con_art,
          cons_art: this.articleObj.cons_art,
          con_txt_art: this.articleObj.con_txt_art,
          type_art: this.articleObj.type_art,
          status_art: status,
          user_art: sessionStorage.getItem("user_art"),
          read_art: 0
        };
        write(obj).then(res => {
          if (res.data.code === 200) {
            this.$toast("操作成功~");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        });
      }
    },
    goBcak() {
      this.$router.go(-1);
    },
    handleEditorImgAdd(pos, $file) {
      const blob = this.dataURItoBlob($file.miniurl);
      const formData = new FormData();
      formData.append("file", blob);
      // 发送请求
      upload(formData).then(res => {
        this.$refs.md.$img2Url(pos, res.data.path);
      });
    },
    handleEditorImgDel(pos) {
      delete this.imgFile[pos];
    },
    changeMarkdown(value, render) {
      this.articleObj.con_art = render;
      this.articleObj.cons_art = value;
      this.articleObj.con_txt_art = document.querySelector(
        ".v-show-content"
      ).innerText;
      this.articleObj = Object.assign({}, this.articleObj);
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.backstage.ignore {
  min-height: 100vh;
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 880px;
    min-height: 450px;
    margin: 0 auto 20px;
    padding: 13px 10px;
    border: 10px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    .article-con {
      position: relative;
      width: 100%;
      border-radius: 4px;
      .tit {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 20px;
        padding: 5px 20px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        border-left: 3px solid rgba(255, 255, 255, 0.1);
      }
      .art-con {
        #edit {
          margin: 20px 0;
        }
        .control-btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          button {
            margin: 0 10px;
          }
          .ivu-select-dropdown {
            z-index: 99999;
          }
        }
      }
    }
  }
  .footer {
    width: 880px;
    margin: auto;
  }
}
</style>
<style lang="scss">
.control-btn {
  .ivu-select-dropdown {
    z-index: 99999;
  }
}
</style>
