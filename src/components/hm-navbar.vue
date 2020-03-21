<template>
  <div class="hm-navbar" @click="clickFn">
    <div class="left">{{ title }}</div>
    <div class="center">{{ content }}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: String
  },
  methods: {
    clickFn() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navbar {
  display: flex;
  margin: 0 15px;
  padding: 10px 0;
  border-bottom: 1px solid red;
  .left {
    width: 70px;
    font-size: 16px;
  }
  .center {
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: #999;
  }
  .right {
    width: 40px;
    text-align: right;
    color: #ccc;
  }
}
</style>
