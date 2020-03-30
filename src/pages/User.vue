<template>
  <div>
    <myheader>个人中心</myheader>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <div class="name">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span class="sex">{{ info.nickname }}</span>
        </div>
        <span class="time">{{ info.create_date | date }}</span>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar
      title="关注"
      content="我的关注"
      @click="$router.push('/follows')"
    ></hm-navbar>
    <hm-navbar
      title="我的跟帖"
      content="喜欢/评论"
      @click="$router.push('/comment')"
    ></hm-navbar>
    <hm-navbar
      title="我的收藏"
      content="文章"
      @click="$router.push('/favorite')"
    ></hm-navbar>
    <hm-navbar title="首页" @click="$router.push('/')"></hm-navbar>
    <hm-navbar title="热点管理" @click="$router.push('/tab')"></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  created() {
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")
    this.$axios({
      method: "get",
      url: `/user/${user_id}`
    }).then(res => {
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    })
  },
  data() {
    return {
      info: {}
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确定退出吗?"
        })
        .then(() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user_id")
          this.$router.push("/login")
          this.$toast.success("退出成功")
        })
        .catch(() => {
          this.$toast("取消退出")
        })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 70px;
  align-items: center;
  padding: 10px 10px 10px 15px;
  border-bottom: 3px solid #ccc;
  .left {
    width: 70px;
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 5px;
    .name {
      .sex {
        padding-left: 5px;
        font-size: 16px;
      }
    }
    .time {
      color: #ccc;
    }
  }
  .right {
    span {
      font-size: 18px;
    }
  }
}
</style>
