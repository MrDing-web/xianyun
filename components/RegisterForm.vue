<template>
  <div class="registerContainer">
    <el-input
      placeholder="请输入手机号"
      v-model="phoneNum"
      class="input phoneNum"
      clearable>
    </el-input>
    <el-input placeholder="请输入验证码" v-model="authCode" class="input-with-select input">
      <el-button slot="append">获取验证码</el-button>
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
    <el-button type="primary" class="register">马上注册</el-button>
  </div>
</template>

<script>
  export default {
    name: "RegisterForm",
    data() {
      return {
        phoneNum: '',
        authCode:'',
        nickname:'',
        password:'',
        newPassword:''
      }
    },
  }
</script>

<style lang="less" scoped>
  .registerContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 24px 24px 24px;

    .input {
      margin-top: 24px;
    }
    .register{
      width: 100%;
      margin-top: 24px;
    }
  }
</style>
