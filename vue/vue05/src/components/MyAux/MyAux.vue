<template>
    <div id="myaux">
      <p>这是辅助路由页面</p>
      <router-link :to="{path:'/myaux/video'}">点击查看视频页面</router-link>
      <router-link :to="{path:'/myaux/article'}" class="newcom">点击查看新闻&评论页面</router-link>
      <router-view></router-view>
      <router-view name="v2"></router-view>
    </div>
</template>

<script>
    export default {
        name: "MyAux"
    }
</script>

<style scoped>
  #myaux{
    font-size: 16px;
    width: 100%;
    height: 700px;
    background-color: lightgreen;
  }
  a{
    font-size: 20px;
  }
</style>
