<template>
  <div id="info">
    <p>我的信息</p>
    <!--query查询参数方式通过路由传值-->
    <p>myinfo的query传过来的值是：{{getInfoQuery}}</p>
  </div>
</template>

<script>
  export default {
    name: "MyInfo",
    computed: {
      getInfoQuery() {
        return "我想说:" + this.$route.query.pInfo;
      }
    },
    data() {
      return {
        pInfo:""
      }
    }

  }
</script>

<style scoped>
  #info {
    width: 100%;
    height: 100%;
    background-color: lightskyblue;
    font-size: 25px;
  }
</style>
