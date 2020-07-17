<template>
  <div class="flight-item">
    <div>
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info" @click.native="flag=!flag">
        <el-col :span="6">
          <span>{{ticket.airline_name}}</span>
          {{ticket.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ticket.dep_time}}</strong>
              <span>{{ticket.dst_airport_name}}{{ticket.dst_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ticket|dateFormat}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ticket.arr_time}}</strong>
              <span>{{ticket.org_airport_name}}{{ticket.org_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{ticket.base_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <div v-show="flag" class="flight-recommend"

    >
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle"
              v-for="(item,index) in ticket.seat_infos"
      >
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20"
        >
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span> | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥1345</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p v-if="item.nums !== 'A'">剩余：{{item.nums}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: false,

      };
    },
    props: {
      // 数据
      ticket: {
        type: Object,
        // 默认是空对象
        default: {}
      }
    },
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
    },
    mounted() {
      // console.log(this.ticket)
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  .flight-item {
    border: 1px #ddd solid;
    margin-bottom: 10px;

    .flight-info {
      padding: 15px;
      cursor: pointer;

      > div {
        &:first-child,
        &:last-child {
          text-align: center;
        }
      }
    }

    .flight-info-center {
      padding: 0 30px;
      text-align: center;

      .flight-airport {
        strong {
          display: block;
          font-size: 24px;
          font-weight: normal;
        }

        span {
          font-size: 12px;
          color: #999;
        }
      }

      .flight-time {
        span {
          display: inline-block;
          padding: 10px 0;
          border-bottom: 1px #eee solid;
          color: #999;
        }
      }
    }

    .flight-info-right {
      .sell-price {
        font-size: 24px;
        color: orange;
        margin: 0 2px;
      }
    }
  }

  .flight-recommend {
    background: #f6f6f6;
    border-top: 1px #eee solid;
    padding: 0 20px;

    .flight-sell {
      border-bottom: 1px #eee solid;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }

      .flight-sell-left {
        font-size: 12px;

        span {
          color: green;
        }
      }

      .price {
        font-size: 20px;
        color: orange;
      }

      .choose-button {
        text-align: center;
        color: #666;

        button {
          display: block;
          width: 100%;
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
