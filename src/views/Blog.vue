<template>
  <div class="blog ignore">
    <app-header></app-header>
    <div class="blog-con">
      <nav-list
        ref="nav-list"
        :nowItem.sync="nowItem"
        :nowIndex.sync="nowIndex"
        @changeTab="changeTab()"
      ></nav-list>
      <div class="right-con">
        <div class="content-area">
          <div class="title" v-if="nowIndex > 1 && nowIndex < 5">
            <h1>分类：{{ titList[nowIndex].name }}</h1>
            <p>{{ titList[nowIndex].describe }}</p>
          </div>
          <div class="title" v-if="nowIndex == 1">
            <h1>{{ titList[nowIndex].name }}</h1>
            <p>{{ titList[nowIndex].describe }}</p>
          </div>
          <div class="content" v-if="!list.length">
            <p class="no-data">没有文章哦~ㄟ( ▔, ▔ )ㄏ</p>
          </div>
          <div class="art-list" v-else>
            <div
              class="article-cons"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="art-con">
                <div class="tit" @click="enterDetail(item)">
                  {{ item.tit_art }}
                </div>
                <div class="article">{{ item.con_txt_art }}</div>
                <div class="enter" @click="enterDetail(item)">继续阅读 →</div>
              </div>
              <div class="art-bottom">
                <Icon type="ios-calendar-outline" size="20" />
                <span class="time">{{ item.time_art }}</span>
                <Icon type="ios-folder-outline" size="20" />
                <span class="type">{{ item.type_art | typeFilter }}</span>
                <Icon type="ios-eye" size="20" />
                <span class="time">{{ item.read_art }}</span>
              </div>
            </div>
          </div>
          <div class="nav">
            <div class="nav-list">
              <Page
                @on-change="handlePage"
                :total="total"
                :page-size="pageSize"
              />
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <loadings :loadShows="loadShows"></loadings>
      </div>
    </div>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { artList } from "@/api/http.js";
import nav from "@/components/nav/nav";
import header from "@/components/header/header";
import footer from "@/components/footer/footer";
export default {
  name: "blog",
  components: {
    "nav-list": nav,
    "app-header": header,
    "app-footer": footer
  },
  data() {
    return {
      loadShow: true,
      loadShows: true,
      nowIndex: 1,
      nowItem: {},
      titList: [
        {
          type: -1,
          name: "首页",
          describe: ""
        },
        {
          type: 0,
          name: "全部文章",
          describe: "没有伞的孩子必须努力奔跑。"
        },
        {
          type: 1,
          name: "我的日常",
          describe: "如果生命会说话，它一定说谢谢你爱它。"
        },
        {
          type: 2,
          name: "学习与积累",
          describe:
            "好好努力，你才可能变成自己所想的那种人，走自己想走的那条路。"
        },
        {
          type: 3,
          name: "专业技术问题",
          describe: "若人生掀起大浪，我就会迎风而上。"
        }
      ],
      list: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      pageList: 0,
      type_art: "",
      status_art: 1
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
    }
  },
  created() {
    if (this.$route.query.type_art) {
      this.type_art = this.$route.query.type_art;
      if (
        this.type_art == "" ||
        this.type_art == 1 ||
        this.type_art == 2 ||
        this.type_art == 3 ||
        (this.type_art == 4 && sessionStorage.getItem("Access-Token"))
      ) {
        this.nowIndex = parseInt(this.type_art) + 1;
        this.getArtList();
      } else {
        this.nowIndex = -1;
        this.list = [];
        this.loadShow = false;
      }
    } else {
      this.getArtList();
    }
  },
  methods: {
    changeTab() {
      if (this.nowItem.link === "blog") {
        this.pageNum = 1;
        this.type_art = this.nowItem.type;
        if (
          this.type_art == "" ||
          this.type_art == 1 ||
          this.type_art == 2 ||
          this.type_art == 3 ||
          (this.type_art == 4 && sessionStorage.getItem("Access-Token"))
        ) {
          this.getArtList();
        } else {
          this.list = [];
          this.loadShow = false;
        }
        this.$router.replace(
          `/${this.nowItem.link}?type_art=${this.nowItem.type}`
        );
      } else {
        this.$router.push({ name: this.nowItem.link });
      }
    },
    enterDetail(item) {
      this.$router.push(`/detail?id=${item.id_art}`);
    },
    handlePage(size) {
      this.pageNum = size;
      this.getArtList();
    },
    getArtList() {
      this.loadShows = true;
      this.list = [];
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status_art: this.status_art,
        type_art: this.type_art
      };
      artList(obj)
        .then(res => {
          if (res.data.code === 200) {
            this.list = res.data.result;
            this.total = res.data.total;
            this.pageList = Math.ceil(this.total / this.pageSize);
          }
        })
        .catch(data => {
          console.log(data);
        })
        .finally(() => {
          this.loadShow = false;
          this.loadShows = false;
        });
    },
    preBtn() {
      if (this.pageNum > 1) {
        this.pageNum--;
        this.getArtList();
      }
    },
    nextBtn() {
      if (this.pageNum < this.pageList) {
        this.pageNum++;
        this.getArtList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.blog.ignore {
  min-height: 100vh;
  padding-bottom: 20px;
  .blog-con {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 880px;
    margin: auto;
    .right-con {
      position: relative;
      width: 665px;
    }
    .content-area {
      .title {
        margin-bottom: 20px;
        padding: 1vw;
        border-radius: 5px;
        border-left: 10px solid #333;
        background: #fff;
        box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
        h1 {
          margin-bottom: 5px;
          color: #000;
          font-size: 18px;
        }
        p {
          color: rgba(51, 51, 51, 0.7);
          font-size: 12px;
        }
      }
      .content {
        position: relative;
        min-height: 20vw;
        padding: 15px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
        .no-data {
          width: 100%;
          height: 20vw;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
      }
      .art-list {
        .article-cons {
          margin-bottom: 20px;
          border-radius: 5px;
          background: #fff;
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          .art-con {
            padding: 2vw;
            .tit {
              margin-bottom: 20px;
              color: #000;
              font-size: 24px;
              cursor: pointer;
              @include ell();
              text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
            }
            .tit:hover {
              opacity: 0.8;
            }
            .article {
              margin-bottom: 20px;
              color: #403f3f;
              font-size: 16px;
              @include multi(4);
            }
            .enter {
              width: 86px;
              font-size: 16px;
              text-align: center;
              color: #333;
              border-bottom: 1px solid #333;
              cursor: pointer;
            }
            .enter:hover {
              opacity: 0.8;
            }
          }
          .art-bottom {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 1vw 2vw;
            border-radius: 0 0 5px 5px;
            background-color: #f7f7f7;
            span {
              position: relative;
              margin: 0 20px 0 5px;
              color: #333;
              font-size: 14px;
            }
          }
        }
      }
      .nav {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
<style lang="scss">
.nav {
  position: relative;
  .nav-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    .ivu-page-prev {
      position: absolute;
      left: 0;
      top: 0;
      width: 44px;
      height: 44px;
      border-radius: 5px 0 0 5px;
      border: none;
      background: #333 !important;
      .ivu-icon {
        font-size: 20px;
        line-height: 44px;
      }
      a {
        color: #bdbdbd;
      }
      a:hover {
        color: #bdbdbd;
      }
    }
    .ivu-page-next {
      position: absolute;
      right: 0;
      top: 0;
      width: 44px;
      height: 44px;
      border-radius: 0 5px 5px 0;
      border: none;
      background: #333 !important;
      .ivu-icon {
        font-size: 20px;
        line-height: 44px;
      }
      a {
        color: #bdbdbd;
      }
      a:hover {
        color: #bdbdbd;
      }
    }
    .ivu-page-item {
      border: none;
      a {
        color: #bdbdbd;
      }
      a:hover {
        color: #000;
      }
    }
    .ivu-page-item-active {
      border: none;
      a {
        color: #000;
      }
      a:hover {
        color: #000;
      }
    }
    .ivu-page-disabled {
      cursor: not-allowed;
      a {
        color: #bdbdbd;
      }
      a:hover {
        color: #bdbdbd;
      }
    }
    a {
      color: #bdbdbd;
    }
    a:hover {
      color: #000;
    }
  }
}
</style>
