import Toastcomponent from './toast.vue'
const Toast = {}
// 独立的组件
Toast.install = Vue => {
  const ToastConstructor = Vue.extend(Toastcomponent)
  const instace = new ToastConstructor()

  instace.$mount(document.createElement('div'))
  document.body.appendChild(instace.$el)

  Vue.prototype.$toast = (message, duration = 2000) => {
    instace.message = message
    instace.toastShow = true
    clearTimeout(instace.timer)
    instace.timer = setTimeout(() => {
      instace.toastShow = false
    }, duration)
  }
}
export default Toast
