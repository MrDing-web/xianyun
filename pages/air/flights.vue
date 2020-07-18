<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <span>单程:</span><span>{{$route.query.departCity}}</span> - <span>{{$route.query.destCity}}</span> /<span> {{$route.query.departDate}} </span>
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
        <Ticket :ticket="item" v-for="item in flightsListFilter" :key="item.id" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <Aside/>
      </div>
    </el-row>

  </section>
</template>

<script>
import Ticket from "~/components/air/Ticket";
import FlightsListHead from "~/components/air/flightsListHead";
import Aside from "~/components/air/Aside"
export default {
  components: {
    Ticket,
    FlightsListHead,
    Aside
  },
  data() {
    return {
      flightsList: [],
      flightsList2: [],
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
    this.loadPage();

  },
  methods: {
    loadPage(){
      this.$axios({
        url: "/airs",
        params: this.$route.query,
      }).then(res => {
        this.flightsList = res.data.flights;
        this.flightsList2 = res.data.flights;
        if(this.flightsList === '') return;
        this.getFiltersOption();
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getFiltersOption(){
      //加载过滤器选项
      //拿到所有数据里面的起飞机场，然后数组去重，得到没有重复的所有起飞机场
      this.airportOption = [...new Set(this.flightsList.map(item =>item.org_airport_name))].map(i=>({value:i}));
      //拿到所有数据里面的航空公司，然后数组去重，得到没有重复的所有航空公司
      this.comOption = [...new Set(this.flightsList.map(item =>item.airline_name))].map(j=>({value:j}))
    },
    //通过起飞机场过滤机票列表
    departAirportFilter(list){
      if(this.airVal === "") return list;
      return list.filter(item => item.org_airport_name === this.airVal);
    },
    //筛选器中的时间格式为（a，b） 通过a<time<b筛选
    departTimeFilter(list){
      if(this.timeVal === "") return list;
      const min = Number(this.timeVal.split(",")[0]);
      const max = Number(this.timeVal.split(",")[1]);
      return list.filter(item => {
        const depTime = Number(item.dep_time.split(":")[0])
        return depTime >= min && depTime < max;
      })
    },
    //通过航空公司筛选
    companyFilter(list){
      if(this.comVal === "") return list;
      return list.filter(item => item.airline_name === this.comVal);
    },
    //通过飞机尺寸筛选
    planeSizeFilter(list){
      if(this.planeVal === "") return list;
      return list.filter(item => item.plane_size === this.planeVal);
    },
    //过滤器A-->过滤器B-->过滤器C-->过滤器D
    getList(){
      this.flightsList = this.departAirportFilter(this.departTimeFilter(this.companyFilter(this.planeSizeFilter(this.flightsList2))));
    }
  },
  watch:{
    deep:true,
    airVal(){
      this.getList();
    },
    timeVal(){
      this.getList();
    },
    comVal(){
      this.getList();
    },
    planeVal(){
      this.getList();
    },
    $route(){
      this.loadPage();
    }
  },
  computed:{
    flightsListFilter(){
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
