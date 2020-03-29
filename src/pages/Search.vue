<template>
  <div class="search1">
    <div class="search">
      <!-- 头部 -->
      <div class="title">
        <div class="left" @click="back">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="center">
          <span class="iconfont iconsearch"></span>
          <input
            type="text"
            v-model="keyword"
            placeholder="请输入关键字"
            @keyup.enter="search"
            @input="recmend"
          />
        </div>
        <div class="right" @click="search">搜索</div>
      </div>
      <!-- 新闻 -->
      <div class="search-list" v-if="searchList.length > 0">
        <hm-article v-for="item in searchList" :key="item.id" :post="item">
        </hm-article>
      </div>
      <!-- 搜索推荐 -->
      <div
        class="recmend"
        v-else-if="recmendList.length > 0"
        v-for="item in recmendList"
        :key="item.id"
        @click="historySearch(item.title)"
      >
        <div class="item">
          {{ item.title }}
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
      <!-- 历史记录和热点 -->
      <div class="main" v-else>
        <h4>历史记录</h4>
        <div class="history">
          <div
            class="item"
            v-for="item in history"
            :key="item"
            @click="historySearch(item)"
          >
            {{ item }}
          </div>
        </div>
        <h4>热门搜索</h4>
        <div class="hot">
          <div
            class="item"
            v-for="item in hotList"
            :key="item"
            @click="historySearch(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      searchList: [],
      history: [],
      hotList: [],
      recmendList: []
    }
  },
  // 初始渲染历史记录
  created() {
    const history = localStorage.getItem("history")
    if (history) {
      this.history = JSON.parse(history)
    }
    this.hotList = [
      "复工",
      "新馆肺炎",
      "留学生",
      "美女",
      "美股熔断",
      "震惊!水比石油贵"
    ]
  },
  methods: {
    // 新闻列表
    async search(value) {
      this.keyword = value
      this.history = this.history.filter(item => item !== this.keyword)
      this.history.unshift(this.keyword)
      localStorage.setItem("history", JSON.stringify(this.history))
      const res = await this.$axios.get(`/post_search`, {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      this.searchList = data
    },
    // 搜索历史记录
    historySearch(item) {
      console.log(item)
      this.keyword = item
      this.search()
    },
    // 回退
    back() {
      if (this.keyword) {
        this.keyword = ""
        this.searchList = []
        this.recmendList = []
      } else {
        this.$router.back()
      }
    },
    //推荐列表
    async recmend() {
      if (!this.keyword) {
        return
      }
      const res = await this.$axios.get("/post_search_recommend", {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      this.recmendList = data
      console.log(this.recmendList)
    }
  },

  watch: {
    keyword(value) {
      if (!value) {
        this.recmendList = []
        this.searchList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding: 0 15px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    height: 38px;
    .left {
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
    .center {
      display: flex;
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 15px;
      height: 30px;
      align-items: center;
      padding: 0 10px;
      input {
        border: none;
        outline: none;
        width: 100%;
        padding-left: 3px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .right {
      width: 38px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
    }
  }
  .main {
    h4 {
      padding: 10px 0;
    }
    .history {
      padding: 10px 0;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      .item {
        float: left;
        width: 100px;
        height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 10px;
      }
    }
    .hot {
      overflow: hidden;
      .item {
        float: left;
        width: 50%;
        margin-bottom: 10px;
      }
    }
  }
  .recmend {
    display: flex;
    justify-content: space-between;
    padding-left: 5px 15px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    .item {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .iconjiantou1 {
      display: block;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
