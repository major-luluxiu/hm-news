<template>
  <div class="tab-edit">
    <myheader> 栏目管理</myheader>
    <!-- 删除栏目 -->
    <div class="del">
      <div class="explain">点击删除以下频道</div>
      <div class="tab">
        <div
          class="item"
          v-for="item in del"
          :key="item.id"
          @click="delTab(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 增加栏目 -->
    <div class="add">
      <div class="explain">点击添加以下频道</div>
      <div class="tab">
        <div
          class="item"
          v-for="item in add"
          :key="item.id"
          @click="addTab(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getTab()
  },
  data() {
    return {
      del: [],
      add: []
    }
  },
  methods: {
    // 获取频道数据
    async getTab() {
      const res = await this.$axios.get("/category")
      const { statusCode, data } = res.data
      this.del = data
    },
    // 删除频道
    delTab(id) {
      if (this.del.length <= 3) {
        this.$toast("至少保留3个频道")
        return
      }
      const index = this.del.findIndex(item => item.id === id)

      this.add.push(this.del[index])
      this.del.splice(index, 1)
    },
    // 增加频道
    addTab(id) {
      console.log(id)
      const index = this.add.findIndex(item => (item.id = id))
      this.del.push(this.add[index])
      this.add.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.tab-edit {
  padding: 10px 25px;
  .del,
  .add {
    padding: 10px 0;
    .explain {
      color: #666;
    }
    .tab {
      padding: 10px 0;
      overflow: hidden;

      .item {
        float: left;
        width: 44px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #ccc;
        padding: 5px 10px;
        font-size: 18px;
        margin: 0 14px 10px 0;
        text-align: center;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
