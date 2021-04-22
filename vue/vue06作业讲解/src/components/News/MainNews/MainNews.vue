<template>
  <div id="wrap">
    <ul id="nNav">
      <li>
        <router-link :to="{path:'/news/one'}" active-class="choose">国际新闻</router-link>
      </li>
      <li>
        <router-link :to="{path:'/news/two'}" active-class="choose">国内新闻</router-link>
      </li>
      <li>
        <router-link :to="{path:'/news/three'}" active-class="choose">热点新闻</router-link>
      </li>
    </ul>
      <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: "MainNews"
  }
</script>
<style scoped>
  #nNav {
    display: flex;
    justify-content: space-around;
  }

  li {
    list-style: none;
  }

  a {
    font-size: 25px;
  }
</style>
