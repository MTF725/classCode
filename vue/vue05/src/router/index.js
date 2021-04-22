import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import NotFond from '../components/NotFond'
import MyProduct from '../components/MyProduct'
import Mine from '../components/Mine'
import Info from '../components/MyInfo'
import Cart from '../components/MyCart'
import MyAux from '../components/MyAux/MyAux'
import MyVideo from '../components/MyAux/MyVideo'
import MyComment from '../components/MyAux/MyCommnent'
import MyNews from '../components/MyAux/MyNews'
import MySwiper from '../components/MySwiper/MySwiper'

Vue.use(Router)

export default new Router({
  /*
      routes:
       路由配置数组
       每个路由的配置信息都是一个对象
       每个对象里都有如下基本字段
        path：路由
        component：对应显示的组件

        路由匹配的顺序是从上到下
   */
  routes: [
    //路由重定向:当路由是 /home 的时候,将此路由重定为 /
    {path: "/home", redirect: "/"},
    {path: "/", component: Home},
    //{path:"/product",component:MyProduct},
    //配置params传值所需的路由
    // {path:"/product/:userName/:userId",component:MyProduct,name:"p"},
    //删掉/:userName/:userId后，地址栏不再显示相关信息
    {path: "/product", component: MyProduct, name: "p"},
    //children字段，用于配置一级路由对应的子路由
    {
      path: "/center", component: Mine, children: [
        {
          path: "", redirect: {
            path: "/center/info", query: {pInfo: '想买东西'}
          }
        },
        {path: "info", component: Info},
        {path: "cart", name: 'a', component: Cart}
      //  配置单个路由独享路由守卫
      ], beforeEnter: (to, from, next) => {
        if (Math.random() > 0.5) {
          next();
        } else {
          let res = confirm("您还未登录，要去登录吗？");
          if (res) {
            next("/myaux/video");
          }
        }
      }
    },
    {
      path: "/myaux", component: MyAux, children: [
        {path: '', redirect: 'video'},
        {path: 'video', component: MyVideo},
        {path: 'article', components: {
            default: MyNews,
            v2: MyComment
          }
        },
      ]
    },
    {path:"/swiper",component: MySwiper},

    //通配符路由
    {path: "*", component: NotFond}
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if(to.path=="/myaux/video"){
      return { x: 0, y: 1000 }
    }
  }
})
