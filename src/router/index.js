import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/login/Login';
import Regedit from '@/login/Regedit';
import AdminIndex from '@/manage/Index';
import UserList from  '@/manage/admin/user/List'
import UserInfo from  '@/manage/admin/user/Info'
Vue.use(Router)


export default new Router({
  routes: [
   {
     path:'/',
     name:Home,
     component:Home

   },
    {
      path:'/login',
      name:Login,
      component:Login
    },
    {
      path:'/regedit',
      name:Regedit,
      component:Regedit
    },
    {
      path:'/admin/index',
      name:AdminIndex,
    component:AdminIndex,
    children:[
      {
        path:'/admin/user/list',
        name:UserList,
        component:UserList
      },
      {
        path:'/admin/user/:id',
        name:UserInfo,
        component:UserInfo
      }
    ]

    },


  ]
})
