<template>
  <div>
    <div class="mybutton">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
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
