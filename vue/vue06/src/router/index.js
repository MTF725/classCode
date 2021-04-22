import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '../components/FirstPage'
import News from '../components/News'
import Happy from '../components/Happy'
import Outside from '../components/OutsideHome'
import Inside from '../components/InsideHome'
import Newset from '../components/NewsetHome'

Vue.use(Router)

export default new Router({
  routes: [
    //路由重定向:当路由是 /home 的时候,将此路由重定为 /
    {path: "/", redirect: "/first"},
    {path: "/news", component: News,children: [
        {path: "outside", component: Outside},
        {path: "inside", component: Inside},
        {path: "newset", component: Newset},
      ]},
    {path: "/happy", component: Happy,children: [
        {path: "outside", component: Outside},
        {path: "inside", component: Inside},
        {path: "newset", component: Newset},
      ]},
    {path: "/first", component: FirstPage, children: [
        {path: "outside", component: Outside},
        {path: "inside", component: Inside},
        {path: "newset", component: Newset},
      ]
    },
    //通配符路由
    {path:"*",component:FirstPage}

  ]
})
