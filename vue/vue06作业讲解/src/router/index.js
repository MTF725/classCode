import Vue from 'vue'
import Router from 'vue-router'
import MainNews from '../components/News/MainNews/MainNews'
import AuxNewsOne from '../components/News/AuxNews/AuxNewsOne'
import AuxNewsTwo from '../components/News/AuxNews/AuxNewsTwo'
import AuxNewsThree from '../components/News/AuxNews/AuxNewsThree'
import MainHistory from '../components/History/MainHistory/MainHistory'
import AuxHistoryOne from '../components/History/AuxHistory/AuxHistoryOne'
import AuxHistoryTwo from '../components/History/AuxHistory/AuxHistoryTwo'
import AuxHistoryThree from '../components/History/AuxHistory/AuxHistoryThree'

Vue.use(Router)

export default new Router({
  routes: [
    {path:"/", redirect:"/news"},
    {path:"/news", component:MainNews, children:[
      {path:"", redirect:"one"},
      {path:"one", component:AuxNewsOne},
      {path:"two", component:AuxNewsTwo},
      {path:"three", component:AuxNewsThree},
    ]},
    {path:"/history", component:MainHistory, children:[
      {path:"", redirect:"one"},
      {path:"one", component:AuxHistoryOne},
      {path:"two", component:AuxHistoryTwo},
      {path:"three", component:AuxHistoryThree},
    ]}
  ]
})
