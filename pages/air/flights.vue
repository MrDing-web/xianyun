<template>
  <div>飞机票列表</div>
</template>

<script>
export default {
    created() {
        // 现在所有的参数都在 URL 直接发送请求
        this.$axios({
            url: '/airs',
            params: this.$route.query
        }).then(res=>{
            console.log(res.data);
        })
    }
}
</script>

<style>

</style>