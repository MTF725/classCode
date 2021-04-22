<template>
  <div id="app">
    <ul id="nav">
      <li>
        <router-link :to="{path:'/news'}" @click.native="chooseNav(msg1)" v-html="msg1" active-class="choose"></router-link>
      </li>
      <li>
        <router-link :to="{path:'/history'}" @click.native="chooseNav(msg2)" v-html="msg2" active-class="choose"></router-link>
      </li>
    </ul>
    <p>{{msgP}}</p>
    <keep-alive :include="liveArr">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      msg1:"新闻",
      msg2:"历史",
      msgP:"新闻信息",
      liveArr:["MainHistory", "MainNews"]
    }
  },
  methods:{
    chooseNav(v){
      this.msgP = v+"信息";
    }
  }
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }
  #nav {
    display: flex;
    justify-content: space-around;
  }
  li {
    list-style: none;
  }
  a {
    font-size: 25px;
  }
  p {
    font-size: 25px;
    text-align: center;
  }
  .choose {
    color:red;
  }
#app {
  width: 500px;
  height: 500px;
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
  border:1px solid;
}
</style>
