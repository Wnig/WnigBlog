<template>
  <div class="nofound ignore">
    <div class="menu">
      <span
        v-for="(item, index) in navData"
        :key="index"
        @click="jumpPage(item)"
        >{{ item.name }}</span
      >
    </div>
    <div class="content">
      <h1>404</h1>
      <p>
        对不起，你要找的这个页面突然不见了。不过，放心，一切都在我的掌控之中，不会跑多远！
      </p>
    </div>
    <div id="clock" class="light">
      <div class="display">
        <div class="weekdays">
          <span
            :class="{ active: week == index }"
            v-for="(item, index) in getWeekday"
            :key="index"
            >{{ item }}</span
          >
        </div>
        <div class="clock-time">
          <Icon class="alarm" type="ios-alarm" color="#fff" size="35" />
          <div class="digits">
            <i
              class="iconfont"
              v-for="(item, index) in getTimeArr"
              :key="index"
              :class="{
                'icon-shuzi0': item == '0',
                'icon-shuzi1': item == '1',
                'icon-shuzi2': item == '2',
                'icon-shuzi3': item == '3',
                'icon-shuzi4': item == '4',
                'icon-shuzi5': item == '5',
                'icon-shuzi6': item == '6',
                'icon-shuzi7': item == '7',
                'icon-shuzi8': item == '8',
                'icon-shuzi9': item == '9',
                'icon-icon50': item == ':'
              }"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>❤我不相信所谓的命运，我只相信我自己。❤</p>
      <p>Copyright ©2017 Powered By Wnig 闽ICP备18014223号</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "nofound",
  data() {
    return {
      getWeekday: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      getTimeArr: [],
      alarmTime: null,
      week: 0,
      navData: [
        {
          name: "Home",
          link: "home",
          type: ""
        },
        {
          name: "Blog",
          link: "blog",
          type: ""
        },
        {
          name: "Photograph",
          link: "photograph"
        },
        {
          name: "Archives",
          link: "archives"
        },
        {
          name: "About",
          link: "about"
        }
      ]
    };
  },
  created() {
    this.alarmTimes = setInterval(this.getTime, 500);
  },
  methods: {
    jumpPage(item) {
      this.$router.replace({ name: item.link });
    },
    getWeek() {
      return this.getWeekday[this.week];
    },
    getTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      // 获取当前星期几
      this.week = new Date().getDay();
      let dd = new Date().getDate();
      let hh =
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : `${new Date().getHours()}`;
      let mf =
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : `${new Date().getMinutes()}`;
      let ss =
        new Date().getSeconds() < 10
          ? `0${new Date().getSeconds()}`
          : `${new Date().getSeconds()}`;

      this.getTimeArr[0] = hh.split("")[0];
      this.getTimeArr[1] = hh.split("")[1];
      this.getTimeArr[2] = ":";
      this.getTimeArr[3] = mf.split("")[0];
      this.getTimeArr[4] = mf.split("")[1];
      this.getTimeArr[5] = ":";
      this.getTimeArr[6] = ss.split("")[0];
      this.getTimeArr[7] = ss.split("")[1];
      this.getTimeArr = Object.assign([], this.getTimeArr);
      this.isWeek = 2;
    }
  },
  destroyed() {
    clearInterval(this.getTime);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.nofound.ignore {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    span {
      position: relative;
      flex: 1;
      padding: 20px;
      color: #fff;
      opacity: 0.5;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        opacity: 1;
        transition: all 0.2s ease-in;
      }
    }
  }
  .content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;
    padding: 20px 0;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    h1 {
      margin-bottom: 10px;
      color: #fff;
      font-size: 60px;
      font-weight: 700;
    }
    p {
      font-size: 14px;
      color: #fff;
    }
    &::after {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: -30px;
      margin: auto;
      width: 1px;
      height: 30px;
      background: #fff;
    }
  }
  #clock {
    position: relative;
    margin-top: 30px;
    padding: 10px 10px;
    text-align: center;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    .weekdays {
      width: 100%;
      font-size: 18px;
      span {
        color: #fff;
        opacity: 0.2;
        padding: 0 8px;
        &.active {
          opacity: 1;
        }
      }
    }
    .clock-time {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 5px 20px;
      .iconfont {
        color: #fff;
      }
      .alarm {
        margin-right: 10px;
      }
      .digits {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        i {
          width: 35px;
          font-size: 35px;
        }
      }
    }
    &::after {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: -30px;
      margin: auto;
      width: 1px;
      height: 30px;
      background: #fff;
    }
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    color: #fff;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    z-index: 10;
  }
}
</style>
