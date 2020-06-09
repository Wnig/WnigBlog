<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"
                   :key="$route.fullpath" />
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"
                 :key="$route.fullpath"></router-view>
    <div class="weather"
         v-if="location">
      <div class="tips">
        <span class="name">
          <Icon type="ios-pin-outline"
                size="16" />{{ weather.city }}</span>
        <div class="location">
          <p>
            <span class="date">
              <Icon type="md-calendar"
                    size="16" />
              {{ weather.date }}</span>
            <span class="week">{{ weather.week }}</span>
          </p>
          <p>
            <span class="tems">
              <Icon type="ios-thermometer-outline"
                    size="12" />{{
                weather.tem1
              }}°~{{ weather.tem2 }}°</span>
            <span class="tems">{{ weather.win }}{{ weather.win_speed }}</span>
          </p>
        </div>
        <div class="weather-con">
          <span class="tem">{{ weather.tem }}°</span>
          <span class="wea">{{ weather.wea }}</span>
          <i class="iconfont"
             v-if="weather.wea_img == item.type"
             v-for="(item, index) in weaIconList"
             :key="index"
             :class="item.class"></i>
          <span class="air">空气质量 : {{ weather.air }}</span>
        </div>
        <p>更新时间 : {{ weather.update_time }}</p>
      </div>
    </div>
    <div class="music"
         :class="{ out: isOut }">
      <div class="img">
        <img :class="{ on: isPlay }"
             :src="musicList[nowIndex].imgurl"
             alt="" />
      </div>
      <div class="music-info">
        <p>{{ musicList[nowIndex].name }}</p>
        <p>{{ musicList[nowIndex].singer }}</p>
        <div class="control-btn">
          <audio id="audio"
                 :src="musicList[nowIndex].url"
                 preload="auto"
                 autoplay></audio>
          <i class="iconfont icon-icon-1"
             @click="pre"></i>
          <i class="iconfont icon-icon-2"
             @click="stopBtn"
             v-if="isPlay"></i>
          <i class="iconfont icon-icon-6"
             @click="playBtn"
             v-else></i>
          <i class="iconfont icon-icon-"
             @click="next"></i>
        </div>
      </div>
      <div class="right-btn"
           @click="clickMusic">
        <Icon v-if="isOut"
              type="ios-arrow-forward"
              size="20" />
        <Icon v-else
              type="ios-arrow-back"
              size="20" />
      </div>
    </div>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import jsonp from "jsonp";
import { counter } from "@/api/http.js";
export default {
  name: "App",
  data () {
    return {
      loadShow: true,
      isPlay: false,
      musicList: [
        {
          id: 0,
          name: "하루하루",
          singer: "BIGBANG (빅뱅)",
          imgurl:
            "https://y.gtimg.cn/music/photo_new/T002R800x800M000002wDfSM2AiMdp.jpg?max_age=2592000",
          url: "http://qn.xxxiwnig.com/C400003I3uOM3zORt4.mp4"
        },
        {
          id: 1,
          name: "Missing You",
          singer: "G-DRAGON (权志龙)",
          imgurl:
            "http://y.gtimg.cn/music/photo_new/T002R300x300M000001mKd6p4WMzua_1.jpg?max_age=2592000",
          url: "http://qn.xxxiwnig.com/C400000HtgjU3aNwkr.mp4"
        },
        {
          id: 2,
          name: "Who You?",
          singer: "G-DRAGON (权志龙)",
          imgurl:
            "https://y.gtimg.cn/music/photo_new/T002R800x800M000002e1kVt33k3e3.jpg?max_age=2592000",
          url: "http://qn.xxxiwnig.com/C400003ymCOm29QRDs.mp4"
        },
        {
          id: 3,
          name: "Blue",
          singer: "BIGBANG (빅뱅)",
          imgurl:
            "https://y.gtimg.cn/music/photo_new/T002R300x300M000001FFpMe09To1V_1.jpg?max_age=2592000",
          url: "http://qn.xxxiwnig.com/C400002x9rLf1qkyBJ.mp4"
        },
        {
          id: 4,
          name: "Ego",
          singer: "BIGBANG (빅뱅)",
          imgurl:
            "https://y.gtimg.cn/music/photo_new/T002R800x800M0000020XQDn4DXtWK.jpg?max_age=2592000",
          url: "http://qn.xxxiwnig.com/C400003t8jLl3hkcDz.mp4"
        },
        {
          id: 5,
          name: "This Love",
          singer: "BIGBANG (빅뱅)",
          imgurl:
            "https://y.gtimg.cn/music/photo_new/T002R800x800M000003wCNU80NLNzA.jpg?max_age=2592000",
          url: "http://qn.xxxiwnig.com/C4000022BgvR099cdx.mp4"
        }
      ],
      musicUrl: "",
      nowIndex: 0,
      isOut: false,
      location: "",
      weather: {},
      weaIconList: [
        {
          type: "xue",
          class: "icon-xiaxue"
        },
        {
          type: "lei",
          class: "icon-leizhenyu"
        },
        {
          type: "shachen",
          class: "icon-shachenbao"
        },
        {
          type: "wu",
          class: "icon-wu"
        },
        {
          type: "bingbao",
          class: "icon-bingbao"
        },
        {
          type: "yun",
          class: "icon-duoyun"
        },
        {
          type: "yu",
          class: "icon-dongyu"
        },
        {
          type: "yin",
          class: "icon-yintian"
        },
        {
          type: "qing",
          class: "icon-tianqing"
        }
      ]
    };
  },
  created () {
    var hiddenProperty =
      "hidden" in document
        ? "hidden"
        : "webkitHidden" in document
          ? "webkitHidden"
          : "mozHidden" in document
            ? "mozHidden"
            : null;
    var visibilityChangeEvent = hiddenProperty.replace(
      /hidden/i,
      "visibilitychange"
    );
    var onVisibilityChange = function () {
      if (!document[hiddenProperty]) {
        document.title = "I'm Wnig. - 我最害怕孤独，无法生存。";
      } else {
        document.title = "我藏好啦(つд⊂)";
      }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    this.getCounter();
  },
  mounted () {
    this.getLocation();
    var audio = document.querySelector("#audio");
    let that = this;
    audio.addEventListener("loadeddata", function () {
      audio.paused ? (that.isPlay = false) : (that.isPlay = true);
    });
    audio.addEventListener(
      "ended",
      function () {
        if (that.nowIndex == that.musicList.length - 1) {
          that.nowIndex = 0;
        } else {
          that.nowIndex++;
        }
        that.playBtn();
      },
      false
    );
  },
  methods: {
    // 统计访问人数
    getCounter () {
      counter()
        .then(res => { })
        .finally(() => {
          this.loadShow = false;
        });
    },
    playBtn () {
      var audio = document.querySelector("#audio");
      var that = this;
      if (!this.isPlay) {
        audio.addEventListener("canplay", function () {
          audio.play();
          that.isPlay = true;
        });
      }
    },
    stopBtn () {
      var audio = document.querySelector("#audio");
      if (this.isPlay) {
        audio.pause();
        this.isPlay = false;
      }
    },
    pre () {
      if (this.nowIndex == 0) {
        return;
      } else {
        this.nowIndex--;
      }
      this.playBtn();
    },
    next () {
      if (this.nowIndex == this.musicList.length - 1) {
        return;
      } else {
        this.nowIndex++;
        this.playBtn();
      }
    },
    clickMusic () {
      this.isOut = !this.isOut;
    },
    getLocation () {
      var data = {
        key: "FDRBZ-2T7RI-J5MGG-5OOCF-7D7KQ-N4FDM"
      };
      var url = "https://apis.map.qq.com/ws/location/v1/ip"; //这个就是地理位置信息的接口
      data.output = "jsonp";
      this.$jsonp(url, data)
        .then(res => {
          console.log("==ip==", res);
          this.location = res.result.ip;
          this.getWeather();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getWeather () {
      // 获取天气
      var data = {
        version: "v61",
        appid: "58527382",
        appsecret: "f6Cz0gZr",
        ip: this.location
      };
      var url = `https://tianqiapi.com/api`;
      data.output = "jsonp";
      this.$jsonp(url, data)
        .then(res => {
          this.weather = res;
          this.weather.date = `${this.weather.date.substring(
            5,
            7
          )}/${this.weather.date.substring(8, 10)}`;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loadShow = false;
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";
html,
body {
  width: 100%;
  min-height: 100vh;
  background: #000;
}
#app {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.weather {
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 1;
  .tips {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
    width: 210px;
    padding: 5px 10px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 5px -1px rgba(255, 255, 255, 1);
    &::before {
      content: "";
      position: absolute;
      left: 20px;
      top: -15px;
      width: 2px;
      height: 15px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 2px 5px -1px rgba(255, 255, 255, 1);
    }
    &::after {
      content: "";
      position: absolute;
      right: 20px;
      top: -15px;
      width: 2px;
      height: 15px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 2px 5px -1px rgba(255, 255, 255, 1);
    }
  }
  .name {
    max-width: 170px;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    font-size: 16px;
    @include ell();
  }
  .location {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    flex-wrap: wrap;
    p {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      margin-right: 8px;
      .date {
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        font-size: 16px;
      }
      .week {
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        font-size: 12px;
      }
      .tems {
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        font-size: 12px;
      }
    }
  }
  .weather-con {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    flex-wrap: wrap;
    .tem {
      height: 40px;
      margin-right: 5px;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      line-height: 45px;
      font-size: 28px;
    }
    .wea {
      height: 40px;
      margin-right: 5px;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      line-height: 50px;
      font-size: 16px;
    }
    .air {
      height: 40px;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      line-height: 55px;
    }
    i {
      margin-right: 10px;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      line-height: 28px;
      font-size: 16px;
    }
  }
  p {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
}

img {
  content: normal !important;
}
.music {
  position: fixed;
  left: -200px;
  bottom: 100px;
  width: 220px;
  padding: 10px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 0px 5px 1px rgba(255, 255, 255, 1);
  background: #000;
  z-index: 11;
  transform: translateX(0px);
  transition: transform 0.5s ease;
  &.out {
    transform: translateX(200px);
    transition: transform 0.5s ease;
  }
  .img {
    overflow: hidden;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
    border: 1px solid #fff;
    box-shadow: 0 0px 10px 1px rgba(255, 255, 255, 1);
    img {
      width: 100%;
      object-fit: fill;
      &.on {
        animation: rotate 10s linear infinite;
      }
    }
  }
  .music-info {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    p {
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.29);
      white-space: nowrap;
    }
    .control-btn {
      #audio {
        display: none;
      }
      i {
        font-size: 20px;
        color: #fff;
        text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.29);
        cursor: pointer;
        &.icon-icon-2 {
          margin: 0 20px;
        }
        &.icon-icon-6 {
          margin: 0 20px;
        }
      }
    }
  }
  .right-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    cursor: pointer;
  }
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
