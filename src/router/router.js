import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import User from "../pages/User.vue"
import Edit from "../pages/Edit.vue"
import Myfollows from "../pages/Myfollows.vue"
import Comment from "../pages/Comment.vue"
import Myfavorite from "../pages/Myfavorite.vue"

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", name: "login", component: Login },
    { path: "/register", component: Register },
    { path: "/user", component: User },
    { path: "/edit", name: "edit", component: Edit },
    { path: "/follows", name: "follows", component: Myfollows },
    { path: "/comment", name: "comment", component: Comment },
    { path: "/favorite", name: "favorite", component: Myfavorite }
  ]
})

// 将所有需要权限的路由放到数组中
const authURL = ["/user", "/edit", "/follows", "/favorite"]

router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem("token")
  if (authURL.includes(to.path)) {
    if (token) {
      next()
    } else {
      next("/login")
    }
  } else {
    next()
  }
})
export default router
