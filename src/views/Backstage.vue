<template>
  <div class="backstage ignore">
    <app-header></app-header>
    <div class="content">
      <div class="nav">
        <span
          @click="changeTab(item, index)"
          :class="{ 'sel-item': index == selIndex }"
          v-for="(item, index) in navList"
          :key="index"
          >{{ item.name }}</span
        >
      </div>
      <div class="article-con">
        <div class="tit">{{ TitName }}</div>
        <div class="art-list" v-if="list.length">
          <div class="art-list-con">
            <ul>
              <li v-for="(item, index) in list" :key="index">
                <div
                  class="
                  item"
                  @click="enterDetail(item)"
                >
                  <Icon
                    type="
                  ios-bookmark"
                    size="18"
                  />
                  <span>[{{ item.type_art | typeFilter }}]</span>
                  <p>{{ item.tit_art }}</p>
                </div>
                <div class="item">
                  <Icon type="ios-time" size="18" />
                  <span>{{ item.time_art }}</span>
                  <Icon v-if="status_art != 3" type="ios-create" size="18" />
                  <strong v-if="status_art != 3" @click="enterEdit(item)"
                    >编辑</strong
                  >
                  <Icon type="md-trash" size="18" />
                  <strong @click="deteleBtn(item)">{{
                    status_art != 3 ? "删除" : "彻底删除"
                  }}</strong>
                </div>
              </li>
            </ul>
          </div>
          <div class="page-con">
            <Page
              @on-change="handlePage"
              :total="total"
              :current.sync="pageNum"
              :page-size="pageSize"
            />
          </div>
        </div>
        <div v-else class="no-data">~暂无数据~</div>
      </div>
      <div class="search-list">
        <div class="search-list-con">
          <div class="title">关键词搜索</div>
          <div class="search">
            <Input
              placeholder="请输入关键字"
              style="width: 180px"
              v-model="key_word"
            />
            <Button @click="searchList" class="btn">搜索</Button>
          </div>
        </div>
        <div class="search-list-con">
          <div class="title">日期搜索</div>
          <div class="search">
            <DatePicker
              type="date"
              placeholder="请选择日期"
              style="width: 180px"
              v-model="time_art"
            ></DatePicker>
            <Button class="btn" @click="searchList">搜索</Button>
          </div>
        </div>
        <div class="search-list-con">
          <div class="title">分类搜索</div>
          <div class="search">
            <Select style="width:180px" v-model="type_art">
              <Option
                v-for="item in classList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
            <Button class="btn" @click="searchList">搜索</Button>
          </div>
        </div>
        <div class="search-list-con">
          <div class="title">时光流年</div>
          <div class="search">
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
                  <Icon class="alarm" type="ios-alarm" />
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
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>

    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import {
  artList,
  recycl,
  recyclDel,
  searchKeyword,
  searchDate
} from "@/api/http.js";
import moment from "moment";
import header from "@/components/header/header";
import footer from "@/components/footer/footer";
export default {
  name: "manage",
  components: {
    "app-header": header,
    "app-footer": footer
  },
  data() {
    return {
      loadShow: false,
      delModel: false,
      selIndex: 1,
      navList: [
        {
          status: "",
          name: "写文章",
          link: "mywrite"
        },
        {
          status: 1,
          name: "我的文章",
          link: "backstage"
        },
        {
          status: 2,
          name: "草稿箱",
          link: "backstage"
        },
        {
          status: 3,
          name: "回收站",
          link: "backstage"
        },
        {
          status: "",
          name: "编辑信息",
          link: "editInfo"
        },
        {
          status: "",
          name: "编辑相册",
          link: "editPhoto"
        }
      ],
      getWeekday: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      getTimeArr: [],
      alarmTime: null,
      week: 0,
      classList: [
        {
          value: "",
          label: "全部文章"
        },
        {
          value: 1,
          label: "我的日常"
        },
        {
          value: 2,
          label: "学习与积累"
        },
        {
          value: 3,
          label: "专业技术问题"
        }
      ],
      list: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      item: {},
      pageList: 0,
      type_art: "",
      key_word: "",
      time_art: "",
      status_art: 1,
      TitName: "我的文章"
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
    this.getArtList();
    this.alarmTimes = setInterval(this.getTime, 500);
  },
  methods: {
    changeTab(item, ind) {
      if (item.link === "backstage") {
        this.selIndex = ind;
        this.pageNum = 1;
        this.key_word = "";
        this.time_art = "";
        this.type_art = item.type;
        this.status_art = item.status;
        this.TitName = item.name;
        this.getArtList();
      } else {
        this.$router.push({ name: item.link });
      }
    },
    enterDetail(item) {
      this.$router.push(
        `/mydetail?status=${item.status_art}&id=${item.id_art}`
      );
    },
    getArtList() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status_art: this.status_art,
        type_art: this.type_art,
        key_word: this.key_word,
        time_art: this.time_art
          ? moment(this.time_art).format("YYYY-MM-DD")
          : ""
      };
      artList(obj).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.result;
          this.total = res.data.total;
          this.pageList = Math.ceil(this.total / this.pageSize);
        }
      });
    },
    searchList() {
      this.pageNum = 1;
      this.getArtList();
    },
    handlePage(size) {
      this.pageNum = size;
      this.getArtList();
    },
    enterEdit(item) {
      this.$router.push(`/mywrite?id=${item.id_art}&status=${item.status_art}`);
    },
    deteleBtn(item) {
      this.item = item;
      let message = "你确定要删了我吗？ಥ_ಥ";
      this.$wConfirm({
        message: message,
        noBtnName: "取消",
        yesBtnName: "确定",
        yesCallback: () => {
          if (this.status_art != 3) {
            let obj = {
              status_art: 3,
              id_art: this.item.id_art
            };
            recycl(obj).then(res => {
              this.pageNum = 1;
              this.getArtList();
            });
          } else {
            let obj = {
              status_art: 3,
              id_art: this.item.id_art
            };
            recyclDel(obj).then(res => {
              this.pageNum = 1;
              this.getArtList();
            });
          }
        }
      });
    },
    deteleEssay() {
      if (this.status_art != 3) {
        let obj = {
          status_art: this.status_art,
          id_art: this.item.id_art
        };
        recycl(obj).then(res => {});
      } else {
        let obj = {
          status_art: this.item.status_art,
          id_art: this.item.id_art
        };
        recyclDel(obj).then(res => {});
      }
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
.backstage.ignore {
  min-height: 100vh;
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 880px;
    min-height: 450px;
    margin: 0 auto 20px;
    padding: 13px 10px;
    border: 10px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    .nav {
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      width: 85px;
      padding-top: 45px;
      padding-bottom: 45px;
      border-radius: 4px;
      @include border-1px(#e6e6e6);
      span {
        margin-bottom: 10px;
        padding: 5px 10px;
        width: 100%;
        color: #fafafa;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        z-index: 1;
        &.sel-item {
          position: relative;
          font-weight: 700;
        }
        &.sel-item::after {
          content: "";
          position: absolute;
          left: -2px;
          top: 0;
          width: 3px;
          height: 100%;
          background: #fafafa;
          z-index: 99;
        }
      }
      span:hover {
        font-weight: 700;
      }
    }
    .article-con {
      position: relative;
      flex: 1;
      min-height: 470px;
      margin: 0 10px;
      border-radius: 4px;
      @include border-1px(#e6e6e6);
      .tit {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 10px 20px;
        color: #fafafa;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        @include border-bottom-1px(#e6e6e6);
      }
      .art-list {
        .art-list-con {
          margin-bottom: 10px;
          ul {
            padding: 0 12px;
            li {
              padding: 12px 0;
              border-bottom: 1px solid #fafafa;
              color: #fafafa;
              .item {
                display: flex;
                align-items: center;
                padding: 2px 0;
                font-size: 14px;
                cursor: pointer;
              }
              span {
                padding: 0 10px 0px 5px;
              }
              strong {
                padding: 0 10px 0px 5px;
              }
              p {
                width: 280px;
                @include ell();
              }
            }
          }
        }
        .page-con {
          padding: 10px;
          font-size: 12px;
        }
      }
      .no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        text-align: center;
        color: #fff;
      }
    }
    .search-list {
      .search-list-con {
        position: relative;
        margin-bottom: 20px;
        padding: 0 12px 12px 10px;
        border-radius: 4px;
        @include border-1px(#e6e6e6);
        .title {
          position: relative;
          padding: 5px;
          margin-bottom: 10px;
          color: #fafafa;
          line-height: 21px;
          font-size: 14px;
          font-weight: 700;
          @include border-bottom-1px(#e6e6e6);
        }
        .search {
          display: flex;
          align-items: center;
          justify-content: center;
          .input {
            flex: 1;
            border-radius: 4px;
            padding: 5px;
            @include border-1px(#e6e6e6);
            input {
              border: none;
              background: transparent;
              outline: none;
            }
          }
          .btn {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .footer {
    width: 880px;
    margin: auto;
  }
  #clock {
    position: relative;
    padding: 10px 5px;
    border-radius: 6px;
    text-align: center;
    background-color: #dddddd;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08) inset, 0 1px 1px #fafafa;
    .weekdays {
      width: 100%;
      font-size: 12px;
      span {
        opacity: 0.2;
        padding: 0 4px;
        &.active {
          opacity: 1;
        }
      }
    }
    .clock-time {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 10px 20px;
      .alarm {
        font-size: 24px;
        margin-right: 10px;
      }
      .digits {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        i {
          width: 20px;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
