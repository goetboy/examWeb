<template>
  <el-container>
    <el-header>{{title}}</el-header>
    <el-container>
      <el-aside width="200px">  <el-menu router="true">
        <navmenu :navmenus="menuList"></navmenu>
      </el-menu></el-aside>
      <el-main >

        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import axios from "../assets/js/util/http";
  import navmenu from "../components/Menu.vue";
  import ElMain from "../../node_modules/element-ui/packages/main/src/main.vue";

  export default {
    data() {
      return {
        title: "管理页",
        isCollapse: true,
        menuList: [
          {id: 1, name: "考试管理", child:
            [{id: 2, name: '添加考试', child:null},
          {id: 3, name: '考试查询', child:null}]},
          {id: 4, name: "系统设置",  child:
            [{id: 5, name: '用户管理', child:
              [{id: 6, name: '用户列表', child:null,url:'/admin/user/list'}]},],
        }]
      };
    },
    components: {
      ElMain,
      navmenu},
    computed: {
      menuitemClasses: function () {
        axios
          .get(
            "http://127.0.0.1/menu/list"

          )
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
        // return [
        //     'menu-item',
        //     this.isCollapsed ? 'collapsed-menu' : ''
        // ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      getMenu(url) {
        console.log(url);
        this.$router.push(url);
      },
      print() {
        console.log("1");
      }
    }
  };
</script>
<style>
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
  }
  .el-menu{
    background-color: #e9eef3;

  }
</style>
