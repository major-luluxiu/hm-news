<template>
  <div style="background-color: rgba(242, 242, 242, 1)">
    <myheader>我的跟帖</myheader>
    <div class="my-comment" v-for="item in list" :key="item.id">
      <div class="date">{{ item.create_date }}</div>
      <div class="parent-comment" v-if="item.parent">
        <div class="parent-name">回复:{{ item.parent.user.nickname }}</div>
        <div class="parent-content">{{ item.parent.content }}</div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="link">
        <div class="title ">原文:{{ item.post.title }}</div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: "",
      pageIndex: 1,
      pageSize: 10
    }
  },
  methods: {
    renderComment() {
      this.$axios({
        method: "get",
        url: "/user_comments"
      }).then(res => {
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.list = data
        }
      })
    }
  },
  created() {
    this.renderComment()
  }
}
</script>

<style lang="less" scoped>
.my-comment {
  padding: 10px 20px 0;
  border-bottom: 1px solid #ccc;
  .date {
    padding: 10px 0;
    color: #ccc;
  }
  .parent-comment {
    padding: 10px;
    background-color: #ccc;
    .parent-name {
      padding: 3px;
    }
    .parent-content {
      padding: 3px;
    }
  }
  .content {
    padding-top: 7px;
    font-size: 14px;
  }
  .link {
    display: flex;
    padding: 5px 0;
    justify-content: space-between;

    .title {
      font-size: 14px;
      color: #ccc;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
