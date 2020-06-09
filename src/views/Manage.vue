<template>
  <div class="manage">
    <app-header :isClick.sync="isClick"
                @preBtn="enterBlog"
                @nextBtn="enterBackstage"></app-header>
    <div class="content">
      <div class="img-show">
        <div class="img-con">
          <img src="@/assets/img/img_12.jpg"
               alt="">
          <img src="@/assets/img/img_03.jpg"
               alt="">
        </div>
        <div class="img-con">
          <img src="@/assets/img/img_14.jpg"
               alt="">
          <img src="@/assets/img/img_13.jpg"
               alt="">
        </div>
      </div>
      <div class="says">
        <p class="say">❤태어나서 널 만나고 죽을 만큼 사랑하고❤</p>
        <p class="say">我有一个男朋友，<br />
          我很爱他，他也很爱我，<br />
          甚至我嫁不出去都会娶我。<br />
          他受伤从来不让我知道，<br />
          他写的歌词都是亲身感受，<br />
          他不让我染头发，<br />
          说我喜欢什么颜色他染给我看。<br />
          他向全世界承认我是他的女朋友，<br />
          他说喜欢笑是因为我喜欢他微笑的样子，<br /> 他说只要不是他说的都不要信，<br />
          他说我是他坚持下来的动力，<br />
          他说他要服兵役，我说愿意等。<br />
          只是我们还不认识。
        </p>
        <p class="say">❤나 정말 너 좋아해.❤</p>
        <p class="say say-from">from : 无所畏惧的小射手♬</p>
      </div>
    </div>
    <app-footer></app-footer>
    <loading :loadShow="loadShow"></loading>
  </div>
</template>

<script>
import header from '@/components/header/header'
import footer from '@/components/footer/footer'
export default {
  name: 'manage',
  components: {
    'app-header': header,
    'app-footer': footer
  },
  data () {
    return {
      loadShow: false,
      selIndex: 1,
      isClick: true
    }
  },
  created () {

  },
  methods: {
    enterBlog () {
      this.$router.push({ 'name': 'blog' })
    },
    enterBackstage () {
      this.$router.push({ 'name': 'backstage' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.manage {
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
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 880px;
    min-height: 450px;
    margin: 0 auto 20px;
    padding: 13px;
    border: 10px solid #333;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
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
          width: 250px;
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
