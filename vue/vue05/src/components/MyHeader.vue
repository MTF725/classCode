<template>
    <div id="header">
      <h1>这是MyHeader组件</h1>
      <!--
      通过router-link组件实现路由切换，该组件最后会被vue渲染成a标签
      to属性：设置点击之后切换的路由
      -->
      <router-link :to="{path:'/'}">首页</router-link>
      <!--<router-link :to="{path:'/product'}">商品</router-link>-->

      <!--query查询参数方式通过路由传值-->
      <!--<router-link :to="{path:'/product',query:{pName:'小米 mix Alpha',pPrice:19999}}">商品</router-link>-->

      <!--params路径参数方式通过路由传值-->
      <router-link :to="{name:'p',params:{userName:'张三',userId:1111}}">商品</router-link>

      <!--给按钮添加点击事件，实现跳转组件-->
      <button @click="changeRouter">商品</button>

      <router-link :to="{path:'/center'}">个人中心</router-link>

      <router-link :to="{path:'/myaux'}">辅助路由</router-link>

      <router-link :to="{path:'swiper'}">轮播图</router-link>
    </div>
</template>

<script>
    export default {
        name: "MyHeader",
        methods:{
          changeRouter(){
            //使用router对象实现路由的切换
            this.$router.push({path:"/product",query:{pName:'华为',pPrice:100}})
          }
        }
    }
</script>

<style scoped>
  /*scoped  让样式只用于此组件*/
  #header{
    width:100%;
    height: 20%;
    background-color: lightblue;
  }
  a{
    font-size: 25px;
  }
  button{
    font-size: 18px;
    padding: 5px 10px;
  }
</style>
