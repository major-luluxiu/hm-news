import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import axios from "axios"
import moment from "moment"

// 过滤器
Vue.filter("date", function(input) {
  return moment(input).format("YYYY-MM-DD")
})

Vue.filter("date2", function(input) {
  const oldTime = new Date(input)
  const now = new Date()
  const minutes = (now - oldTime) / 1000 / 60
  const hours = ((now - oldTime) / 1000 / 60 / 60) | 0
  if (minutes <= 10) {
    return "刚刚"
  } else if (minutes <= 60 && minutes > 10) {
    return "1小时前"
  } else if (hours <= 24 && hours > 1) {
    return `${hours}小时前`
  } else {
    return moment(input).format("YYYY-MM-DD HH:mm:ss")
  }
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
  PullRefresh,
  Tab,
  Tabs
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
Vue.use(Tab)
Vue.use(Tabs)

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
  if (token) {
    config.headers.Authorization = token
  }
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
