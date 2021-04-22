<template>
  <div id="cart">
    <p>我的购物车页面</p>
    <p>mycart的params传过来的值是：{{getCartQuery}}</p>
  </div>
</template>

<script>
  export default {
    name: "MyCart",
    computed: {
      getCartQuery(){
        return "但是:" + this.$route.params.pCart;
      }
    },
    data(){
      return{
        pCart: ""
      }
    }
  }
</script>

<style scoped>
  #cart {
    width: 100%;
    height: 100%;
    background-color: lightsalmon;
    font-size: 25px;
  }
</style>
