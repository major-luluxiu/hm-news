<template>
  <div>
    <div class="list">
      <!--  单张图片-->
      <div class="single" v-if="item.cover.length < 3">
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="personal">
            <span class="name">火星时报</span>
            <span class="number">{{ item.comments.length }} 跟帖</span>
          </div>
        </div>
        <div class="avatar">
          <img :src="item.cover[0].url" alt />
        </div>
      </div>

      <!-- 三张图片 -->
      <div class="multiple" v-else-if="item.cover.length >= 3">
        <div class="title">{{ item.title }}</div>
        <div class="covers">
          <img :src="item.cover[0].url" alt />
          <img :src="item.cover[1].url" alt />
          <img :src="item.cover[2].url" alt />
        </div>
        <div class="personal">
          <span class="name">火星时报</span>
          <span class="number">{{ item.comments.length }} 跟帖</span>
        </div>
      </div>

      <!-- 视频 -->
      <div class="radio" v-else>
        <div class="title">{{ item.title }}</div>
        <div class="cover">
          <img src="item.cover[0].url " alt="" />
          <div class="tip">
            <span class="iconfont iconshipin"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"]
}
</script>

<style lang="less" scoped>
.personal {
  color: #868686;
  .name {
    margin-right: 10px;
  }
}

.single {
  display: flex;
  justify-content: space-between;
  padding: 17px 10px;
  border-bottom: 1px solid #ccc;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
      color: #333333;
    }
  }
  .avatar {
    img {
      display: block;
      width: 121px;
      height: 75px;
      object-fit: cover;
    }
  }
}

.multiple {
  padding: 18px 10px;
  border-bottom: 1px solid #ccc;
  .title {
    padding: 5px 0;
    font-size: 16px;
    color: #333333;
  }
  .covers {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
    img {
      display: block;
      width: 112px;
      height: 74px;
    }
  }
}

.radio {
  padding: 15px 10px;
  .title {
    padding: 5px;
    font-size: 16px;
    color: #333333;
  }
  .cover {
    position: relative;
    margin-bottom: 10px;
    img {
      display: block;
      width: 360px;
      height: 170px;
    }
    .tip {
      width: 55px;
      height: 55px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgb(225, 225, 225, 0.5);
      .iconshipin {
        background-color: #ffffff;
      }
    }
  }
}
</style>
