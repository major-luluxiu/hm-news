<template>
  <div class="comments">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <img src="../images/小黄鸡.jpg" alt="" />
      </div>
      <div class="center">
        <div class="nickname">火星网友</div>
        <div class="date">2小时前</div>
      </div>
      <div class="right">回复</div>
    </div>

    <!--跟帖 -->
    <div class="content">
      文章说得很有的道理
    </div>
  </div>
</template>

<script>
export default {}
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
        font-size: 13px;
      }
    }
  }
}
</style>
