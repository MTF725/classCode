<template>
  <div id="new">
    <div id="top">
      <p>新闻信息：</p>
      <router-link :to="{path:'/news/newset',query:{msgnew:'新闻',kindnew:'最新'}}">最新新闻</router-link>
      <router-link :to="{path:'/news/outside',query:{msgout:'新闻',kindout:'国际'}}">国际新闻</router-link>
      <router-link :to="{path:'/news/inside',query:{msgin:'新闻',kindin:'国内'}}">国内新闻</router-link>
    </div>
    <div id="buttom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "News"
  }
</script>

<style scoped>
  #top {
    width: 100%;
    height: 40%;
  }

  #buttom {
    width: 100%;
    height: 60%;
  }

  #new {
    width: 100%;
    height: 80%;
    background-color: lightsalmon;
    text-align: center;
  }

  p {
    padding-top: 50px;
  }

  a {
    text-decoration: none;
  }

  a:nth-of-type(1) {
    margin-top: 50px;
    display: inline-block;
    padding-right: 50px;

  }

  a:nth-of-type(2) {
    margin-top: 50px;
    display: inline-block;
    padding-right: 50px;

  }
</style>
