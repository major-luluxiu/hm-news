<template>
  <div>
    <hm-floor
      v-if="comment.parent"
      :comment="comment.parent"
      :count="count - 1"
      @reply="reply"
    ></hm-floor>
    <div class="hm-floor" :class="{ bt: !comment.parent }">
      <div class="title">
        <div class="left">
          <div class="order">{{ count }}楼</div>
          <div class="nickname">{{ comment.user.nickname }}</div>
        </div>
        <div class="center">{{ comment.create_date | date2 }}</div>
        <div class="right" @click="reply(comment.id, comment.user.nickname)">
          回复
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hm-floor",
  props: {
    comment: Object,
    count: Number
  },
  methods: {
    reply(id, nickname) {
      this.$emit("reply", id, nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-floor {
  padding: 15px 10px;
  border: 1px solid #ccc;
  border-top: none;
  &.bt {
    border-top: 1px solid #ccc;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .order {
        padding: 0 5px;
      }
      .nickname {
        font-weight: 700;
      }
    }
    .center {
      flex: 1;
      padding-left: 15px;
      color: rgba(0, 0, 0, 0.54);
    }
  }
  .content {
    padding-top: 10px;
  }
}
</style>
