<template>
  <div id="wrap">
    <h2>国际新闻信息</h2>
    <ul>
      <li>国际新闻信息1</li>
      <li>国际新闻信息2</li>
      <li>国际新闻信息3</li>
      <li>国际新闻信息4</li>
      <li>国际新闻信息5</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "AuxNewsOne",
//    beforeRouteLeave: (to, from, next) => {
//      console.log("将要离开国际新闻了");
//      from.meta.isNow=false;
//      next();
//    },
//    beforeRouteEnter: (to, from, next) => {
//      console.log("将要进入国际新闻了", to);
//      from.meta.isNow=true;
//      next();
//    }
  }
</script>
<style scoped>
  #wrap {
    text-align: center;
  }
</style>
