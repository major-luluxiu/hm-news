<template>
  <div style="background-color: rgba(242, 242, 242, 0.5)">
    <myheader>我的跟帖</myheader>

    <div class="list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          :offset="20"
          @load="onLoad"
        >
          <div class="my-comment" v-for="item in list" :key="item.id">
            <div class="date">{{ item.create_date }}</div>
            <div class="parent-comment" v-if="item.parent">
              <div class="parent-name">
                回复:{{ item.parent.user.nickname }}
              </div>
              <div class="parent-content">{{ item.parent.content }}</div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="link">
              <div class="title ">原文:{{ item.post.title }}</div>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    async renderComment() {
      const res = await this.$axios({
        method: "get",
        url: "/user_comments",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        this.loading = false
        this.isLoading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.renderComment()
      }, 2000)
    },
    onRefresh() {
      console.log(11)
      this.list = []
      this.pageIndex = 1
      this.renderComment()
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
  touch-action: none;
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
