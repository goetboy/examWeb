import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import AdminIndex from '@/manage/Index';
import UserList from  '@/manage/admin/user/List'
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
      path:'/admin/index',
      name:AdminIndex,
    component:AdminIndex
    },
    {
      path:'/admin/user/list',
      name:UserList,
      component:UserList
    },

  ]
})
