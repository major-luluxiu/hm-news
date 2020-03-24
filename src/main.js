import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import axios from "axios"
import moment from "moment"

Vue.filter("date", function(input) {
  return moment(input).format("YYYY-MM-DD")
})
import {
  Toast,
  Dialog,
  Field,
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Uploader,
  Button,
  List,
  PullRefresh
} from "vant"

// 引用插件
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(List)
Vue.use(PullRefresh)

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
import HmArticle from "./components/hm-article.vue"

// 注册全局组件
Vue.component("myheader", MyHeader)
Vue.component("mylogo", MyLogo)
Vue.component("mybutton", MyButton)
Vue.component("hminput", HmInput)
Vue.component("hm-navbar", HmNavbar)
Vue.component("hm-article", HmArticle)

// 消除控制台提示
Vue.config.productionTip = false

// axios响应拦截
axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === "用户信息验证失败") {
    router.push("/login")
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    Toast.fail(message)
  }
  return res
})

// axios的请求拦截
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = token
  return config
})
// 拼接axios基础路径
axios.defaults.baseURL = "http://localhost:3000"
// axios与原型绑定
Vue.prototype.$axios = axios

// vue实例
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
