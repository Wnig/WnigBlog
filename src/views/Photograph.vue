<template>
  <div class="blog">
    <app-header></app-header>
    <div class="blog-con">
      <nav-list
        ref="nav-list"
        :nowItem.sync="nowItem"
        :nowIndex.sync="nowIndex"
        @changeTab="changeTab()"
      ></nav-list>
      <div class="right-con">
        <div class="article-cons">
          <div class="art-con">
            <div class="title">
              <h1>相册</h1>
              <p>你是年少的欢喜，倒过来也是你。</p>
            </div>
            <div class="waterfall" v-if="list.length">
              <div
                class="item"
                v-for="(item, index) in list"
                :key="index"
                @click="showImg(item, index)"
              >
                <div class="item-content">
                  <img v-lazy="item.photo_url" alt="" />
                  <div class="describe">
                    <p>{{ item.photo_con }}</p>
                    <div class="time">
                      <Icon type="md-calendar" size="16" />
                      {{ item.creat_art }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="no-data" v-else>
              <p>没有照片哦~ㄟ( ▔, ▔ )ㄏ</p>
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
        <app-footer></app-footer>
        <loadings :loadShows="loadShows"></loadings>
      </div>
    </div>
    <div class="photo-mask" v-if="isShowImg">
      <Icon
        class="close"
        @click="isShowImg = false"
        type="md-close"
        color="#fff"
        size="50"
      />
      <Icon type="ios-arrow-back" size="60" color="#fff" @click="preBtn" />
      <div class="img">
        <p>{{ imgIndex }} / {{ list.length }}</p>
        <img :src="item.photo_url" alt="" />
        <p>{{ item.photo_con }}</p>
        <p>
          <Icon type="md-calendar" size="18" />
          {{ item.creat_art }}
        </p>
      </div>
      <Icon type="ios-arrow-forward" size="60" color="#fff" @click="nextBtn" />
    </div>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { getBlogPhotoInfo } from "@/api/http.js";
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
      isShowImg: false,
      loadShows: true,
      loadShow: true,
      nowIndex: 5,
      nowItem: {},
      total: 0,
      pageNum: 1,
      pageSize: 20,
      list: [],
      item: {},
      imgIndex: 0
    };
  },
  created() {
    this.getBlogPhotoInfo();
  },
  methods: {
    changeTab() {
      if (this.nowItem.link === "blog") {
        this.$router.replace(
          `/${this.nowItem.link}?type_art=${this.nowItem.type}`
        );
      } else {
        this.$router.push({ name: this.nowItem.link });
      }
    },
    handlePage(size) {
      this.pageNum = size;
      this.getBlogPhotoInfo();
    },
    getBlogPhotoInfo() {
      this.loadShows = true;
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getBlogPhotoInfo(obj)
        .then(res => {
          if (res.data.code === 200) {
            this.list = res.data.result;
            this.total = res.data.total;
            this.pageList = Math.ceil(this.total / this.pageSize);
          } else {
            this.$toast(res.data.msg);
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
    showImg(item, index) {
      this.isShowImg = true;
      this.item = item;
      this.imgIndex = index + 1;
    },
    preBtn() {
      if (this.imgIndex > 1) {
        this.imgIndex--;
        this.item = this.list[this.imgIndex - 1];
      }
    },
    nextBtn() {
      if (this.imgIndex < this.list.length) {
        this.imgIndex++;
        this.item = this.list[this.imgIndex - 1];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.blog {
  min-height: 100vh;
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
    .article-cons {
      .art-con {
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
        .waterfall {
          column-count: 3;
          column-gap: 0;
          .item {
            break-inside: avoid;
            box-sizing: border-box;
            margin: 0 5px 10px 5px;
            padding: 10px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
            .item-content {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              img {
                width: 100%;
                margin-bottom: 10px;
              }
              .describe {
                width: 100%;
                p {
                  margin-bottom: 5px;
                  text-align: left;
                }
                .time {
                  text-align: right;
                }
              }
            }
          }
        }
        .no-data {
          width: 100%;
          height: 20vw;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background: #fff;
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          p {
            font-size: 20px;
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
  .photo-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    .img {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        max-width: 400px;
        margin-bottom: 10px;
      }
      p {
        max-width: 400px;
        margin-bottom: 5px;
        color: #fff;
        font-size: 18px;
      }
    }
    .ivu-icon {
      cursor: pointer;
    }
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 9;
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
