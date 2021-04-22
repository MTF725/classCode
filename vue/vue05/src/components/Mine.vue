<template>
  <div id="mine">
    <div class="left">
      <router-link :to="{path:'/center/info',query:{pInfo:'想买东西'}}">我的信息</router-link>
      <router-link :to="{name:'a',params:{pCart:'买不起'}}">购物车</router-link>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Mine"
  }
</script>

<style scoped>
  #mine {
    width: 100%;
    height: 60%;
  }

  .left {
    width: 20%;
    height: 100%;
    float: left;
    background-color: lightcoral;
    font-size: 20px;
  }

  .right {
    width: 80%;
    height: 100%;
    float: right;
    background-color: lightsalmon;
  }

  a {
    font-size: 25px;
    display: block;
  }
</style>
