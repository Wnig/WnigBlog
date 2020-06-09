import "@/assets/scss/reset.scss";
import "@/assets/alarm_iconfont/iconfont.css";
import "@/assets/planet_iconfont/iconfont.css";
import "@/assets/weather_iconfont/iconfont.css";
import "@/assets/music_iconfont/iconfont.css";
import App from "./App.vue";
import VueJsonp from "vue-jsonp";
import VueLazyload from "vue-lazyload";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import router from "./router";
import store from "./store";

// import VConsole from "vconsole";

// const vConsole = new VConsole();
import Loading from "./components/Loading/Loading";
import Loadings from "./components/Loadings/Loadings";
import WConfirm from "./components/wConfirm/wConfirm";
import Toast from "./components/toast/toast.js";

Vue.config.productionTip = false;
Vue.use(Loading);
Vue.use(Loadings);
Vue.use(WConfirm);
Vue.use(Toast);
Vue.use(VueJsonp);
Vue.use(VueLazyload);
Vue.use(mavonEditor);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "./assets/img/no_img.png",
  loading: "./assets/img/loading.gif",
  attempt: 10
});

router.beforeEach((to, from, next) => {
  // let reg = /^\/manage/i;
  if (
    to.path == "/manage" ||
    to.path == "/backstage" ||
    to.path == "/mywrite" ||
    to.path == "/mydetail"
  ) {
    if (sessionStorage.getItem("Access-Token")) {
      next();
    } else {
      next("/404");
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
