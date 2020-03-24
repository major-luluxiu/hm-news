<template>
  <div>
    <div class="list">
      <!--  单张图片-->
      <div class="single" v-if="post.cover.length < 3 && post.type === 1">
        <div class="info">
          <div class="title">{{ post.title }}</div>
          <div class="personal">
            <span class="name">火星时报</span>
            <span class="number">{{ post.comments.length }} 跟帖</span>
          </div>
        </div>
        <div class="avatar">
          <img :src="filterUrl(post.cover[0].url)" alt />
        </div>
      </div>

      <!-- 三张图片 -->
      <div class="multiple" v-else-if="post.cover.length >= 3">
        <div class="title">{{ post.title }}</div>
        <div class="covers">
          <img :src="filterUrl(post.cover[0].url)" alt />
          <img :src="filterUrl(post.cover[1].url)" alt />
          <img :src="filterUrl(post.cover[2].url)" alt />
        </div>
        <div class="personal">
          <span class="name">火星时报</span>
          <span class="number">{{ post.comments.length }} 跟帖</span>
        </div>
      </div>

      <!-- 视频 -->
      <div class="radio" v-else>
        <div class="title">{{ post.title }}</div>
        <div class="cover">
          <img :src="filterUrl(post.cover[0].url)" alt="" />
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
  props: ["post"],
  methods: {
    filterUrl(url) {
      if (url.startsWith("http")) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
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
      line-height: 55px;
      border-radius: 50%;
      position: absolute;
      background-color: rgb(200, 200, 200, 0.5);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .iconshipin {
        color: #ffff;
        font-size: 47px;
      }
    }
  }
}
</style>
