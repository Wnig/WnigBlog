<template>
  <div class="footer">
    <p>❤我不相信所谓的命运，我只相信我自己。❤</p>
    <p>
      Copyright ©2017 Powered By Wnig 闽ICP备18014223号
    </p>
    <p>
      <span>总访问量：{{ totalVis }}</span
      ><span>访客数：{{ visitors }}</span>
    </p>
  </div>
</template>

<script>
import { counter } from "@/api/http.js";
export default {
  data() {
    return {
      visitors: 0,
      totalVis: 0
    };
  },
  created() {
    this.getCounter();
  },
  methods: {
    // 统计访问人数
    getCounter() {
      counter().then(res => {
        if (res.data.code === 200) {
          this.visitors = res.data.counter;
          this.totalVis = res.data.total;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.footer {
  width: 100%;
  margin-top: 20px;
  padding: 20px 50px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
  p {
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    span {
      margin: 0 10px;
    }
  }
}
</style>
