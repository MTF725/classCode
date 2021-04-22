// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//全局前置守卫
/*
   to:Route:即将要进入的目标，路由对象
   from：Route：当前导航正要离开的路由
   next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
   next方法在调用的时候是可以填参数的：
 */
   //router即全局路由，beforeEach设置在router上就是全局路由守卫
// router.beforeEach((to,from,next)=>{
//   console.log(to,from,next,"全局的前置钩子触发");
//   if(to.name=="p"&&from.path=="/center/info"){
//     alert("非法入侵");
//   }else{
//     next();
//   }
// });
//全局的后置钩子
// router.afterEach((to,from)=>{
//   console.log(to,from,"全局的后置钩子触发")
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
