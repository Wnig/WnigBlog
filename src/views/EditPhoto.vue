<template>
  <div class="blog ignore">
    <app-header></app-header>
    <div class="blog-con">
      <div class="tit">
        <div @click="goBack">
          <Icon type="ios-arrow-back" size="18" />
          <strong>返回</strong>
        </div>
        <p @click="enterPage">
          新增相册
          <Icon type="md-add-circle" size="18" />
        </p>
      </div>
      <div class="waterfall" v-if="list.length">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @mouseenter="enter(index)"
          @mouseleave="leave(index)"
        >
          <div class="item-content">
            <img :src="item.photo_url" alt="" />
            <div class="describe">
              <p>{{ item.photo_con }}</p>
              <div class="time">
                <Icon type="md-calendar" size="16" />
                {{ item.creat_art }}
              </div>
            </div>
          </div>
          <div class="item-mask" v-if="item.isShow">
            <Icon
              @click="enterPhoto(item)"
              type="ios-create-outline"
              size="40"
              color="#fff"
            />
            <Icon
              @click="deletePhoto(item)"
              type="ios-trash-outline"
              size="40"
              color="#fff"
            />
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <p>没有照片哦~ㄟ( ▔, ▔ )ㄏ</p>
      </div>
    </div>
    <div class="nav">
      <div class="nav-list">
        <Page @on-change="handlePage" :total="total" :page-size="pageSize" />
      </div>
    </div>
    <app-footer></app-footer>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { getPhotoInfo, photoDel } from "@/api/http.js";
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
      pageList: 0,
      total: 0,
      pageNum: 1,
      pageSize: 20,
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    enterPage() {
      this.$router.push(`/editPhotoInfo`);
    },
    getPhotoInfo() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        user_art: sessionStorage.getItem("user_art")
      };
      getPhotoInfo(obj).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.result;
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].isShow = false;
          }
          this.total = res.data.total;
          this.pageList = Math.ceil(this.total / this.pageSize);
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    enterPhoto(item) {
      this.$router.push(`/editPhotoInfo?id=${item.photo_id_art}`);
    },
    handlePage(size) {
      this.pageNum = size;
      this.getPhotoInfo();
    },
    enter(index) {
      this.list[index].isShow = true;
      this.list = Object.assign([], this.list);
    },
    leave(index) {
      this.list[index].isShow = false;
      this.list = Object.assign([], this.list);
    },
    deletePhoto(item) {
      let message = "你确定要删了我吗？ಥ_ಥ";
      this.$wConfirm({
        message: message,
        noBtnName: "取消",
        yesBtnName: "确定",
        yesCallback: () => {
          let obj = {
            user_art: sessionStorage.getItem("user_art"),
            photo_id_art: item.photo_id_art
          };
          photoDel(obj).then(res => {
            this.pageNum = 1;
            this.getPhotoInfo();
          });
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
    margin: 0 auto 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    .tit {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px 5px;
      margin-bottom: 20px;
      border-left: 10px solid #333;
      box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      background: #fff;
      p {
        color: #000;
        font-size: 18px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
      strong {
        position: relative;
        padding: 0 10px;
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      strong::before {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        height: 100%;
        background: #ccc;
      }
      .ivu-icon {
        cursor: pointer;
      }
    }
    .waterfall {
      column-count: 4;
      column-gap: 0;
      .item {
        position: relative;
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
        .item-mask {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9;
          .ivu-icon {
            margin: 0 20px;
            cursor: pointer;
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
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 880px;
    margin: 20px auto 0;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
  }
  .footer {
    width: 880px;
    margin: 20px auto 0;
  }
}
</style>
<style lang="scss">
.ignore {
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
}
</style>
