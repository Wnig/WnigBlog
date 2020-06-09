import WConfirmcomponent from './wConfirm.vue'
const WConfirm = {}
// 独立的组件
WConfirm.install = Vue => {
  const WConfirmConstructor = Vue.extend(WConfirmcomponent)
  const instace = new WConfirmConstructor()

  instace.$mount(document.createElement('div'))
  document.body.appendChild(instace.$el)

  Vue.prototype.$wConfirm = options => {
    if (options) {
      instace.title = options.title ? options.title : '提示'
      instace.message = options.message ? options.message : ''
      if (options.noBtnName || options.noBtnName === null) {
        instace.noBtnName = options.noBtnName
      }
      options.yesBtnName && (instace.yesBtnName = options.yesBtnName)
      instace.noCallback = options.noCallback ? options.noCallback : null
      instace.yesCallback = options.yesCallback ? options.yesCallback : null
    }
    instace.isShow = true
  }
}
export default WConfirm
