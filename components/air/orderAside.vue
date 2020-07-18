<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>434343</div>
        <div>34343 - 4343</div>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        class="info-step">
        <el-col :span="5" class="flight-airport">
          <strong>43434</strong>
          <span>434343</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--- 434343 ---</span>
          <span>434343</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>3434343</strong>
          <span>浦东机场T2</span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>成人机票</span>
      <span>￥4444</span>
      <span>x1</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>机建＋燃油</span>
      <span>¥2222/人/单程</span>
      <span>x1</span>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额：</span>
      <span class="price">￥ </span>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "orderAside"
  }
</script>

<style scoped lang="less">
  /*aside*/
  .aside {
    width: 350px;
    height: fit-content;
    border: 1px #ddd solid;
  }

  .air-info {
    padding: 15px;

    .info-top {
      margin-bottom: 10px;

      > div:last-child {
        font-size: 14px;
      }
    }

    .info-step {
      .flight-airport {
        strong {
          display: block;
          font-size: 22px;
          font-weight: normal;
        }

        span {
          font-size: 12px;
          color: #999;
        }
      }

      .flight-time {
        text-align: center;
        font-size: 12px;
        color: #999;

        span {
          display: block;
        }
      }
    }
  }

  .info-bar {
    border-top: 1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price {
      font-size: 28px;
      color: orange;
    }
  }
</style>
