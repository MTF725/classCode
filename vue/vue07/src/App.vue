
<template>
  <div id="app">
    <Request></Request>
    <hr>
    <MongoDB></MongoDB>
  </div>
</template>

<script>
  import Request from "./components/Request";
  import MongoDB from "./components/MongoDB";

  export default {
    name: 'App',
    components: {MongoDB, Request}
  }
</script>

<style>
  #app {

  }
</style>
