import LoadingComponent from "./Loadings.vue";
// 组件
let Loadings = {};
Loadings.install = Vue => {
  Vue.component("loadings", LoadingComponent);
};
export default Loadings;
