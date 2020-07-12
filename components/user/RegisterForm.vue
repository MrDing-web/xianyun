<template>
  <div class="registerContainer">
    <el-input
      placeholder="请输入手机号"
      v-model="phoneNum"
      class="input phoneNum"
      @blur="checkInp($event,phoneReg)"
      clearable>
    </el-input>
    <el-input
      placeholder="请输入验证码"
      v-model="authCode"
      class="input-with-select input"
    >
      <el-button
        slot="append"
        @click="getAuthCode"
      >
        获取验证码
      </el-button>
    </el-input>
    <el-input
      placeholder="请输入昵称"
      v-model="nickname"
      class="input nickname"
      clearable>
    </el-input>
    <el-input
      placeholder="输入密码"
      v-model="password"
      class="input password"
      show-password
      clearable>
    </el-input>
    <el-input
      placeholder="再次确认密码"
      v-model="newPassword"
      class="input newPassword"
      show-password
      clearable>
    </el-input>
    <el-button type="primary" class="register" @click="register">马上注册</el-button>
  </div>
</template>

<script>
  export default {
    name: "RegisterForm",
    data() {
      return {
        phoneNum: '',
        authCode: '',
        nickname: '',
        password: '',
        newPassword: '',
        phoneReg: /^0?(13|14|15|18|17)[0-9]{9}$/,
        nickReg: /\/S{1,6}/,
        pwdReg: /\/S{6,11}/
      }
    },
    methods: {
      checkInp(e,reg) {
        const classList = e.target.classList;
        // if (!this.phoneReg.test(this.phoneNum)) {
        //   e.target.classList.add("redBorder");
        // } else {
        //   e.target.classList.remove("redBorder");
        // }
        reg.test(e.target.value)? classList.remove("redBorder"):classList.add("redBorder");
      },
      getAuthCode() {
        if (!this.phoneReg.test(this.phoneNum)) {
          this.$message.error("输入的手机号码格式错误");
          return false;
        }
        console.log(this.phoneNum);
        this.$axios({
          url:"/captchas",
          method:"post",
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          },
          data:{
            tel:this.phoneNum
          }
        }).then(res=>{
          console.log(res);
        })
      },
      register() {

      }
    }
  }
</script>

<style lang="less" scoped>
  .registerContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 24px 24px 24px;

    /deep/ .redBorder {
      border-color: #f00 !important;
    }

    .input {
      margin-top: 24px;
    }

    .register {
      width: 100%;
      margin-top: 24px;
    }
  }
</style>
