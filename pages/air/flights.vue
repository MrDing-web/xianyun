<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />


        <!--分页插件-->
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 8, 12]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsList.length"
          ></el-pagination>
        </div>

        <!-- 航班信息 -->
        <Ticket :ticket="item" v-for="item in filterFlightsList" :key="item.id" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>

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
      pageSize:5,
      currentPage: 1
    };
  },
  created() {
    // this.$store.dispatch("/user/login");
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query,
    }).then(res => {
      this.flightsList = res.data.flights;
    });
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  computed:{
    filterFlightsList(){
      return this.flightsList.slice(this.pageSize * (this.currentPage - 1),this.pageSize * this.currentPage);
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
