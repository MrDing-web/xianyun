<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{orderData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex"
                justify="space-between"
                align="middle"
                class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" ref="canvas"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    name: "pay",
    data(){
      return{
        orderData:{}
      }
    },
    watch: {
      '$store.state.user.userInfo.token': {
        handler: function () {
          // 一进来就尝试一次,
          // 每当 token 有变化都会再次执行
          if (this.$store.state.user.userInfo.token) {
            // 1. 如果是别的页面进来, vuex 本来就有, 第一次执行就得出结果
            // 2. 如果是刷新, 一进来会执行一次, 发现没数据, 不会执行
            // 等到 vuex 被本地储存恢复, 发生变化,再次执行, 出现数据
            this.$axios({
              url: '/airorders/' + this.$route.query.id,
              headers: {
                Authorization: "Bearer " + this.$store.state.user.userInfo.token
              }
            }).then(res=>{
              console.log(res.data);
              this.orderData = res.data
              // 已经获取完了数据, 有了支付链接
              // 可以生成二维码了
              // QRCode.toCanvas 是生成二维码的函数
              // 其中接收两个必要参数,
              // 1. 是需要显示二维码的 canvas
              // 2. 是需要变为二维码的字符串
              // 第三个是一个可选的配置对象, 其中 width 属性可以控制宽度
              QRCode.toCanvas(this.$refs.canvas, this.orderData.payInfo.code_url, {width: 200})
            })
          }
        },
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    background: #f5f5f5;
    padding: 30px 0;

    .main {
      width: 1000px;
      margin: 0 auto;

      .pay-title {
        text-align: right;

        span {
          font-size: 28px;
          color: orangered;
        }
      }

      .pay-main {
        background: #fff;
        margin-top: 10px;
        border-top: 5px orange solid;
        padding: 30px;

        h4 {
          font-size: 28px;
          font-weight: normal;
          margin-bottom: 10px;
        }

        .pay-qrcode {
          padding: 0 80px;
        }

        .qrcode {
          border: 1px #ddd solid;
          padding: 15px;
          height: fit-content;

          #qrcode-stage {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
          }

          p {
            line-height: 2;
            text-align: center;
          }
        }
      }
    }
  }
</style>
