import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import axios from "axios"
import { Toast } from "vant"

// 引用插件
Vue.use(Toast)

// 引入的样式
import "./styles/base.less"
import "./styles/iconfont.less"
import "lib-flexible"

//引入 全局组件
import MyHeader from "./components/myheader.vue"
import MyLogo from "./components/mylogo.vue"
import MyButton from "./components/mybutton.vue"
import HmInput from "./components/hmInput.vue"
import HmNavbar from "./components/hm-navbar.vue"

// 注册全局组件
Vue.component("myheader", MyHeader)
Vue.component("mylogo", MyLogo)
Vue.component("mybutton", MyButton)
Vue.component("hminput", HmInput)
Vue.component("hm-navbar", HmNavbar)

// 消除控制台提示
Vue.config.productionTip = false

// 拼接axios基础路径
axios.defaults.baseURL = "http://localhost:3000"
// axios与原型绑定
Vue.prototype.$axios = axios

// vue实例
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
