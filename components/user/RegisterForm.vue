<template>
  <div class="registerContainer">
    <el-input
      placeholder="请输入手机号"
      v-model="phoneNum"
      class="input phoneNum"
      @blur="checkInp($event,phoneReg,'请输入合法的手机号')"
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
      @blur="checkInp($event,nickReg,'昵称必须为一位到九位的字母或汉字')"
      v-model="nickname"
      class="input nickname"
      clearable>
    </el-input>
    <el-input
      placeholder="输入密码"
      @blur="checkInp($event,pwdReg,'请输入3到8位数字或字母')"
      v-model="password"
      class="input password"
      show-password
      clearable>
    </el-input>
    <el-input
      placeholder="再次确认密码"
      @blur="checkInp($event,pwdReg,'请输入3到8位数字或字母')"
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
        nickReg: /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,9}$/,
        pwdReg: /^[A-Za-z0-9]{3,8}$/
      }
    },
    methods: {
      checkInp(e,reg,msg) {
        const classList = e.target.classList;
        if (!reg.test(e.target.value)) {
          classList.add("redBorder");
          this.$message.error(msg);
        } else {
          classList.remove("redBorder");
        }
        // reg.test(e.target.value)? classList.remove("redBorder"):classList.add("redBorder");
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
          data:{
            tel:this.phoneNum,
            // "Content-Type":"application/x-www-form-urlencoded"
          }
        }).then(res=>{
          if(res.status === 200){
            this.$message({
              message:"验证码为" + res.data.code,
              type:"success",
              duration:8000
            })
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      register() {
        if(this.password !== this.newPassword){
          return this.$message.error("两次输入的密码不一致");
        }
        this.$axios({
          url:"/accounts/register",
          method:"post",
          data:{
            username:this.phoneNum,
            nickname:this.nickname,
            captcha:this.authCode,
            password:this.password
          }
        }).then(res=>{
          if(res.status === 200){
            this.$message.success("注册成功");
            //注册成功，跳转主页
            this.$store.commit('user/setUserInfo',res.data);
            this.$router.push('/')
          }
        })
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
