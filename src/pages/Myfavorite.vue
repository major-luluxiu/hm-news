<template>
  <div>
    <myheader>我的收藏</myheader>
    <hm-article :item="item" v-for="item in list" :key="item.id"></hm-article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const res = await this.$axios.get("/user_star")
        const { data, statusCode } = res.data
        if (statusCode === 200) {
          this.list = data
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
