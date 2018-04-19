<template>
<div id="app">
  <app-head></app-head>
  <app-menu></app-menu>
  <router-view></router-view>
  <app-foot></app-foot>
</div>
</template>

<script>
import AppHerd from '@/components/public/Head'
import AppFoot from '@/components/public/Foot'
import AppMenu from '@/components/public/Menu'
export default {
 name:"app",
 components:{
   'app-head':AppHerd,
   'app-foot': AppFoot,
   'app-menu':AppMenu
 }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

