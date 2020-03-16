<template>
  <div>
    <myheader>登录</myheader>
    <mylogo></mylogo>
    <hminput
      type="text"
      placehoder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hminput>

    <hminput
      type="password"
      placehoder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
      ref="password"
    ></hminput>
    <mybutton @login="login">登录</mybutton>
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
        if (res.data.statusCode === 200) {
          this.$toast.success("登录成功")
          this.$router.push("/user")
        } else {
          this.$toast.fail("登录失败")
        }
      })
    }
  },
  data() {
    return {
      username: "",
      password: ""
    }
  }
}
</script>

<style lang="less"></style>
