<template>
  <div class="blog">
    <app-header></app-header>
    <div class="blog-con">
      <nav-list ref="nav-list"
                :nowItem.sync="nowItem"
                :nowIndex.sync="nowIndex"
                @changeTab="changeTab()"></nav-list>
      <div class="right-con">
        <div class="article-cons">
          <div class="art-con">
            <div class="tit">归档</div>
            <div class="article">
              <div class="list"
                   v-for="(item, index) in list"
                   :key="index">
                <div class="year"
                     v-if="item.isYare">
                  {{ item.time_art.substring(0, 4) }}
                </div>
                <div class="art-link">
                  <div class="link"
                       @click="enterDetail(item)">
                    {{ item.tit_art }}
                  </div>
                  <span>{{item.time_art.substring(0, 10)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
      </div>
    </div>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { artsList } from "@/api/http.js";
import nav from '@/components/nav/nav'
import header from '@/components/header/header'
import footer from '@/components/footer/footer'
export default {
  name: "blog",
  components: {
    'nav-list': nav,
    'app-header': header,
    'app-footer': footer
  },
  data () {
    return {
      loadShow: true,
      nowIndex: 6,
      nowItem: {},
      status_art: 1,
      list: []
    };
  },
  created () {
    this.getAll();
  },
  methods: {
    changeTab () {
      if (this.nowItem.link === "blog") {
        this.$router.replace(`/${this.nowItem.link}?type_art=${this.nowItem.type}`);
      } else {
        this.$router.push({ name: this.nowItem.link });
      }
    },
    getAll () {
      let obj = {
        status_art: this.status_art
      };
      artsList(obj)
        .then(res => {
          if (res.data.code === 200) {
            this.list = res.data.result;
            let yare = null;
            let month = null;
            let date = null;
            for (let i = 0; i < this.list.length; i++) {
              if (i === 0) {
                this.list[i].isYare = true;
                this.list[i].isMonth = true;
                this.list[i].isDate = true;
                yare = this.list[i].time_art.substring(0, 4);
                month = this.list[i].time_art.substring(5, 7);
                date = this.list[i].time_art.substring(8, 10);
              } else {
                if (this.list[i].time_art.substring(0, 4) === yare) {
                  this.list[i].isYare = false;
                  if (this.list[i].time_art.substring(5, 7) === month) {
                    this.list[i].isMonth = false;
                    if (this.list[i].time_art.substring(8, 10) === date) {
                      this.list[i].isDate = false;
                    } else {
                      this.list[i].isDate = true;
                      date = this.list[i].time_art.substring(8, 10);
                    }
                  } else {
                    this.list[i].isMonth = true;
                    this.list[i].isDate = true;
                    month = this.list[i].time_art.substring(5, 7);
                    date = this.list[i].time_art.substring(8, 10);
                  }
                } else {
                  this.list[i].isYare = true;
                  this.list[i].isMonth = true;
                  this.list[i].isDate = true;
                  yare = this.list[i].time_art.substring(0, 4);
                  month = this.list[i].time_art.substring(5, 7);
                  date = this.list[i].time_art.substring(8, 10);
                }
              }
            }
          }
        })
        .catch(data => {
          console.log(data);
        })
        .finally(() => {
          this.loadShow = false;
        });
    },
    enterDetail (item) {
      this.$router.push(`/detail?id=${item.id_art}`);
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
      width: 665px;
    }
    .article-cons {
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
      .art-con {
        padding: 20px;
        .tit {
          margin-bottom: 20px;
          color: #000;
          font-size: 24px;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        }
        .article {
          margin-bottom: 50px;
          .year {
            padding-left: 5px;
            margin: 20px auto 5px;
            color: #403f3f;
            font-size: 20px;
            font-style: italic;
          }
          .art-link {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0 35px;
            margin-bottom: 10px;
            .link {
              flex: 1;
              color: #bababa;
              font-size: 14px;
              cursor: pointer;
              &:hover {
                color: #403f3f;
                opacity: 0.8;
              }
            }
            span {
              color: #403f3f;
              font-size: 14px;
              font-style: italic;
            }
          }
        }
      }
    }
  }
}
</style>
