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
    ></hminput>

    <hminput
      type="password"
      placehoder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
    ></hminput>
    <mybutton @login="login">登录</mybutton>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$axios({
        method: "post",
        url: "/login",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.statusCode === 200) {
          this.$router.push("/user")
        } else {
          alert(res.data.message)
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
