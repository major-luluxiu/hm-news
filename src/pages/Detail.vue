<template>
  <div class="detail">
    <!-- 头部 -->
    <div class="header">
      <div class="back" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="follow">
        <div
          class="followed"
          v-if="detailList.has_follow"
          @click="unfollow(detailList.user.id)"
        >
          已关注
        </div>
        <div class="unfollow" v-else @click="follow(detailList.user.id)">
          关注
        </div>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="main">
      <div class="title">{{ detailList.title }}</div>
      <div class="user">
        <span class="nickname">{{ detailList.user.nickname }}</span>
        <span class="creat-time">{{ detailList.user.create_date | date }}</span>
      </div>
      <div
        class="info"
        v-html="detailList.content"
        v-if="detailList.type === 1"
      ></div>

      <video :src="detailList.content" v-else autoplay controls></video>

      <div class="btns">
        <div class="btn like" @click="iLike(detailList.id)">
          <span
            class="iconfont icondianzan"
            :class="{ active: detailList.has_like }"
          ></span>
          <span>{{ detailList.like_length || 0 }}</span>
        </div>
        <div class="btn share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="jingcai">
      精彩跟帖
    </div>
    <hm-comments
      v-for="item in commentsList"
      :key="item.id"
      :commentsList="item"
      @reply="reply"
    ></hm-comments>

    <!-- 更多跟帖 -->
    <div class="more">
      <div class="title">
        更多更贴
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="inputaa" v-show="isShow">
        <div class="input">
          <input type="text" placeholder="回复:" @click="inputFocus" />
        </div>
        <div class="count">
          <span class=" iconfont iconpinglun-"> </span>
          <div class="cmt">{{ detailList.comment_length }}</div>
        </div>
        <span
          class="star iconfont iconshoucang"
          @click="star"
          :class="{ activeStar: detailList.has_star }"
        ></span>
        <span class="share iconfont iconfenxiang"></span>
      </div>
      <div class="txtarea" v-show="!isShow">
        <textarea
          :placeholder="
            `${commentNickname ? '回复:' : '评论:'} ${commentNickname}`
          "
          ref="txtarea"
          @blur="outfocus"
          v-model="content"
        ></textarea>
        <div class="send" @click="addComment">发送</div>
      </div>
    </div>
    <div class="empty"></div>
  </div>
</template>

<script>
import hmComments from "../components/hm-comments"

export default {
  data() {
    return {
      detailList: {
        user: {}
      },
      commentsList: [],
      isShow: true,
      content: "",
      parentId: "",
      commentId: "",
      commentNickname: ""
    }
  },
  created() {
    this.getDetail()
    this.getComments()
  },
  components: {
    hmComments
  },
  methods: {
    // 页面跳到顶部
    // mounted() {
    //   window.scrollTo(0, 0)
    // },
    // 详情页数据
    async getDetail() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { data, statusCode } = res.data
      this.detailList = data
      console.log(this.detailList)
    },
    // 获取评论
    async getComments() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentsList = data
        console.log(this.commentsList)
      }
    },
    // 点击关注
    follow(id) {
      const token = localStorage.getItem("token")
      if (!token) {
        this.$dialog
          .confirm({
            title: "请先登录"
          })
          .then(() => {
            this.$router.push({
              name: "login",
              params: {
                forced: true
              }
            })
          })
          .catch(() => {})
        return
      } else {
        this.$axios.get(`/user_follows/${id}`).then(res => {
          const { statusCode, message } = res.data
          if (statusCode === 200) {
            this.$toast(message)
            this.getDetail()
          }
        })
      }
    },
    // 点击取关
    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}
`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getDetail()
      }
    },
    // 点赞
    async iLike(id) {
      const res = await this.$axios.get(`/post_like/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getDetail()
      }
    },
    // 自动获取焦点
    async inputFocus() {
      this.isShow = !this.isShow
      await this.$nextTick()
      this.$refs.txtarea.focus()
    },
    // 失去焦点
    outfocus() {
      if (!this.content) {
        this.isShow = !this.isShow
        this.commentNickname = ""
        this.commentId = ""
        this.content = ""
      }
    },
    // 发送评论
    async addComment() {
      if (!this.content.trim()) {
        this.$toast("请输入内容")
        this.isShow = !this.isShow
        this.content = ""
        return
      }
      const id = this.detailList.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getDetail()
        this.getComments()
        this.$toast(message)
      }
      this.commentId = ""
      this.commentNickname = ""
      this.parentId = ""
      this.content = ""
      this.isShow = !this.isShow
    },
    // 点击收藏
    async star() {
      const res = await this.$axios.get(`/post_star/${this.detailList.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getDetail()
      }
    },
    // 接收评论id 昵称 parentid
    async reply(id, nickname) {
      this.isShow = false
      await this.$nextTick()
      this.$refs.txtarea.focus()
      this.commentId = id
      this.commentNickname = nickname
      this.parentId = id
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  padding: 60px 20px 0;
  background-color: #f2f2f2;
  .header {
    width: 90%;
    background-color: #fff;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 100px 5px 20px;
    position: fixed;
    top: 0;
    left: 0;
    .logo {
      flex: 1;
      padding-left: 10px;
      span {
        font-weight: 700;
        font-size: 55px;
      }
    }
    .unfollow {
      width: 62px;
      height: 26px;
      background-color: red;
      border-radius: 15px;
      text-align: center;
      line-height: 26px;
      color: #ffff;
    }
    .followed {
      width: 62px;
      height: 26px;
      border: 1px solid #cccc;
      border-radius: 15px;
      text-align: center;
      line-height: 26px;
      color: #000;
    }
  }
  .main {
    padding: 5px 0;
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .user {
      padding: 5px 0;
      span {
        color: #868686;
      }
      .nickname {
        margin-right: 10px;
      }
    }
    .info {
      /deep/img {
        width: 100%;
        display: block;
      }
    }
    video {
      width: 100%;
    }
    .btns {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 70px;
      .btn {
        width: 50px;
        height: 20px;
        border: 1px solid #333333;
        padding: 3px 15px;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        .iconweixin {
          color: green;
          font-size: 18px;
        }
        span {
          font-size: 14px;
          &.active {
            color: red;
          }
        }
      }
    }
  }
  .jingcai {
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
  }
  .more {
    padding: 20px 0;
    height: 60px;
    .title {
      margin: 0 auto;
      width: 121px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      border-radius: 15px;
      border: 1px solid #333333;
    }
  }
  // 底部样式
  .footer {
    .inputaa {
      position: fixed;
      bottom: 0;
      height: 28px;
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #f2f2f2;
      .input {
        width: 181px;
        height: 28px;
        line-height: 28px;
        border-radius: 15px;
        background-color: #ccc;
        text-align: center;
        input {
          border: none;
          outline: none;
          background-color: #ccc;
        }
      }
      span {
        font-size: 22px;
      }
      .activeStar {
        color: red;
      }
      .count {
        position: relative;
        .cmt {
          position: absolute;
          right: -5px;
          top: -4px;
          padding: 0 7px;
          line-height: 16px;
          text-align: center;
          background-color: red;
          color: #fff;
          border-radius: 20px;
        }
      }
    }
    .txtarea {
      position: fixed;
      bottom: 0;
      width: 90%;
      background-color: #f2f2f2;
      display: flex;
      align-items: flex-end;
      textarea {
        flex: 1;
        height: 60px;
        border-radius: 5px;
        background-color: #d7d7d7;
        padding: 10px;
      }
      .send {
        width: 55px;
        height: 19px;
        text-align: center;
        line-height: 19px;
        border-radius: 13px;
        background-color: red;
        color: #fff;
        margin-left: 10px;
      }
    }
  }
}

// 垫底的
.empty {
  height: 28px;
}
</style>
