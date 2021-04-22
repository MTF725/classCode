<template>
  <div id="app">
    <MyHeader></MyHeader>
    <!--router-view  路由插座组件,用来承载路由需要切换的组件-->
    <!-- <router-view/>指router文件夹下的index.js文件，即主内容-->
    <router-view/>
    <MyFooter></MyFooter>

  </div>
</template>

<script>
  import MyHeader from "./components/MyHeader";
  import MyFooter from "./components/MyFooter";

  export default {
    name: 'App',
    components: {MyHeader,MyFooter}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
  /*index.html里的app*/
    width: 100%;
    height: 100%;
  }
</style>
