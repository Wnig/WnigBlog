<template>
  <div class="backstage ignore">
    <app-header></app-header>
    <div class="content">
      <div class="article-con" v-if="Object.keys(detail).length">
        <h1 class="my-tit">
          <p @click="goBack">
            <Icon type="ios-arrow-back" size="16" />
            <strong>返回</strong>
          </p>
          <span>{{ status_art | statusFilter }}</span>
        </h1>
        <div class="control-menu">
          <p class="inf-left">
            <span
              @click="controlArticle(1)"
              v-if="status_art == 1 || status_art == 2"
              >编辑</span
            >
            <span
              @click="controlArticle(2)"
              v-if="status_art == 1 || status_art == 2"
              >删除</span
            >
            <span @click="controlArticle(3)" v-if="status_art == 2">发表</span>
            <span @click="controlArticle(4)" v-if="status_art == 3"
              >彻底删除</span
            >
            <span @click="controlArticle(5)" v-if="status_art == 3"
              >撤销删除</span
            >
          </p>
          <p class="inf-right">
            <span class="pre" @click="enterDetail(pageObj.preObj)"
              >上一篇：{{
                pageObj.preObj ? pageObj.preObj.tit_art : "没有了~"
              }}</span
            >
            <span class="next" @click="enterDetail(pageObj.nextObj)"
              >下一篇：{{
                pageObj.nextObj ? pageObj.nextObj.tit_art : "没有了~"
              }}</span
            >
          </p>
        </div>
        <div class="art-con">
          <div class="tit">
            <h2>{{ detail.tit_art }}</h2>
            <p class="info">
              <span>【{{ detail.type_art | typeFilter }}】</span>
              <span>Wnig</span>
              <span>阅读次数：{{ detail.read_art }}</span>
              <span>创建时间：{{ detail.time_art }}</span>
              <span>修改时间：{{ detail.update_time_art }}</span>
            </p>
          </div>
          <div class="con markdown-body" v-html="detail.con_art"></div>
        </div>
        <div class="control-menu">
          <p class="inf-left">
            <span
              @click="controlArticle(1)"
              v-if="status_art == 1 || status_art == 2"
              >编辑</span
            >
            <span
              @click="controlArticle(2)"
              v-if="status_art == 1 || status_art == 2"
              >删除</span
            >
            <span @click="controlArticle(3)" v-if="status_art == 2">发表</span>
            <span @click="controlArticle(4)" v-if="status_art == 3"
              >彻底删除</span
            >
            <span @click="controlArticle(5)" v-if="status_art == 3"
              >撤销删除</span
            >
          </p>
          <p class="inf-right">
            <span class="pre" @click="enterDetail(pageObj.preObj)"
              >上一篇：{{
                pageObj.preObj ? pageObj.preObj.tit_art : "没有了~"
              }}</span
            >
            <span class="next" @click="enterDetail(pageObj.nextObj)"
              >下一篇：{{
                pageObj.nextObj ? pageObj.nextObj.tit_art : "没有了~"
              }}</span
            >
          </p>
        </div>
      </div>
      <div v-else class="no-data">~暂无数据~</div>
    </div>
    <app-footer></app-footer>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { artDetail, recycl, recyclDel, artEdit } from "@/api/http.js";
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
      loadShow: true,
      classList: [
        {
          value: 0,
          label: "全部文章"
        },
        {
          value: 1,
          label: "我的日常"
        },
        {
          value: 2,
          label: "学习与积累"
        },
        {
          value: 3,
          label: "专业技术问题"
        }
      ],
      detail: {},
      status_art: 1,
      pageObj: {}
    };
  },
  filters: {
    typeFilter(status) {
      const statusMap = {
        "1": "我的日常",
        "2": "学习与积累",
        "3": "专业技术问题"
      };
      return statusMap[status];
    },
    statusFilter(status) {
      const statusMap = {
        "1": "我的文章",
        "2": "草稿箱",
        "3": "回收站"
      };
      return statusMap[status];
    }
  },
  created() {
    this.status_art = this.$route.query.status || 0;
    this.getArtDetail();
  },
  mounted() {},
  methods: {
    getArtDetail() {
      let obj = {
        id_art: this.$route.query.id,
        status_art: this.status_art
      };
      artDetail(obj)
        .then(res => {
          if (res.data.code === 200) {
            this.detail = res.data.result;
            this.detail.con_art = this.detail.con_art.replace(/&amp;lt;/g, "<");
            this.detail.con_art = this.detail.con_art.replace(/&amp;gt;/g, ">");
            this.detail = Object.assign({}, this.detail);
            this.pageObj = {
              preObj: res.data.preObj,
              nextObj: res.data.nextObj
            };
          }
        })
        .finally(() => {
          this.loadShow = false;
        });
    },
    enterDetail(item) {
      if (item) {
        this.$router.replace(
          `/mydetail?status=${item.status_art}&id=${item.id_art}`
        );
        this.getArtDetail();
      }
    },
    controlArticle(type) {
      if (type == 1) {
        this.$router.push(
          `/mywrite?id=${this.detail.id_art}&status=${this.detail.status_art}`
        );
      }
      if (type == 2) {
        this.deleteArticle();
      }
      if (type == 3) {
        this.publish();
      }
      if (type == 4) {
        this.deleteArticle();
      }
      if (type == 5) {
        this.publish();
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    // 删除 / 彻底删除
    deleteArticle() {
      let message = "你确定要删了我吗？ಥ_ಥ";
      this.$wConfirm({
        message: message,
        noBtnName: "取消",
        yesBtnName: "确定",
        yesCallback: () => {
          if (this.status_art != 3) {
            let obj = {
              status_art: 3,
              id_art: this.detail.id_art
            };
            recycl(obj).then(res => {
              if (res.data.code === 200) {
                this.$toast("操作成功~");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 2000);
              }
            });
          } else {
            let obj = {
              status_art: 3,
              id_art: this.detail.id_art
            };
            recyclDel(obj).then(res => {
              if (res.data.code === 200) {
                this.$toast("操作成功~");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 2000);
              }
            });
          }
        }
      });
    },
    publish() {
      let obj = {
        id_art: this.detail.id_art,
        tit_art: this.detail.tit_art,
        con_art: this.detail.con_art,
        cons_art: this.detail.cons_art,
        type_art: this.detail.type_art,
        status_art: 1
      };
      artEdit(obj).then(res => {
        if (res.data.code === 200) {
          this.$toast("操作成功~");
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.backstage.ignore {
  min-height: 100vh;
  .content {
    width: 880px;
    margin: 0 auto 20px;
    border: 10px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    color: #fff;
    .article-con {
      position: relative;
      flex: 1;
      border-radius: 4px;
      padding-bottom: 10px;
      .my-tit {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px 3px;
        background: rgba(255, 255, 255, 0.2);
        @include border-bottom-1px(#e6e6e6);
        span {
          position: relative;
          padding: 0 10px;
          margin-left: 10px;
          font-size: 14px;
          font-weight: 600;
        }
        span::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background: #ccc;
        }
        p {
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        strong {
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
      }
      .control-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        .inf-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 10px;
          span {
            position: relative;
            padding: 0 10px;
            font-size: 14px;
            cursor: pointer;
          }
          span::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background: #ccc;
          }
          span:nth-last-child(1)::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background: transparent;
          }
        }
        .inf-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 10px;
          span {
            position: relative;
            max-width: 220px;
            padding: 0 10px;
            font-size: 14px;
            @include ell();
            cursor: pointer;
          }
          span::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background: #ccc;
          }
          span:nth-last-child(1)::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background: transparent;
          }
        }
      }
      .art-con {
        padding: 10px 20px;
        .tit {
          margin-bottom: 20px;
          h2 {
            font-size: 18px;
            font-weight: 600;
          }
          .info {
            span {
              margin-right: 10px;
              font-size: 12px;
              color: #fafafa;
            }
          }
        }
        .con {
          margin-bottom: 20px;
          color: #fff;
        }
      }
    }
    .no-data {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      text-align: center;
      color: #fff;
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
pre {
  color: #000;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
pre code {
  display: block;
}
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
</style>
