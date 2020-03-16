import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import axios from "axios"
import { Toast } from "vant"

Vue.use(Toast)

import "./styles/base.less"
import "./styles/iconfont.less"
import "lib-flexible"

import MyHeader from "./components/myheader.vue"
import MyLogo from "./components/mylogo.vue"
import MyButton from "./components/mybutton.vue"
import HmInput from "./components/hmInput.vue"

Vue.component("myheader", MyHeader)
Vue.component("mylogo", MyLogo)
Vue.component("mybutton", MyButton)
Vue.component("hminput", HmInput)

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
