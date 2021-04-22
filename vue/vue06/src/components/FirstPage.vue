<template>
    <div id="first">
      <div id="top">
        <p>home信息：</p>
        <router-link :to="{path:'/first/newset',query:{msgnew:'home'}}" active-class="choose">最新HOME</router-link>
        <router-link :to="{path:'/first/outside',query:{msgout:'home'}}" active-class="choose">国际HOME</router-link>
        <router-link :to="{path:'/first/inside',query:{msgin:'home'}}" active-class="choose">国内HOME</router-link>
      </div>
     <div id="buttom">
       <router-view></router-view>
     </div>
    </div>
</template>

<script>
    export default {
        name: "FirstPage",
    }
</script>

<style scoped>
  #top{
    width: 100%;
    height: 40%;
  }
  #buttom{
    width: 100%;
    height: 60%;
  }
    #first{
      width: 100%;
      height: 80%;
      background-color: lightsalmon;
      text-align: center;
    }
    p{
      padding-top: 50px;
    }
    a{
      text-decoration: none;
    }
  a:nth-of-type(1){
    margin-top: 50px;
    display: inline-block;
    padding-right: 50px;

  }
    a:nth-of-type(2){
      margin-top: 50px;
      display: inline-block;
      padding-right: 50px;
    }

  .choose{
    color: red;
  }
</style>
