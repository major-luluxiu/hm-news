<template>
  <div class="myfollows">
    <myheader>我的关注</myheader>
    <div class="person" v-for="item in list" :key="item.id">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
      </div>
      <div class="info">
        <div class="name">
          {{ item.nickname }}
        </div>
        <div class="date">
          {{ item.create_date | date }}
        </div>
      </div>
      <div class="choice" @click="cancel(item.id)">
        取消关注
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getFollowList()
  },
  methods: {
    getFollowList() {
      this.$axios({
        method: "get",
        url: "/user_follows"
      }).then(res => {
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.list = data
        }
      })
    },
    cancel(id) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确认要取消关注吗?"
        })
        .then(() => {
          this.$axios({
            method: "get",
            url: `/user_unfollow/${id}`
          }).then(res => {
            const { message, statusCode } = res.data
            if (statusCode === 200) {
              this.getFollowList()
              this.$toast.success(message)
            }
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.person {
  display: flex;
  align-items: center;
  padding: 10px 25px;
  border-bottom: 1px solid #ccc;
  .avatar {
    img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    padding: 15px;
    .name {
      color: black;
      font-size: 16px;
    }
    .date {
      color: #666;
    }
  }
  .choice {
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: #ccc;
  }
}
</style>
