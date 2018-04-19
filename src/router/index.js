import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Article from '@/components/Article'
Vue.use(Router)

 const router = new Router({
  linkActiveClass: 'active',
  hashbang: true, // 将路径格式化为#!开头
  history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  routes: [
    
    {
      path: '/helloWorld',
      component: HelloWorld
    },
    {
      path:"/article",
      component:Article
    }
  ]
})
export default router