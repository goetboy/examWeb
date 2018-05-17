import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import AdminIndex from '@/components/admin/Index';
import AdminMenu from '@/components/admin/Menu';

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
      path:'/admin/menu',
      name:AdminMenu,
      component:AdminIndex
    }
  ]
})
