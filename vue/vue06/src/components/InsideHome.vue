<template>
  <div id="inside">
    <p>{{getkindin}}{{getmsgin}}信息</p>
    <p>{{getkindin}}{{getmsgin}}1</p>
    <p>{{getkindin}}{{getmsgin}}2</p>
  </div>
</template>

<script>
    export default {
        name: "InsideHome",
      data(){
          return {msgin:"",kindin:""}
      },
      computed:{
         getmsgin(){
           return this.$route.query.msgin;
         },
        getkindin(){
          return this.$route.query.kindin;
        }
      }
    }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
</style>
