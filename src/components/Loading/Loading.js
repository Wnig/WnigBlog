import LoadingComponent from './Loading.vue'
// 组件
let Loading = {}
Loading.install = Vue => {
  Vue.component('loading', LoadingComponent)
}
export default Loading
