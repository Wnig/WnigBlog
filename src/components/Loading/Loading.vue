<template>
  <div>
    <div class="loading-container ignore"
         v-if="loadShow">
      <div class="container animation-6">
        <div class="shape shape1"></div>
        <div class="shape shape2"></div>
        <div class="shape shape3"></div>
        <div class="shape shape4"></div>
      </div>
    </div>
    <div class="loading-container i-mobile"
         v-if="loadShow">
      <div class="container animation-6">
        <div class="shape shape1"></div>
        <div class="shape shape2"></div>
        <div class="shape shape3"></div>
        <div class="shape shape4"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loading",
  props: {
    loadShow: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  methods: {},
  watch: {
    loadShow: function (val) {
      if (val) {
        setTimeout(() => {
          this.$parent.loadShow = false;
        }, this.duration);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-container.ignore {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 99999;
}
.ignore {
  .container {
    width: 30px;
    height: 30px;
    position: relative;
  }
  .container.animation-6 .shape {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }
  .container .shape {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 1px;
  }
}
.container.animation-6 {
  -webkit-animation: rotation 1s infinite;
  animation: rotation 1s infinite;
}
.container .shape.shape1 {
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.container .shape.shape2 {
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.container .shape.shape3 {
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.container .shape.shape4 {
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
}

.loading-container.i-mobile {
  display: none;
}
.i-mobile {
  .container {
    width: 60px;
    height: 60px;
    position: relative;
  }
  .container.animation-6 .shape {
    width: 24px;
    height: 24px;
    border-radius: 2px;
  }
  .container .shape {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 1px;
  }
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.animation-6 .shape1 {
  -webkit-animation: animation6shape1 2s linear 0s infinite normal;
  animation: animation6shape1 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape1 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}

@keyframes animation6shape1 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}
.animation-6 .shape2 {
  -webkit-animation: animation6shape2 2s linear 0s infinite normal;
  animation: animation6shape2 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape2 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}

@keyframes animation6shape2 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}
.animation-6 .shape3 {
  -webkit-animation: animation6shape3 2s linear 0s infinite normal;
  animation: animation6shape3 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape3 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}

@keyframes animation6shape3 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}
.animation-6 .shape4 {
  -webkit-animation: animation6shape4 2s linear 0s infinite normal;
  animation: animation6shape4 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape4 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
}

@keyframes animation6shape4 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
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
</style>
