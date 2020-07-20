<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{detailTicket.dep_date}}</div>
        <div>{{detailTicket.org_city_name}} - {{detailTicket.dst_city_name}}</div>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        class="info-step">
        <el-col :span="5" class="flight-airport">
          <strong>{{detailTicket.dep_time}}</strong>
          <span>{{detailTicket.org_airport_name}}{{detailTicket.org_airport_quay}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--- {{detailTicket | dateFormat}} ---</span>
          <span>{{detailTicket.airline_name}}{{detailTicket.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{detailTicket.arr_time}}</strong>
          <span>{{detailTicket.dst_airport_name}}{{detailTicket.dst_airport_quay}}</span>
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
      <span>¥50/人/单程</span>
      <span>x1</span>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额：</span>
      <span class="price">￥{{totalPrice + userLen * 50}} </span>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "orderAside",
    props:["detailTicket","totalPrice","userLen"],
    filters: {
      dateFormat(ticket) {
        const depDate = new Date(ticket.dep_datetime).getTime();
        const arrDate = new Date(ticket.arr_datetime).getTime();
        //获取到分钟差
        const airTime = (arrDate - depDate) / 1000 / 60;
        // if(airTime<0) airTime += 1440;
        const hour = Math.floor(airTime / 60);
        const min = airTime % 60;
        return (min < 0 || hour < 0) ? `${hour + 24}时${min + 60}分` : `${hour}时${min}分`;
      }
    }
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
