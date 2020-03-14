<template>
  <div>
    <div class="mybutton" @click="clickFn">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      this.$emit("login")
    }
  }
}
</script>

<style lang="less" scoped>
.mybutton {
  width: 75%;
  height: 45px;
  line-height: 50px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
