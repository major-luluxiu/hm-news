<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placehoder"
      :class="{ success: status === 'success', error: status === 'error' }"
      :value="value"
      @input="inputFn"
    />
    <div class="tips" v-show="status == 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: ""
    }
  },

  methods: {
    inputFn(e) {
      let value = e.target.value
      this.$emit("input", value)

      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success"
        } else {
          this.status = "error"
        }
      }
    }
  },

  props: {
    type: {
      type: String,
      default: "text"
    },
    placehoder: {
      type: String,
      default: "请输入....."
    },
    value: String,
    rule: RegExp,
    message: String
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  width: 75%;
  height: 30px;
  margin: 10px auto;
  input {
    width: 100%;
    height: 20px;
    line-height: 20px;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;

    &.success {
      border-color: green;
    }

    &.error {
      border-color: red;
    }
  }
  .tips {
    font-size: 8px;
    color: red;
  }
}
</style>
