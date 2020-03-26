<template>
  <div>
    <myheader>登录</myheader>
    <mylogo></mylogo>
    <hminput
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hminput>

    <hminput
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
      ref="password"
    ></hminput>
    <mybutton @click="login">登录</mybutton>
    <div class="to-register">
      没有账号?<router-link to="/register">去注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      let res1 = this.$refs.username.validate(this.username)
      let res2 = this.$refs.password.validate(this.password)

      if (!res1 || !res2) {
        return
      }
      this.$axios({
        method: "post",
        url: "/login",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        const { data, statusCode, message } = res.data

        if (statusCode === 200) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user_id", data.user.id)
          this.$toast.success(message)
          const forced = this.$route.params.forced
          const id = this.$route.params.id
          if (forced === true) {
            this.$router.back()
          } else {
            this.$router.push("/user")
          }
        } else {
          this.$toast.fail(message)
        }
      })
    }
  },
  data() {
    return {
      username: "",
      password: ""
    }
  },
  created() {
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  }
}
</script>

<style lang="less" scoped>
.to-register {
  padding: 10px 10px;
  text-align: right;
  a {
    color: red;
  }
}
</style>
