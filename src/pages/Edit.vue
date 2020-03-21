<template>
  <div class="edit-user">
    <myheader>编辑资料</myheader>

    <!-- avatar: 头像 -->
    <div class="head-img">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- 上传头像的组件 -->
      <van-uploader
        class="uploader"
        :after-read="afterRead"
        :before-read="beforeRead"
      />
    </div>

    <hm-navbar
      title="昵称"
      :content="info.nickname"
      @click="showNickname"
    ></hm-navbar>

    <hm-navbar
      title="密码"
      :content="info.password.replace(/./g, '*')"
      @click="showPassword"
    ></hm-navbar>

    <hm-navbar
      title="性别"
      :content="info.gender === 1 ? '男' : '女'"
      @click="showGender"
    ></hm-navbar>

    <!-- 昵称弹框 -->
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" placeholder="请输入用户昵称" />
    </van-dialog>

    <!-- 密码弹框 -->
    <van-dialog
      v-model="show1"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
    >
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

    <!-- 性别弹框 -->
    <van-dialog
      v-model="show2"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <!-- 图片裁剪 -->
    <div class="cropper-mask" v-show="showCropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
        :canMove="false"
      ></vue-cropper>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper"

export default {
  data() {
    return {
      info: {
        password: ""
      },
      show: false,
      nickname: "",
      show1: false,
      password: "",
      show2: false,
      gender: 1,
      img: "",
      showCropper: false
    }
  },
  methods: {
    getInfo() {
      const token = localStorage.getItem("token")
      const user_id = localStorage.getItem("user_id")
      this.$axios({
        method: "get",
        url: `/user/${user_id}`
      }).then(res => {
        const { data, statusCode, message } = res.data
        if (statusCode === 200) {
          this.info = data
        }
      })
    },
    editUser(data) {
      const token = localStorage.getItem("token")
      const user_id = localStorage.getItem("user_id")
      this.$axios({
        method: "post",
        url: `/user_update/${user_id}`,
        data
      }).then(res => {
        const { statusCode, message, data } = res.data
        if (statusCode === 200) {
          this.getInfo()
          this.$toast(message)
        }
      })
    },
    showNickname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    editNickname() {
      this.editUser({
        nickname: this.nickname
      })
    },
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    editPassword() {
      this.editUser({
        password: this.password
      })
    },
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    afterRead(file) {
      this.showCropper = true
      this.img = file.content
    },
    beforeRead(file) {
      if (file.size / 1024 >= 200) {
        this.$toast("上传的图片不能超过200kb")
        return false
      }
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片")
        return false
      }
      return true
    },
    cancel() {
      this.img = ""
      this.showCropper = false
    },
    crop() {
      this.$refs.cropper.getCropBlob(data => {
        const fd = new FormData()
        fd.append("file", data)
        this.$axios({
          method: "post",
          url: "/upload",
          data: fd
        }).then(res => {
          const { data, statusCode } = res.data
          if (statusCode === 200) {
            this.showCropper = false
            this.img = ""
            this.editUser({
              head_img: data.url
            })
          }
        })
      })
    }
  },
  created() {
    this.getInfo()
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.edit-user {
  .head-img {
    position: relative;
    padding: 10px 10px;
    margin-bottom: 20px;
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 auto;
    }
    .uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      opacity: 0;
      z-index: 999;
    }
  }
  .cropper-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
    .cancel {
      position: absolute;
      top: 0;
      left: 0;
    }
    .crop {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
