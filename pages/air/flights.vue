<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <span>单程：</span><span>{{$route.query.departCity}}</span> - <span>北京</span> / <span>2020-07-17 </span>
          <el-select v-model="airVal" placeholder="起飞机场" size="mini" class = "selectInput">
            <el-option
              v-for="item in airportOption"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="timeVal" placeholder="起飞时间" size="mini" class = "selectInput">
            <el-option
              v-for="item in departTimeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>

          </el-select>
          <el-select v-model="comVal" placeholder="航空公司" size="mini" class = "selectInput">
            <el-option
              v-for="item in comOption"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="planeVal" placeholder="机型大小" size="mini" class = "selectInput">
            <el-option
              v-for="item in planeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

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
      currentPage: 1,
      airportOption:[],
      departTimeOption:[
        {
          label:"0:00 - 4:00",
          value:"0,4"
        },
        {
          label:"4:00 - 8:00",
          value:"4,8"
        },
        {
          label:"8:00 - 12:00",
          value:"8,12"
        },
        {
          label:"12:00 - 16:00",
          value:"12,16"
        },
        {
          label:"16:00 - 20:00",
          value:"16,20"
        },
        {
          label:"20:00 - 24:00",
          value:"20,24"
        }
      ],
      comOption:[],
      planeOption:[
        {
          label:"小",
          value:"S"
        },
        {
          label:"中",
          value:"M"
        },
        {
          label:"大",
          value:"L"
        }
      ],
      airVal:"",
      timeVal:"",
      comVal:"",
      planeVal:""
    };
  },
  created() {},
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query,
    }).then(res => {
      this.flightsList = res.data.flights;
      console.log(this.flightsList);
      if(this.flightsList === '') return;
      this.getFiltersOption();
    });
  },
  watch:{

  },
  filters:{

  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;

      // flightsList | filterA | filterB | filterC | filterD


    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getFiltersOption(){
      //加载过滤器选项
      this.airportOption = [...new Set(this.flightsList.map(item =>item.dst_airport_name))].map(i=>({value:i}));
      this.comOption = [...new Set(this.flightsList.map(item =>item.airline_name))].map(j=>({value:j}))
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

.selectInput{
  width: 120px;
  margin: 10px 0 10px 10px;
}

.aside {
  width: 240px;
}
</style>
