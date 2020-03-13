import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})

export default router
