<template>
  <div class="confirm"
       v-if="isShow">
    <div class="box">
      <h1>{{title}}</h1>
      <div class="message"
           v-html="message"></div>
      <div class="footers">
        <div class="btn-1"
             v-if="noBtnName !== null"
             @click="closeBox">{{noBtnName}}</div>
        <div class="btn-2"
             @click="yesCallBack">{{yesBtnName}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'confirm',
  data () {
    return {
      isShow: false,
      title: '提示',
      message: '',
      noBtnName: '取消',
      yesBtnName: '确定',
      noCallback: null,
      yesCallback: null
    }
  },
  methods: {
    closeBox () {
      this.isShow = false
      if (this.noCallback !== null) {
        this.noCallback()
      }
    },
    yesCallBack () {
      this.isShow = false
      if (this.yesCallback !== null) {
        this.yesCallback()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  .box {
    width: 300px;
    min-width: 250px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h1 {
      width: 100%;
      font-size: 20px;
      padding-top: 15px;
      color: #333;
      text-align: center;
    }
    .message {
      padding: 10px;
      font-size: 14px;
      color: #333;
      word-break: break-all;
      text-align: center;
    }
    .footers {
      width: 100%;
      height: 50px;
      color: #333;
      font-size: 14px;
      border-top: 1px solid #f0f0f0;
      display: flex;
      justify-content: center;
      .btn-1,
      .btn-2 {
        min-width: 50%;
        max-width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
      }
      .btn-1 {
        color: #333;
        border-right: 1px solid #f0f0f0;
      }
      .btn-2 {
        color: #2d8cf0;
      }
    }
  }
}
</style>
