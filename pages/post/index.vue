<template>
  <div class="content">
    <div class="left">
      <postAside/>
    </div>
    <div class="right">
      <postMain/>
    </div>


  </div>
</template>

<script>
  import postAside from "~/components/post/postAside";
  import postMain from "~/components/post/postMain";

  export default {
    name: "index",
    components: {
      postMain,
      postAside
    }
  }
</script>

<style lang="less" scoped>
  .content{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px 60px;
    .left{
      flex: 5;
      height: 600px;
    }
    .right{
      flex: 12;
      height: 600px;
    }
  }
</style>
