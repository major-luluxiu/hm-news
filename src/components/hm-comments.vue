<template>
  <div class="comments">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <img
          :src="$axios.defaults.baseURL + commentsList.user.head_img"
          alt=""
        />
      </div>
      <div class="center">
        <div class="nickname">{{ commentsList.user.nickname }}</div>
        <div class="date">{{ commentsList.create_date | date2 }}</div>
      </div>
      <div
        class="right"
        @click="reply(commentsList.id, commentsList.user.nickname)"
      >
        回复
      </div>
    </div>

    <!-- 楼层跟帖 -->
    <hm-floor
      v-if="commentsList.parent"
      :comment="commentsList.parent"
      :count="order(0, commentsList)"
      @reply="reply"
    ></hm-floor>
    <!--跟帖 -->
    <div class="content">
      {{ commentsList.content }}
    </div>
  </div>
</template>

<script>
import hmFloor from "../components/hm-floor"

export default {
  props: ["commentsList"],
  methods: {
    // 回复
    reply(id, nickname) {
      this.$emit("reply", id, nickname)
    },
    // 帖子排序
    order(num, obj) {
      if (obj.parent) {
        return this.order(num + 1, obj.parent)
      } else {
        return num
      }
    }
  },
  components: {
    "hm-floor": hmFloor
  }
}
</script>

<style lang="less" scoped>
.comments {
  border-bottom: 1px solid #ccc;
  padding: 15px 0;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    .left {
      img {
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      .nickname {
        color: rgb(0, 0, 0, 0.87);
        font-size: 15px;
      }
      .date {
        color: rgb(0, 0, 0, 0.54);
        font-size: 10px;
      }
    }
  }
  .content {
    margin-top: 10px;
  }
}
</style>
