<template>
    <!-- 数据校验第一步, 表单整体绑定一个数据对象 -->
    <!-- 数据校验第二部, 表单绑定一个校验规则对象,
    里面跟数据对象一一对应 -->
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <!-- 给表单项指定对应的规则属性, 以字符串的形式设置在 prop 属性上 -->
        <el-form-item class="form-item" prop='username'>
            <el-input 
            placeholder="用户名/手机" v-model="form.username"
            @focus="clearMsg('username')">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
import { mutations } from '../../store/user'
export default {
    data(){
        return {
            // 表单数据
            form: {
                username: '13800138000',
                password: '123456'
            },
            // 表单规则
            rules: {
                username: [
                    // rules 里面的每个属性都对应数据对象里面的 key, 都是一个数组
                    // 数组里面的对象是一条条的规则, 这些规则会按顺序进行校验
                    // 假如我现在要求用户名必须填写, 而且是3到5个字符
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '用户名在 6 到 15 个字符之间',
                        trigger: 'blur'
                    },
                    // 还可以使用正则表达式
                    {
                        pattern: /^\d+$/,
                        message: '用户名只能输入数字',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { 
                        required: true, 
                        message: '请输入密码', 
                        trigger: 'blur' 
                    },
                ],
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
            // 默认登录的用户名和密码是
            // 13800138000 : 123456
            console.log(this.form)

            // 我们需要在发送之前进行一次总的校验复核一遍
            // 拿到表单对象, 直接调用他的方法, 传入回调
            this.$refs.form.validate((isValid, objNotValid)=>{
                // 第一个参数代表是否验证成功, 只有成功的状态, 才发出请求
                if (isValid) {
                    // 既然已经封装好了 vuex 的登录
                    // 在这里只需要调用即可
                    // 调用 mutations 是 commit
                    // 调用 actions 是 dispatch
                    console.log('开始登录');
                    // 这里是调用 vuex 里面的异步函数, 
                    // 所以所有的请求结果都在 vuex 里面
                    // 如果想要得到这些请求结果其实是可以的
                    // 1. vuex action 将 promise 返回出来
                    this.$store.dispatch('user/login', this.form).then(res=>{
                        // 这里可以做进一步的个性化处理
                        // 2. 如果个性化处理需要用到请求的结果
                        // 那么内部 promise 的 .then 函数里面要将数据返回出来
                        console.log('这里是调用 vuex 内部的 axios 然后返回的 promise 和 结果 res');
                        console.log(res.data);
                    })
                }else {
                    // 如果失败, 尝试将 objNotValid 告诉你那个字段失败的信息打印出来
                    console.log(objNotValid);
                }
            })

            // 也可以用 promise 形式实现, 这是饿了么已经封装好的
            // this.$refs.form.validate().then((isValid)=>{
            //     // 第一个参数代表是否验证成功, 只有成功的状态, 才发出请求
            //     if (isValid) {
            //         this.$axios({
            //             url: "/accounts/login",
            //             method: "POST",
            //             data: this.form
            //         }).then(res => {
            //             console.log(res.data);
            //         })
            //     }
            // }).catch(err=>{
            //     console.log(err);
            // })
            
        },
        clearMsg(propName) {
            // 如果拿到一个数据的 prop 名字
            // 就可以直接调用表单,来清理对应数据的错误信息
            this.$refs.form.clearValidate(propName)
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