<template>
  <div id="happy">
    <div id="top">
      <p>娱乐信息：</p>
      <router-link :to="{path:'/happy/newset',query:{msgnew:'娱乐',kindnew:'最新'}}">最新娱乐</router-link>
      <router-link :to="{path:'/happy/outside',query:{msgout:'娱乐',kindout:'国际'}}">国际娱乐</router-link>
      <router-link :to="{path:'/happy/inside',query:{msgin:'娱乐',kindin:'国内'}}">国内娱乐</router-link>
    </div>
    <div id="buttom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Happy"
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

  #happy {
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
