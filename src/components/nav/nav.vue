<template>
  <div class="nav-con">
    <div class="left-con">
      <div class="myheader">
        <img class="my-header" v-lazy="infoObj.img_url" alt="" />
      </div>
      <div class="info-list">
        <strong>{{ infoObj.blog_name }}</strong>
        <span>{{ infoObj.blog_sign }}</span>
      </div>
      <div class="nav">
        <p
          @click="changeTabBtn(item, index)"
          :class="{ 'sel-item': nowIndex == index }"
          v-for="(item, index) in navData"
          :key="index"
        >
          <span v-if="isAdmin">{{ item.name }}</span>
          <span v-else-if="item.name != 'Manage'">{{ item.name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogInfo } from "@/api/http.js";
export default {
  props: {
    nowIndex: {
      type: Number,
      default: 0
    },
    nowItem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isAdmin: false,
      infoObj: {},
      navData: [
        {
          name: "Home",
          link: "home",
          type: ""
        },
        {
          name: "All",
          link: "blog",
          type: ""
        },
        {
          name: "Daily",
          link: "blog",
          type: 1
        },
        {
          name: "Accumulate",
          link: "blog",
          type: 2
        },
        {
          name: "Professional",
          link: "blog",
          type: 3
        },
        {
          name: "Photograph",
          link: "photograph",
          type: ""
        },
        {
          name: "Archives",
          link: "archives",
          type: ""
        },
        {
          name: "About",
          link: "about",
          type: ""
        },
        {
          name: "Resume",
          link: "resume",
          type: ""
        },
        {
          name: "Manage",
          link: "manage",
          type: ""
        }
      ]
    };
  },
  created() {
    if (sessionStorage.getItem("Access-Token")) {
      this.isAdmin = true;
    }
    this.getInfo();
  },
  mounted() {},
  methods: {
    changeTabBtn(item, index) {
      if (index == this.nowIndex) {
        return;
      }
      this.$emit("update:nowIndex", index);
      this.$emit("update:nowItem", item);
      this.$emit("changeTab");
    },
    getInfo() {
      getBlogInfo().then(res => {
        if (res.data.code === 200) {
          this.infoObj = res.data.result[0];
        } else {
          this.$toast(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.left-con {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 195px;
  min-height: 50px;
  margin-right: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
  z-index: 10;
  .myheader {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 10px;
    img {
      width: 100px;
      border-radius: 50%;
    }
  }
  .info-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
    strong {
      position: relative;
      width: 100%;
      margin-bottom: 10px;
      color: #333;
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
    strong::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 1px;
      width: 100%;
      margin: auto;
      background: rgba(0, 0, 0, 0.4);
      transform: scaleX(1);
      transition: all 0.2s ease-in;
    }
    strong:hover::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 1px;
      width: 0;
      margin: auto;
      background: rgba(0, 0, 0, 0.4);
      transform: scaleX(1);
      transition: all 0.2s ease-in;
    }
    span {
      width: 100%;
      text-align: left;
      color: #1a1a1a;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .nav {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    p {
      display: flex;
      position: relative;
      width: 100%;
      cursor: pointer;
      z-index: 1;
      transition: all 0.2s ease-in;
      &.sel-item {
        font-weight: 700;
        transition: all 0.2s ease-in;
      }
    }
    span {
      width: 100%;
      padding: 5px 20px;
      color: #333;
      text-align: center;
      font-size: 14px;
      @include ell();
      @include border-top-1px(#e6e6e6);
    }
    p:hover {
      font-weight: 700;
    }
  }
}
</style>
