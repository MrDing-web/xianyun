<template>
  <!-- 幻灯片 -->
  <el-carousel :interval="5000" arrow="always" indicator-position="none">
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <div
        class="banner-image"
        :style="`
                background:url(${item.url}) center center no-repeat;
                background-size:contain contain;
                `"
      ></div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      banners: []
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data.map(item => {
        return {
          ...item,
          url: this.$axios.defaults.baseURL + item.url
        };
      });
      // console.log(this.banners);
    });
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-carousel__container {
  height: 700px;
}

.banner-image {
  width: 100%;
  height: 100%;
  background-size: 100%;
}
</style>
