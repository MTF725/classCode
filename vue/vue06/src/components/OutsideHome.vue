<template>
  <div id="outside">
    <p>{{getkindout}}{{getmsgout}}信息</p>
    <p>{{getkindout}}{{getmsgout}}1</p>
    <p>{{getkindout}}{{getmsgout}}2</p>
  </div>
</template>

<script>
  export default {
    name: "OutsideHome",
    data(){
      return{msgout:"",kindout:""}
    },
   computed:{
      getmsgout(){
        return this.$route.query.msgout;
      },
     getkindout(){
       return this.$route.query.kindout;
     }
    }
  }
</script>

<style scoped>
  #outside {

  }

  a {
    text-decoration: none;
  }
</style>
