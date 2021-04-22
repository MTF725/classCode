<template>
    <div id="header">
      <router-link :to="{path:'/first'}">首页</router-link>
      <router-link :to="{path:'/news'}">新闻</router-link>
      <router-link :to="{path:'/happy'}">娱乐</router-link>
    </div>
</template>

<script>
    export default {
        name: "MyHeader"
    }
</script>

<style scoped>
   #header{
     width: 100%;
     height: 20%;
     background-color: lightblue;
     text-align: center;
     font-size: 30px;
   }
  a{
    display:inline-block;
    text-decoration: none;
    padding-right: 50px;
    margin-top: 50px;
  }
</style>
