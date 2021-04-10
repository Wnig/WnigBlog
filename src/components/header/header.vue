<template>
  <div class="header">
    <div class="ignore">
      <img class="bg"
           v-lazy="headerUrl"
           alt="" />
      <div class="header-con">
        <div class="login"
             @click="goLogin">
          <Icon type="md-contact"
                size="20" />
          {{ username ? username : "登录" }}
          <Icon v-if="!username"
                type="md-arrow-dropright"
                size="20" />
        </div>
        <div class="click-btn"
             v-if="isClick">
          <strong @click="preBtn">
            <Icon type="md-arrow-dropleft"
                  size="20" />
            Blog
          </strong>
          <strong class="strong">Wnig's</strong>
          <strong @click="nextBtn">Back
            <Icon type="md-arrow-dropright"
                  size="20" /></strong>
        </div>
        <span class="sign">{{ sentence }}</span>
      </div>
    </div>
    <div class="i-mobile">
      <Icon @click="oepnMask"
            class="list-btn"
            type="ios-menu"
            size="40" />
      <img class="bg"
           v-lazy="headerUrl"
           alt="" />
      <div class="header-con">
        <span class="sign">{{ sentence }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogInfo } from "@/api/http.js";
export default {
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    isClick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      username: "",
      sentence: "",
      headerUrl: ""
    };
  },
  created () {
    if (sessionStorage.getItem("user_art")) {
      this.username = sessionStorage.getItem("user_art");
    }
    this.getInfo();
  },
  methods: {
    preBtn () {
      this.$emit("preBtn");
    },
    nextBtn () {
      this.$emit("nextBtn");
    },
    goLogin () {
      if (!this.username) {
        this.$router.push(`/login`);
      }
    },
    getInfo () {
      getBlogInfo().then(res => {
        if (res.data.code === 200) {
          this.headerUrl = res.data.result[0].header_url;
          this.sentence = res.data.result[0].sign;
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    oepnMask () {
      this.$emit("oepnMask");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.header {
  .ignore {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 880px;
    height: 120px;
    margin: 0 auto 20px;
    overflow: hidden;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
    .bg {
      width: 100%;
      object-fit: contain;
    }
    .header-con {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      flex-direction: column;
      padding: 20px;
      height: 100%;
      z-index: 2;
      strong {
        color: #fafafa;
        font-size: 16px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
      .strong {
        margin: 0 10px;
      }
      .sign {
        color: #fafafa;
        font-size: 14px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      }
      .login {
        color: #fafafa;
        font-size: 14px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
    }
  }
  .i-mobile {
    position: relative;
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 480px;
    margin-bottom: 20px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
    .bg {
      width: 100%;
      object-fit: contain;
    }
    .list-btn {
      position: absolute;
      left: 30px;
      top: 30px;
      background: #fff;
      z-index: 11;
    }
    .header-con {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      flex-direction: column;
      padding: 40px;
      height: 100%;
      z-index: 2;
      strong {
        color: #fafafa;
        font-size: 32px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
      .strong {
        margin: 0 10px;
      }
      .sign {
        color: #fafafa;
        font-size: 32px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      }
      .login {
        color: #fafafa;
        font-size: 28px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
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
}
</style>
