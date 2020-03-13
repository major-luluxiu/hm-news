<template>
  <div class="myheader">
    <div class="left" @click="$router.go(-1)">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.myheader {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  .left,
  .right {
    width: 30px;
  }
  .center {
    flex: 1;
    font-size: 18px;
    color: red;
    font-weight: 700;
  }
}
</style>
