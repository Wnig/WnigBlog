<template>
  <div class="blog ignore">
    <app-header></app-header>
    <div class="blog-con">
      <nav-list
        ref="nav-list"
        :nowItem.sync="nowItem"
        :nowIndex.sync="nowIndex"
        @changeTab="changeTab()"
      ></nav-list>
      <div class="right-con">
        <div class="article-cons">
          <div class="art-con">
            <div class="tit">关于我</div>
            <div class="article markdown-body" v-html="introduce"></div>
          </div>
        </div>
        <app-footer></app-footer>
      </div>
    </div>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import { getBlogInfo } from "@/api/http.js";
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
  data() {
    return {
      loadShow: false,
      nowIndex: 7,
      nowItem: {},
      selIndex: 1,
      introduce: ""
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    changeTab() {
      if (this.nowItem.link === "blog") {
        this.$router.replace(
          `/${this.nowItem.link}?type_art=${this.nowItem.type}`
        );
      } else {
        this.$router.push({ name: this.nowItem.link });
      }
    },
    getInfo() {
      getBlogInfo().then(res => {
        if (res.data.code === 200) {
          this.introduce = res.data.result[0].introduce;
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
.blog.ignore {
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
          color: #403f3f;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
