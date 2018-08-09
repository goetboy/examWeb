<template>
  <div>
    <label v-if="navmenus" v-for="item in navmenus">
      <el-menu-item  :index="item.name" v-if="!item.child" :route="item.url">
        {{item.name}}
      </el-menu-item>
      <el-submenu :key="item.id" :index="item.name" v-if="item.child" >
        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
        <navmenu :navmenus="item.child"></navmenu>
      </el-submenu>
    </label>
  </div>
</template>
<script>

  export default {
    name: "navmenu",
    props: {
      navmenus: Array
    },
    data() {
      return {}
    },


  }

</script>
<style>
  .el-menu-item{
    background-color: #d3dce6;
  }
  .el-submenu{
    background-color: #d3dce6;
  }
</style>
