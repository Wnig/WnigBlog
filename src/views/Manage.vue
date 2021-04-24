<template>
  <div class="manage ignore">
    <app-header
      :isClick.sync="isClick"
      @preBtn="enterBlog"
      @nextBtn="enterBackstage"
    ></app-header>
    <div class="content">
      <div class="img-show">
        <div class="img-con">
          <img src="@/assets/img/img_12.jpg" alt="" />
          <img src="@/assets/img/img_03.jpg" alt="" />
        </div>
        <div class="img-con">
          <img src="@/assets/img/img_14.jpg" alt="" />
          <img src="@/assets/img/img_13.jpg" alt="" />
        </div>
      </div>
      <div class="says">
        <p class="say">❤태어나서 널 만나고 죽을 만큼 사랑하고❤</p>
        <p class="say">❤나 정말 너 좋아해.❤</p>
        <p class="say say-from">from : xxxiwnig♬</p>
      </div>
    </div>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import header from "@/components/header/header";
export default {
  name: "manage",
  components: {
    "app-header": header
  },
  data() {
    return {
      loadShow: false,
      selIndex: 1,
      isClick: true
    };
  },
  created() {},
  methods: {
    enterBlog() {
      this.$router.push({ name: "blog" });
    },
    enterBackstage() {
      this.$router.push({ name: "backstage" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.manage.ignore {
  min-height: 100vh;
  .header-con {
    strong {
      color: #fafafa;
      font-size: 16px;
      font-weight: 400;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .strong {
      margin: 0 10px;
    }
  }
  .content {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 880px;
    margin: 0 auto 20px;
    padding: 13px;
    background: #000;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      margin: 0 auto;
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0px 5px 1px rgba(255, 255, 255, 1);
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0px 5px 1px rgba(255, 255, 255, 1);
    }
    .img-show {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      .img-con {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        img {
          width: 180px;
          margin: 0 5px 5px 0px;
        }
      }
    }
    .says {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex: 1;
      color: #fff;
      .say {
        margin-bottom: 6px;
        line-height: 28px;
        text-align: center;
        font-size: 12px;
      }
      .say-from {
        width: 100%;
        text-align: right;
      }
    }
  }
  .footer {
    width: 880px;
    margin: auto;
  }
}
</style>
