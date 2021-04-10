<template>
  <div class="nav-con">
    <div class="ignore">
      <div class="left-con">
        <div class="myheader">
          <img class="my-header"
               v-lazy="infoObj.img_url"
               alt="" />
        </div>
        <div class="info-list">
          <strong>{{ infoObj.blog_name }}</strong>
          <span>{{ infoObj.blog_sign }}</span>
        </div>
        <div class="nav">
          <p @click="changeTabBtn(item, index)"
             :class="{ 'sel-item': nowIndex == index }"
             v-for="(item, index) in navData"
             :key="index">
            <span v-if="isAdmin">{{ item.name }}</span>
            <span v-else-if="item.name != 'Manage'">{{ item.name }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="i-mobile"
         v-show="isOpen"
         @click="closeMask">
      <div class="left-con">
        <div class="myheader">
          <img class="my-header"
               v-lazy="infoObj.img_url"
               alt="" />
        </div>
        <div class="info-list">
          <strong>{{ infoObj.blog_name }}</strong>
          <span>{{ infoObj.blog_sign }}</span>
        </div>
        <div class="nav">
          <p @click="changeTabBtn(item, index)"
             :class="{ 'sel-item': nowIndex == index }"
             v-for="(item, index) in navData"
             :key="index">
            <span v-if="item.name != 'Manage'">{{ item.name }}</span>
          </p>
        </div>
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
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
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
  created () {
    if (sessionStorage.getItem("Access-Token")) {
      this.isAdmin = true;
    }
    this.getInfo();
  },
  mounted () { },
  methods: {
    changeTabBtn (item, index) {
      if (index == this.nowIndex) {
        return;
      }
      this.$emit("update:nowIndex", index);
      this.$emit("update:nowItem", item);
      this.$emit("changeTab");
    },
    getInfo () {
      getBlogInfo().then(res => {
        if (res.data.code === 200) {
          this.infoObj = res.data.result[0];
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    closeMask () {
      this.$emit("closeMask")
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.ignore {
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
}
.i-mobile {
  position: fixed;
  left: 0;
  top: 0;
  display: none;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .left-con {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70vw;
    height: 100vh;
    padding: 30px;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
    animation: bounceInLeft 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    .myheader {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-bottom: 20px;
      img {
        width: 200px;
        border-radius: 50%;
      }
    }
    .info-list {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 40px;
      strong {
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
        font-size: 60px;
        font-weight: 700;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      }
      strong::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        height: 1px;
        width: 100%;
        margin: auto;
        background: rgba(0, 0, 0, 0.4);
        transform: scaleX(1);
        transition: all 0.2s ease-in;
      }
      span {
        width: 100%;
        text-align: left;
        color: #1a1a1a;
        font-size: 28px;
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
        padding: 10px 40px;
        color: #333;
        text-align: center;
        font-size: 28px;
        @include ell();
        @include border-top-1px(#e6e6e6);
      }
      p:hover {
        font-weight: 700;
      }
    }
  }
}

@keyframes bounceInLeft {
  0% {
    transform: translate3d(-70vw, 0, 0);
  }
  60% {
    transform: translate3d(0px, 0, 0);
  }
  75% {
    transform: translate3d(0px, 0, 0);
  }
  90% {
    transform: translate3d(0px, 0, 0);
  }
  100% {
    transform: translate3d(0px, 0, 0);
  }
}

@media screen and (max-width: 750px) {
  .ignore {
    display: none;
  }
  .i-mobile {
    display: block;
  }
}
</style>
