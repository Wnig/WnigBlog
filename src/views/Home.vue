<template>
  <div class="home">
    <div class="ignore">
      <div class="my-home">
        <div class="my-home-con">
          <div class="my-bg">
            <img class="bg-img"
                 v-lazy="require('@/assets/img/img_02.jpg')"
                 alt="" />
          </div>
          <div class="my-info-con">
            <div class="my-info">
              <p>Wnig.</p>
              <img @click="enterHome"
                   class="my-header"
                   v-lazy="require('@/assets/img/my_header.jpg')"
                   alt="" />
            </div>
            <p class="signature">“长夜将尽，来日可期。”</p>
          </div>
        </div>
        <div class="my-intro">
          <div class="item">
            <img @click="enterHome"
                 class="my-header"
                 v-lazy="require('@/assets/img/my_header.jpg')"
                 alt="" />
            <div class="my-content">
              <strong class="name">Wnig</strong>
              <div class="content">
                <p>QQ : 770225508</p>
                <p>E-mail : 770225508@qq.com</p>
                <p>WeChat : xxxibwnig</p>
                <img v-lazy="require('@/assets/img/img_05.jpg')"
                     alt="" />
              </div>
              <div class="from">
                <span class="time">2017-08-18</span>
                <p>来自 权志龙未公开小女友的手机</p>
              </div>
            </div>
          </div>
          <div class="bottom-bor"></div>
        </div>
      </div>
    </div>
    <div class="i-mobile">
      <div class="my-home">
        <div class="my-home-con">
          <div class="my-bg">
            <img class="bg-img"
                 v-lazy="require('@/assets/img/img_02.jpg')"
                 alt="" />
          </div>
          <div class="my-info-con">
            <div class="my-info">
              <p>Wnig.</p>
              <img @click="enterHome"
                   class="my-header"
                   v-lazy="require('@/assets/img/my_header.jpg')"
                   alt="" />
            </div>
            <p class="signature">“长夜将尽，来日可期。”</p>
          </div>
        </div>
        <div class="my-intro">
          <div class="item">
            <img @click="enterHome"
                 class="my-header"
                 v-lazy="require('@/assets/img/my_header.jpg')"
                 alt="" />
            <div class="my-content">
              <strong class="name">Wnig</strong>
              <div class="content">
                <p>QQ : 770225508</p>
                <p>E-mail : 770225508@qq.com</p>
                <p>WeChat : xxxibwnig</p>
                <img v-lazy="require('@/assets/img/img_05.jpg')"
                     alt="" />
              </div>
              <div class="from">
                <span class="time">2017-08-18</span>
                <p>来自 权志龙未公开小女友的手机</p>
              </div>
            </div>
          </div>
          <div class="bottom-bor"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data () {
    return {
      imgUrl: ""
    };
  },
  created () { },
  mounted () { },
  methods: {
    enterHome () {
      this.$router.push({ name: "blog" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.home {
  .ignore {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    .my-home {
      width: 400px;
      .my-home-con {
        position: relative;
        .my-bg {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 350px;
          overflow: hidden;
          border-radius: 5px 5px 0 0;
          .bg-img {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 100%;
            object-fit: contain;
            filter: blur(4px);
          }
        }
        .my-info-con {
          position: absolute;
          right: 15px;
          bottom: -50px;
          width: 30vw;
          .my-info {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            p {
              width: 10vw;
              text-align: right;
              margin-right: 10px;
              color: #fff;
              font-size: 16px;
              text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.29);
              @include ell();
            }
            img {
              width: 80px;
              border-radius: 10px;
              cursor: pointer;
            }
          }
          .signature {
            margin-top: 10px;
            text-align: right;
            color: #1a1a1a;
            font-size: 14px;
            @include ell();
          }
        }
      }
      .my-intro {
        padding: 70px 10px 10px 10px;
        background: #fff;
        border-radius: 0 0 5px 5px;
        .item {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          .my-header {
            width: 60px;
            margin-right: 15px;
            border-radius: 10px;
            cursor: pointer;
          }
          .my-content {
            flex: 1;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            .name {
              margin-bottom: 5px;
              color: #0d5588;
              font-size: 18px;
              @include ell();
            }
            .content {
              p {
                color: #000;
                font-size: 14px;
              }
              img {
                margin-top: 5px;
                width: 120px;
                object-fit: contain;
              }
            }
            .from {
              display: flex;
              align-items: flex-start;
              justify-content: center;
              margin-top: 15px;
              .time {
                margin-right: 10px;
                color: #afa7a7;
                font-size: 12px;
                @include ell();
              }
              p {
                color: #afa7a7;
                font-size: 12px;
                @include ell();
              }
            }
          }
        }
        .bottom-bor {
          position: relative;
          width: 5px;
          height: 5px;
          margin: 30px auto 10px;
          border-radius: 50%;
          background: #afa7a7;
          &.bottom-bor::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: -180px;
            margin: auto;
            width: 170px;
            height: 1px;
            background: #afa7a7;
          }
          &.bottom-bor::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: -180px;
            margin: auto;
            width: 170px;
            height: 1px;
            background: #afa7a7;
          }
        }
      }
    }
  }
  .i-mobile {
    display: none;
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    .my-home {
      width: 100%;
      .my-home-con {
        position: relative;
        .my-bg {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 650px;
          overflow: hidden;
          .bg-img {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 100%;
            object-fit: contain;
            filter: blur(4px);
          }
        }
        .my-info-con {
          position: absolute;
          right: 30px;
          bottom: -70px;
          width: 400px;
          .my-info {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            p {
              width: 100px;
              text-align: right;
              margin-right: 10px;
              color: #fff;
              font-size: 32px;
              text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.29);
              @include ell();
            }
            img {
              width: 160px;
              border-radius: 10px;
              cursor: pointer;
            }
          }
          .signature {
            margin-top: 10px;
            text-align: right;
            color: #1a1a1a;
            font-size: 28px;
            @include ell();
          }
        }
      }
      .my-intro {
        padding: 70px 20px 20px 20px;
        background: #fff;
        border-radius: 0 0 5px 5px;
        .item {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          .my-header {
            width: 120px;
            margin-right: 30px;
            border-radius: 10px;
            cursor: pointer;
          }
          .my-content {
            flex: 1;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            .name {
              margin-bottom: 5px;
              color: #0d5588;
              font-size: 36px;
              @include ell();
            }
            .content {
              p {
                color: #000;
                font-size: 24px;
              }
              img {
                margin-top: 5px;
                width: 240px;
                object-fit: contain;
              }
            }
            .from {
              display: flex;
              align-items: flex-start;
              justify-content: center;
              margin-top: 15px;
              .time {
                margin-right: 10px;
                color: #afa7a7;
                font-size: 24px;
                @include ell();
              }
              p {
                color: #afa7a7;
                font-size: 24px;
                @include ell();
              }
            }
          }
        }
        .bottom-bor {
          position: relative;
          width: 10px;
          height: 10px;
          margin: 60px auto 20px;
          border-radius: 50%;
          background: #afa7a7;
          &.bottom-bor::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: -340px;
            margin: auto;
            width: 320px;
            height: 1px;
            background: #afa7a7;
          }
          &.bottom-bor::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: -340px;
            margin: auto;
            width: 320px;
            height: 1px;
            background: #afa7a7;
          }
        }
      }
    }
  }
  @media screen and (max-width: 750px) {
    .ignore {
      display: none;
    }
    .i-mobile {
      display: flex;
    }
  }
}
</style>
