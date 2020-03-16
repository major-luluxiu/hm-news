<template>
  <div>
    <myheader>注册</myheader>
    <mylogo></mylogo>
    <hminput
      placeholder="用户名/手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hminput>
    <hminput
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,5}$/"
      message="昵称得3-7位"
      ref="nickname"
    ></hminput>
    <hminput
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式不对"
      ref="password"
    ></hminput>
    <mybutton @click="registerFn">注册</mybutton>
    <div class="to-login">
      已有账号? 去<router-link :to="{ name: 'login' }">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: ""
    }
  },
  methods: {
    registerFn() {
      let res1 = this.$refs.username.validate(this.username)
      let res2 = this.$refs.nickname.validate(this.nickname)
      let res3 = this.$refs.password.validate(this.password)

      if (!res1 || !res2 || !res3) {
        return
      }

      this.$axios({
        method: "POST",
        url: "/register",
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message)
          this.$router.push({
            name: "login",
            params: {
              username: this.username,
              password: this.password
            }
          })
        } else {
          this.$toast.fail(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.to-login {
  padding: 10px 10px;
  text-align: right;
  a {
    color: red;
  }
}
</style>
