<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input v-model="form.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input v-model="form.checkPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        const passwordValidator = (rule, value, callback) => {
            // 在一个校验函数内部, 可以接受三个参数
            // 1. 规则对象本身
            // 2. 当前输入的值
            // 3. 放行的回调函数
            // 当你校验完输入值的合法性, 需要调用 callback 继续下去
            // 我们在这里需要做的就是判断当前二次代码的输入值是否跟第一次一样
            // 不通过的情况下,需要在调用 callback 的时候, 传入一个错误对象
            // new Error('请再次输入密码')
            if (value == '') {
                // 二次代码根本没有输入, 应该报错请再次输入密码
                callback(new Error('请再次输入密码'))
            }else if (value !== this.form.password) {
                // 二次代码跟第一次不一样, 应该报错两次输入的密码应该相同
                callback(new Error('两次密码输入应该相同'))
            }else {
                // 通过
                callback();
            }
        }
        return {
            // 表单数据
            form: {
                username: "",   // 登录用户名/手机
                password: "",    // 登录密码
                checkPassword: "", // 确认密码
                nickname: "",	// 昵称
                captcha: ""		// 手机验证码
            },
            // 表单规则
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ],
                checkPassword: [
                    // 如果我们需要自定义的函数,
                    // 对数据的输入进行校验,
                    // 就可以定义一个 validator 的属性
                    // 并且传入一个函数
                    // 将校验规则和报错信息都写在函数里面
                    {
                        validator: passwordValidator,
                        trigger: 'blur'
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: '请输入昵称',
                        trigger: 'blur'
                    }
                ],
                captcha: [
                    {
                        required: true,
                        message: '请输入手机验证码',
                        trigger: 'blur'
                    }
                ],
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
            if(!this.form.username){
                this.$confirm('手机号码不能为空', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'warning'
                })
                return;
            }

            if(this.form.username.length !== 11){
                this.$confirm('手机号码格式错误', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'warning'
                })
                return;
            }


            this.$axios({
                url: `captchas`,
                method: "POST",
                data: {
                    tel: this.form.username
                }
            }).then(res => {
                const {code} = res.data;
                this.$confirm(`模拟手机验证码为：${code}`, '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'success'
                })
            })
        },


        // 注册
        handleRegSubmit(){
            console.log(this.form)
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 注册提交
                    // const {checkPassword, ...props} = this.form;
                    
                    // const data = {
                    //     username: this.form.username,
                    //     password: this.form.password,
                    //     nickname: this.form.nickname,
                    //     captcha: this.form.captcha,
                    // }

                    const {checkPassword, ...props} = this.form

                    this.$axios({
                        url: `/accounts/register`,
                        method: "POST",
                        data: props
                    }).then(res => {
                        console.log(res.data);
                    })
                } 
            });
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>