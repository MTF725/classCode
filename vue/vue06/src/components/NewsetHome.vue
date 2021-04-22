<template>
  <div id="newset">
    <p>{{getkindnew}}{{getmsgnew}}信息</p>
    <p>{{getkindnew}}{{getmsgnew}}1</p>
    <p>{{getkindnew}}{{getmsgnew}}2</p>
  </div>
</template>

<script>
    export default {
        name: "NewsetHome",
      data(){
          return{msgnew:"",kindnew:""}
      },
      computed:{
          getmsgnew(){
            return this.$route.query.msgnew;
          },
        getkindnew(){
          return this.$route.query.kindnew;
        }
      }
    }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
</style>
