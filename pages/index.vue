<template>
  <div class="container">
    <Banner />
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row
          type="flex"
          class="search-tab"
        >
          <span
            v-for="(item, index) in options"
            :key="index"
            :class="{active: index === currentOption}"
            @click="handleOption(item,index)"
          >
            <i>{{ item.name }}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row
          type="flex"
          align="middle"
          class="search-input"
        >
          <input
            v-model="searchValue"
            :placeholder="options[currentOption].placeholder"
            @keyup.enter="handleSearch"
          >
          <i class="el-icon-search" @click="handleSearch" />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'

export default {
  components: {
    Banner
  },
  data () {
    return {
      banners: [], // 轮播图数据
      options: [ // 搜索框tab选项
        {
          name: '攻略',
          placeholder: '搜索城市',
          pageUrl: '/post?city='
        },
        {
          name: '酒店',
          placeholder: '请输入城市搜索酒店',
          pageUrl: '/hotel?city='
        },
        {
          name: '机票',
          placeholder: '请输入出发地',
          pageUrl: '/air'
        }
      ],
      searchValue: '', // 搜索框的值
      currentOption: 0 // 当前选中的选项
    }
  },

  methods: {
    handleOption (item, index) {
      // console.log(this.options[index]);
      if (item.name === '机票') {
        this.$router.push('/air');
      }
      this.currentOption = index
    },
    handleSearch () {
      console.log(111);
      if (this.currentOption === 0) {
        this.$router.push('/post?city=' + this.searchValue)
      } else if (this.currentOption === 1) {
        this.$router.push('/hotel?city=' + this.searchValue)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    min-width: 1000px;
    margin: 0 auto;
    position: relative;

    .banner-content {
      z-index: 9;
      width: 1000px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-top: 1px transparent solid;

      .search-bar {
        width: 552px;
        margin: 0 auto;
      }

      .search-tab {
        .active {
          i {
            color: #333;
          }

          &::after {
            background: #eee;
          }
        }

        span {
          width: 82px;
          height: 36px;
          display: block;
          position: relative;
          margin-right: 8px;
          cursor: pointer;

          i {
            position: absolute;
            z-index: 2;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 30px;
            text-align: center;
            color: #fff;
          }

          &:after {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            border: 1px rgba(255, 255, 255, .2) solid;
            border-bottom: none;
            transform: scale(1.1, 1.3) perspective(.7em) rotateX(2.2deg);
            transform-origin: bottom left;
            background: rgba(0, 0, 0, .5);
            border-radius: 1px 2px 0 0;
            box-sizing: border-box;
          }
        }
      }

      .search-input {
        width: 550px;
        height: 46px;
        background: #fff;
        border-radius: 0 4px 4px 4px;
        border: 1px rgba(255, 255, 255, .2) solid;
        border-top: none;
        box-sizing: unset;

        input {
          flex: 1;
          height: 20px;
          padding: 13px 15px;
          outline: none;
          border: 0;
          font-size: 16px;
        }

        .el-icon-search {
          cursor: pointer;
          font-size: 22px;
          padding: 0 10px;
          font-weight: bold;
        }
      }
    }
  }
</style>
