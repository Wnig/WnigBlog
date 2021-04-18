<template>
  <div class="blog">
    <div class="ignore">
      <app-header></app-header>
      <div class="blog-con">
        <nav-list ref="nav-list"
                  :nowItem.sync="nowItem"
                  :nowIndex.sync="nowIndex"
                  @changeTab="changeTab()"></nav-list>
        <div class="right-con">
          <div class="content-area">
            <div class="art-list">
              <div class="article-cons">
                <div class="art-con">
                  <div class="tit">{{ detail.tit_art }}</div>
                  <div class="article markdown-body"
                       v-html="detail.con_art"></div>
                  <div class="aut-info">
                    <h2 class="author-heading">发布者</h2>
                    <div class="author-con">
                      <img class="author-avatar"
                           v-lazy="info.author_url"
                           alt="" />
                      <div class="author-description">
                        <h3 class="author-title">{{ info.author }}</h3>
                        <p class="author-bio">
                          {{ info.constellation }}
                          <span @click="enterPage">想了解{{ info.author }}吗？快点我｡◕ᴗ◕｡ →</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="art-bottom">
                  <Icon type="ios-calendar-outline"
                        size="20" />
                  <span class="time">{{ detail.time_art }}</span>
                  <Icon type="ios-folder-outline"
                        size="20" />
                  <span class="type">{{ detail.type_art | typeFilter }}</span>
                  <Icon type="ios-eye"
                        size="20" />
                  <span class="read">{{ detail.read_art }}</span>
                </div>
              </div>
            </div>
            <div class="nav">
              <div class="pre">
                <Icon custom="i-icon ivu-icon-ios-arrow-back"
                      size="20" />
              </div>
              <div class="nav-list">
                <span class="left"
                      @click="enterDetail(pageObj.preObj)">{{
                  pageObj.preObj ? pageObj.preObj.tit_art : "没有了~"
                }}</span>
                <span class="right"
                      @click="enterDetail(pageObj.nextObj)">{{
                  pageObj.nextObj ? pageObj.nextObj.tit_art : "没有了~"
                }}</span>
              </div>
              <div class="next">
                <Icon custom="i-icon ivu-icon-ios-arrow-forward"
                      size="20" />
              </div>
            </div>
          </div>
          <app-footer></app-footer>
          <loadings :loadShows="loadShows"></loadings>
        </div>
      </div>
      <loading :loadShow="loadShow"></loading>
    </div>
    <div class="i-mobile">
      <app-header @oepnMask="oepnMask"></app-header>
      <div class="blog-con">
        <nav-list ref="nav-list"
                  :isOpen.sync="isOpen"
                  :nowItem.sync="nowItem"
                  :nowIndex.sync="nowIndex"
                  @changeTab="changeTab()"
                  @closeMask="closeMask()"></nav-list>
        <div class="right-con">
          <div class="content-area">
            <div class="art-list">
              <div class="article-cons">
                <div class="art-con">
                  <div class="tit">{{ detail.tit_art }}</div>
                  <div class="article markdown-body"
                       v-html="detail.con_art"></div>
                  <div class="aut-info">
                    <h2 class="author-heading">发布者</h2>
                    <div class="author-con">
                      <img class="author-avatar"
                           v-lazy="info.author_url"
                           alt="" />
                      <div class="author-description">
                        <h3 class="author-title">{{ info.author }}</h3>
                        <p class="author-bio">
                          {{ info.constellation }}
                          <span @click="enterPage">想了解{{ info.author }}吗？快点我｡◕ᴗ◕｡ →</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="art-bottom">
                  <Icon type="ios-calendar-outline"
                        size="20" />
                  <span class="time">{{ detail.time_art }}</span>
                  <Icon type="ios-folder-outline"
                        size="20" />
                  <span class="type">{{ detail.type_art | typeFilter }}</span>
                  <Icon type="ios-eye"
                        size="20" />
                  <span class="read">{{ detail.read_art }}</span>
                </div>
              </div>
            </div>
            <div class="nav">
              <div class="pre">
                <Icon custom="i-icon ivu-icon-ios-arrow-back"
                      size="20" />
              </div>
              <div class="nav-list">
                <span class="left"
                      @click="enterDetail(pageObj.preObj)">{{
                  pageObj.preObj ? pageObj.preObj.tit_art : "没有了~"
                }}</span>
                <span class="right"
                      @click="enterDetail(pageObj.nextObj)">{{
                  pageObj.nextObj ? pageObj.nextObj.tit_art : "没有了~"
                }}</span>
              </div>
              <div class="next">
                <Icon custom="i-icon ivu-icon-ios-arrow-forward"
                      size="20" />
              </div>
            </div>
          </div>
          <app-footer></app-footer>
          <loadings :loadShows="loadShows"></loadings>
        </div>
      </div>
      <loading :loadShow="loadShow"></loading>
    </div>
  </div>
</template>

<script>
import { artDetail, getBlogInfo } from "@/api/http.js";
import nav from "@/components/nav/nav";
import header from "@/components/header/header";
import footer from "@/components/footer/footer";
export default {
  name: "blog",
  components: {
    "nav-list": nav,
    "app-header": header,
    "app-footer": footer
  },
  data () {
    return {
      loadShows: true,
      loadShow: true,
      nowIndex: -1,
      nowItem: {},
      titList: [
        {
          type: -1,
          name: "首页",
          describe: ""
        },
        {
          type: 0,
          name: "全部文章",
          describe: "没有伞的孩子必须努力奔跑。"
        },
        {
          type: 1,
          name: "我的日常",
          describe: "如果生命会说话，它一定说谢谢你爱它。"
        },
        {
          type: 2,
          name: "学习与积累",
          describe:
            "好好努力，你才可能变成自己所想的那种人，走自己想走的那条路。"
        },
        {
          type: 3,
          name: "专业技术问题",
          describe: "若人生掀起大浪，我就会迎风而上。"
        }
      ],
      detail: {},
      status_art: 1,
      pageObj: {},
      info: {},
      isOpen: false
    };
  },
  filters: {
    typeFilter (status) {
      const statusMap = {
        "1": "我的日常",
        "2": "学习与积累",
        "3": "专业技术问题"
      };
      return statusMap[status];
    }
  },
  created () {
    this.getArtDetail();
    this.getInfo();
  },
  methods: {
    changeTab () {
      if (this.nowItem.link === "blog") {
        this.$router.replace(
          `/${this.nowItem.link}?type_art=${this.nowItem.type}`
        );
      } else {
        this.$router.push({ name: this.nowItem.link });
      }
    },
    getArtDetail () {
      this.loadShows = true;
      let obj = {
        id_art: this.$route.query.id,
        status_art: this.status_art
      };
      artDetail(obj)
        .then(res => {
          if (res.data.code === 200) {
            if (
              res.data.result.type_art == 1 ||
              res.data.result.type_art == 2 ||
              res.data.result.type_art == 3 ||
              (res.data.result.type_art == 4 &&
                sessionStorage.getItem("Access-Token"))
            ) {
              this.detail = res.data.result;
              this.detail.con_art = this.detail.con_art.replace(
                /&amp;lt;/g,
                "<"
              );
              this.detail.con_art = this.detail.con_art.replace(
                /&amp;gt;/g,
                ">"
              );
              this.detail = Object.assign({}, this.detail);
              this.pageObj = {
                preObj: res.data.preObj,
                nextObj: res.data.nextObj
              };
            } else {
              this.detail = {};
            }
          }
        })
        .catch(data => {
          console.log(data);
        })
        .finally(() => {
          this.loadShow = false;
          this.loadShows = false;
        });
    },
    enterDetail (item) {
      if (item) {
        this.$router.replace(`/detail?id=${item.id_art}`);
        this.getArtDetail();
      }
    },
    getInfo () {
      getBlogInfo().then(res => {
        if (res.data.code === 200) {
          this.info = res.data.result[0];
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    enterPage () {
      this.$router.replace("/about");
    },
    oepnMask () {
      this.isOpen = true
    },
    closeMask () {
      this.isOpen = false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.blog {
  min-height: 100vh;
  .ignore {
    .blog-con {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: 880px;
      margin: auto;
      .right-con {
        position: relative;
        width: 665px;
      }
      .content-area {
        width: 100%;
        .title {
          margin-bottom: 20px;
          padding: 20px;
          border-radius: 4px;
          border-left: 10px solid #333;
          background: #fff;
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          h1 {
            margin-bottom: 5px;
            color: #fff;
            font-size: 18px;
          }
          p {
            color: rgba(51, 51, 51, 0.7);
            font-size: 12px;
          }
        }
        .content {
          position: relative;
          min-height: 20vw;
          padding: 15px;
          border-radius: 5px;
          background: #fff;
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          .no-data {
            width: 100%;
            height: 20vw;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }
        }
        .art-list {
          .article-cons {
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
            .art-con {
              padding: 20px;
              .tit {
                margin-bottom: 20px;
                color: #fff;
                font-size: 24px;
                text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
              }
              .article {
                margin-bottom: 50px;
                color: #fafafa;
                font-size: 16px;
              }
            }
            .art-bottom {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              padding: 1vw 2vw;
              border-radius: 0 0 4px 4px;
              color: #fff;
              background: rgba(255, 255, 255, 0.1);
              span {
                position: relative;
                margin: 0 20px 0 5px;
                color: #fafafa;
                font-size: 14px;
                &.read {
                  margin-right: 0;
                }
              }
            }
            .aut-info {
              .author-heading {
                position: relative;
                padding: 20px 0;
                line-height: 30px;
                color: #fafafa;
                font-size: 18px;
                @include border-top-1px(#e6e6e6);
              }
              .author-con {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .author-avatar {
                  width: 36px;
                  border-radius: 50%;
                  margin-right: 10px;
                }
                .author-description {
                  display: flex;
                  align-items: flex-start;
                  justify-content: flex-start;
                  flex-direction: column;
                  width: 100%;
                  color: #fff;
                  h3 {
                    font-weight: 700;
                    font-size: 18px;
                  }
                  p {
                    font-size: 12px;
                    span {
                      margin-left: 10px;
                      opacity: 0.8;
                      color: #fff;
                      font-size: 12px;
                      border-bottom: 1px solid #fafafa;
                      cursor: pointer;
                    }
                    span:hover {
                      opacity: 1;
                    }
                  }
                }
              }
            }
          }
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 20px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          .pre {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 5px 0 0 5px;
            background: rgba(255, 255, 255, 0.1);
            .i-icon {
              color: #ccc;
            }
          }
          .next {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 0 5px 5px 0;
            background: rgba(255, 255, 255, 0.1);
            .i-icon {
              color: #ccc;
            }
          }
          .nav-list {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 577px;
            height: 44px;
            span {
              flex: 1;
              width: 25vw;
              padding: 0 20px;
              color: #bdbdbd;
              font-size: 14px;
              line-height: 44px;
              @include ell();
            }
            .left {
              text-align: left;
            }
            .right {
              text-align: right;
            }
            span:hover {
              color: #fafafa;
              cursor: pointer;
            }
            .active {
              color: #000;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .i-mobile {
    display: none;
    .blog-con {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin: auto;
      .right-con {
        position: relative;
      }
      .content-area {
        width: 100%;
        .title {
          margin-bottom: 20px;
          padding: 20px;
          border-radius: 5px;
          border-left: 10px solid #333;
          background: #fff;
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          h1 {
            margin-bottom: 5px;
            color: #000;
            font-size: 36px;
          }
          p {
            color: rgba(51, 51, 51, 0.7);
            font-size: 24px;
          }
        }
        .content {
          position: relative;
          min-height: 20vw;
          padding: 15px;
          border-radius: 5px;
          background: #fff;
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          .no-data {
            width: 100%;
            height: 20vw;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }
        }
        .art-list {
          .article-cons {
            border-radius: 5px;
            background: #fff;
            box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
            .art-con {
              padding: 40px;
              .tit {
                margin-bottom: 20px;
                color: #000;
                font-size: 48px;
                text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
              }
              .article {
                margin-bottom: 50px;
                color: #403f3f;
                font-size: 32px;
              }
            }
            .art-bottom {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              padding: 2vw 4vw;
              border-radius: 0 0 5px 5px;
              background-color: #f7f7f7;
              span {
                position: relative;
                margin: 0 10px 0 5px;
                color: #333;
                font-size: 24px;
                &.read {
                  margin-right: 0;
                }
              }
            }
            .aut-info {
              .author-heading {
                position: relative;
                padding: 20px 0;
                line-height: 30px;
                color: #707070;
                font-size: 36px;
                @include border-top-1px(#e6e6e6);
              }
              .author-con {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .author-avatar {
                  width: 72px;
                  border-radius: 50%;
                  margin-right: 10px;
                }
                .author-description {
                  display: flex;
                  align-items: flex-start;
                  justify-content: flex-start;
                  flex-direction: column;
                  width: 100%;
                  h3 {
                    font-weight: 700;
                    font-size: 36px;
                  }
                  p {
                    font-size: 24px;
                    span {
                      margin-left: 20px;
                      opacity: 0.8;
                      color: #000;
                      font-size: 24px;
                      border-bottom: 1px solid #333;
                      cursor: pointer;
                    }
                    span:hover {
                      opacity: 1;
                    }
                  }
                }
              }
            }
          }
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 20px;
          border-radius: 5px;
          background: #fff;
          box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
          .pre {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 88px;
            height: 88px;
            border-radius: 5px 0 0 5px;
            background: #333;
            .i-icon {
              font-size: 40px;
              color: #ccc;
            }
          }
          .next {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 88px;
            height: 88px;
            border-radius: 0 5px 5px 0;
            background: #333;
            .i-icon {
              font-size: 40px;
              color: #ccc;
            }
          }
          .nav-list {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 88px;
            span {
              flex: 1;
              width: 25vw;
              padding: 0 20px;
              color: #bdbdbd;
              font-size: 28px;
              line-height: 88px;
              @include ell();
            }
            .left {
              text-align: left;
            }
            .right {
              text-align: right;
            }
            span:hover {
              color: #000;
              cursor: pointer;
            }
            .active {
              color: #000;
              cursor: pointer;
            }
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
      display: block;
    }
  }
}
</style>
<style lang="scss">
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  color: #000;
}
pre code {
  display: block;
}
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}

.markdown-body pre > code {
  white-space: pre-wrap;
  // white-space: break-spaces;
  word-break: break-word;
}

.i-mobile {
  .pre,
  .next {
    .ivu-icon {
      font-size: 40px !important;
      line-height: 88px;
    }
  }
}
</style>
