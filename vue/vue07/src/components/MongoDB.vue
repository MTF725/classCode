<template>
  <fieldset id="mongo">
    <legend><h1>mongo请求</h1></legend>
    <input type="text" v-model="input1">
    <input type="text" v-model="input2">
    <button @click="getrequest">get请求</button>
    <button @click="postrequest">post请求</button>
  </fieldset>
</template>

<script>
    export default {
        name: "MongoDB",
      data(){
        return {
          input1: "",
          input2: ""
        }
      },
      methods: {
        getrequest() {
          //进入config文件夹的index.js文件，修改proxyTable（网络代理）
          //点击发起axios的get请求
          this.axios.get("/api/get", {
            params: {
              name: this.input1,
              sex: this.input2
            }
          }).then((result) => {
            //result不是后台传来的数据，是一个对象，后台传来的数据存储在该对象data字段里
            console.log(result);
          }).catch((err) => {
            console.log(err);
          });
        },
        postrequest() {
          //点击发起axios的post请求
          this.axios.post("/api/post",{
            name: this.input1,
            sex: this.input2
          },).then((result)=>{
            //result不是后台传来的数据，是一个对象，后台传来的数据存储在该对象data字段里
            console.log(result);
          }).catch((err)=>{
            console.log(err);
          })
        }
      }
    }
</script>

<style scoped>
  #mongo {
    background-color: lightsteelblue;
  }
</style>
