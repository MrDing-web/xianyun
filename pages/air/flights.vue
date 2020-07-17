<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <Ticket :ticket="item" v-for="item in flightsList" :key="item.id" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="flightsList.length"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import Ticket from "~/components/air/Ticket";
import FlightsListHead from "~/components/air/flightsListHead";
export default {
  components: {
    Ticket,
    FlightsListHead
  },
  data() {
    return {
      flightsList: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  created() {
    // this.$store.dispatch("/user/login");
  },
  mounted() {
    // console.log(this.$store.state.user.userInfo.token);
    //   console.log(this.$route.query);
    // 现在所有的参数都在 URL 直接发送请求
    const data = {
      ...this.$route.query,
      _start: 0,
      _limit: 5
    };
    this.$axios({
      url: "/airs",
      params: data,
      headers: {
        // Authorization:"Bearer " + this.$store.state.user.userInfo.token
        //报错  node里面没有localStorage
      //   Authorization:
      //     "Bearer " +
      //     JSON.parse(localStorage.getItem("store")).user.userInfo.token
      }
    }).then(res => {
      this.flightsList = res.data.flights;
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>