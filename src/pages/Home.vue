<template>
  <div>
    <div class="home">
      <!-- 头部 -->
      <div class="home-header">
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="search" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span>
          <span class="txt">搜索新闻</span>
        </div>
        <div class="personal" @click="$router.push('/user')">
          <span class="iconfont iconwode"></span>
        </div>
      </div>

      <!-- 导航条 -->
      <van-tabs v-model="active" sticky animated background="#E4E4E4" swipeable>
        <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
          <!-- 下拉刷新 -->
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <!-- 上拉加载 -->
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <hm-article
                v-for="post in postList"
                :key="post.id"
                :post="post"
              ></hm-article>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getTabs()
  },
  methods: {
    async getTabs() {
      const res = await this.$axios.get("/category")
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
      }
      this.getPost(this.tabList[this.active].id)
    },
    async getPost(id) {
      const res = await this.$axios.get("/post", {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      if (this.postList.length > 0 && this.pageIndex === 1) {
        this.postList = []
      }
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        data.forEach(item => {
          item.comments = item.comment_length
        })
        this.postList = [...this.postList, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.pageIndex++
      setTimeout(() => {
        this.getPost(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh() {
      this.pageIndex = 1
      setTimeout(() => {
        this.getPost(this.tabList[this.active].id)
      }, 1000)
      this.refreshing = false
      this.finished = false
    }
  },
  watch: {
    active(value) {
      this.postList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      const id = this.tabList[value].id
      setTimeout(() => {
        this.getPost(id)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: 49px;
  background-color: red;

  .logo,
  .personal {
    width: 54px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    color: #fff;
    span {
      font-size: 20px;
    }
    .iconnew {
      font-size: 70px;
    }
  }
  .search {
    flex: 1;
    height: 30px;
    border-radius: 15px;
    background-color: #cccc;
    text-align: center;
    line-height: 30px;
    margin-left: 15px;
    color: #fff;
    .txt {
      font-size: 15px;
      margin-left: 3px;
    }
  }
}
</style>
