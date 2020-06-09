<template>
  <transition name="fade">
    <div class="toast" v-if="toastShow">{{ message }}</div>
  </transition>
</template>
<script>
export default {
  name: "toast",
  data() {
    return {
      toastShow: false,
      message: "",
      timer: null
    };
  }
};
</script>
<style lang="scss" scoped>
.toast {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 175px;
  height: auto;
  max-height: 50vh;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  word-break: break-all;
  .fade-leave-active {
    transition: 0.3s ease-out;
  }
  .fade-enter {
    opacity: 0;
    transform: scale(1.2);
  }
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
