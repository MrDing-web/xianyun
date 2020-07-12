<template>
  <div class="loginContainer">
    <el-input
      placeholder="请输入手机号"
      v-model="phoneNum"
      class="input phoneNum"
      clearable>
    </el-input>
    <el-input
      placeholder="请输入密码"
      v-model="password"
      class="input password"
      clearable
      show-password>
    </el-input>
    <div class="forgetPwd">
      <a href="javascript:void(0)">忘记密码</a>
    </div>
    <el-button type="primary" class="login" @click="login">登录</el-button>
  </div>
</template>

<script>
  export default {
    name: "LoginForm",
    data() {
      return {
        phoneNum: '13800138000',
        password: '123456'
      }
    },
    methods: {
      login() {
        this.$axios({
          url: "/accounts/login",
          method: "post",
          data: {
            username: this.phoneNum,
            password: this.password
          }
        }).then(res => {
          if (res.status === 200) {
            this.$message.success("登录成功");
            this.$store.commit('user/setUserInfo', res.data);
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .loginContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 24px 24px 24px;

    .input {
      margin-top: 24px;
    }

    .forgetPwd {
      width: 100%;
      font-size: 12px;
      margin: 24px 0 10px 0;
      display: flex;
      color: #40aaff;
      justify-content: flex-end;
    }

    .login {
      width: 100%;
    }
  }

</style>
