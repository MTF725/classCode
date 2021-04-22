<template>
  <div id="wrap">
    <ul id="nNav">
      <li>
        <router-link :to="{path:'/history/one'}" active-class="choose">国际历史</router-link>
      </li>
      <li>
        <router-link :to="{path:'/history/two'}" active-class="choose">国内历史</router-link>
      </li>
      <li>
        <router-link :to="{path:'/history/three'}" active-class="choose">热点历史</router-link>
      </li>
    </ul>
      <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name:"MainHistory",
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
