<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"
                   :key="$route.fullpath" />
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"
                 :key="$route.fullpath"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data () {
    return {
    };
  },
  created () {
    var hiddenProperty =
      "hidden" in document
        ? "hidden"
        : "webkitHidden" in document
          ? "webkitHidden"
          : "mozHidden" in document
            ? "mozHidden"
            : null;
    var visibilityChangeEvent = hiddenProperty.replace(
      /hidden/i,
      "visibilitychange"
    );
    var onVisibilityChange = function () {
      if (!document[hiddenProperty]) {
        document.title = "I'm Wnig. - 我最害怕孤独，无法生存。";
      } else {
        document.title = "我藏好啦(つд⊂)";
      }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
html,
body {
  width: 100%;
  min-height: 100vh;
  background: #000;
}
#app {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>
