import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

import './styles/base.less'
import './styles/iconfont.less'
import 'lib-flexible'

import MyHeader from './components/myheader.vue'
import MyLogo from './components/mylogo.vue'
import MyButton from './components/mybutton.vue'

Vue.component('myheader', MyHeader)
Vue.component('mylogo', MyLogo)
Vue.component('mybutton', MyButton)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
