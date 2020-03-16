<template>
  <div>
    <myheader>个人中心</myheader>
    <div class="info">
      <div class="left">
        <img src="../images/小黄鸡.jpg" alt="" />
      </div>
      <div class="center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          <span class="sex">火星男</span>
        </div>
        <span class="time">2020-03-16</span>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="关注" content="我的关注"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章"></hm-navbar>
    <hm-navbar title="设置"></hm-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 70px;
  align-items: center;
  padding: 10px 10px 10px 15px;
  border-bottom: 3px solid #ccc;
  .left {
    width: 70px;
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 5px;
    .name {
      .sex {
        padding-left: 5px;
        font-size: 16px;
      }
    }
    .time {
      color: #ccc;
    }
  }
  .right {
    span {
      font-size: 18px;
    }
  }
}
</style>
